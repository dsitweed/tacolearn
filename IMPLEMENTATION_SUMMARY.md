# Tổng Kết Triển Khai Chức Năng Đề Thi (JLPT)

> Cập nhật: hoàn thiện luồng làm bài thi end-to-end (danh sách → làm bài → nộp → kết quả thật).

## Trạng Thái

| Hạng mục | Trạng thái |
| --- | --- |
| Backend: list / detail / submit / session result | ✅ Hoàn thành |
| Làm bài thi trên FE (timer, điều hướng, xác nhận nộp) | ✅ Hoàn thành |
| Trang kết quả dùng dữ liệu thật | ✅ Hoàn thành (trước đây là mock data) |
| Che đáp án khi đang làm bài | ✅ Hoàn thành |
| Unit test backend (`exams.service.spec.ts`, 9 cases) | ✅ Pass |
| Unit test frontend (`ExamCard.test.tsx`, 5 cases) | ✅ Pass |
| Lưu tiến độ / lịch sử làm bài | ⛔ Chưa làm (ngoài phạm vi) |

## Kiến Trúc

### Backend — `backend/src/practice/exams/`

- **`exams.controller.ts`**
  - `GET /exams` — danh sách đề đã publish, lọc theo `?level=`
  - `GET /exams/:id` — đề + câu hỏi **đã loại bỏ đáp án**
  - `POST /exams/:id/submit` — chấm điểm, lưu session, trả kết quả
  - `GET /exams/sessions/:sessionId` — đọc lại kết quả đã lưu
- **`exams.service.ts`** — toàn bộ business logic; mọi ghi DB nằm trong một `$transaction`.
- **`dto/submit-exam.dto.ts`** — `class-validator`: `answers[]` (`questionId`, `selectedAnswer`),
  `timeSpent` (`@IsInt() @Min(0)`).
- **`exams.service.spec.ts`** — Jest, mock `PrismaService`.

### Frontend

- `src/app/[locale]/exams/page.tsx` — danh sách + filter/search.
- `src/app/[locale]/exams/[id]/page.tsx` — làm bài; timer dựa trên đồng hồ thực, auto-submit một lần,
  dialog xác nhận khi còn câu chưa trả lời.
- `src/app/[locale]/exams/[id]/results/page.tsx` — đọc `?sessionId=`, gọi `useExamSessionResult`,
  hiển thị điểm / độ chính xác / phân tích theo kỹ năng / chi tiết từng câu.
- `src/features/exams/components/` — `ExamCard`, `ExamQuestion`, `ExamTimer`, `ExamSidebarSummary`.
- `src/hooks/api/useExams.ts` — `useExams`, `useExam`, `useExamSessionResult`.
- `src/hooks/api/useSubmitExam.ts` — `useSubmitExam`.
- `src/types/ExamTypes.ts` — type cho payload làm bài / kết quả.

## Những Lỗi Đã Sửa

1. **Sai khoá ngoại khi submit**: `PracticeSession.studentId` trỏ tới `StudentProfile.id` nhưng code cũ
   ghi `user.id` → vi phạm FK. Nay tra `StudentProfile` theo `userId` trước khi ghi.
2. **Rò rỉ đáp án**: `GET /exams/:id` trả cả `correctAnswerCode` và `explanation`. Nay đã loại bỏ; đáp án
   chỉ xuất hiện sau khi nộp.
3. **Trang kết quả dùng mock data**: điểm 85, đáp án "A/B" hard-code. Nay đọc dữ liệu thật theo `sessionId`.
4. **Lỗi type ở FE**: `exam.questions` không tồn tại trong `@/types`, `question.context` không có trong
   schema, `choices` bị type `unknown`, `handleApiError(error)` sai kiểu. Nay đã sửa hết.
5. **Trùng lặp type**: `Exam`/`JlptLevel`/`ExamType` được định nghĩa lại trong `src/types/UserTypes.ts`
   trong khi Orval đã generate. Nay re-export từ `src/generated/model`.
6. **Timer không chính xác**: effect cũ phụ thuộc `timeRemaining` và gọi submit trong `setState`,
   có thể auto-submit nhiều lần. Nay dùng mốc thời gian thực + cờ `submittedRef`.
7. **Thiếu exception chuẩn**: `throw Error(...)` / `throw { statusCode: 404 }`. Nay dùng
   `NotFoundException` / `BadRequestException` / `ForbiddenException`.
8. **Thống kê câu hỏi không cập nhật**: nay tăng `attemptCount` (câu đã trả lời) và `correctCount`.
9. **Thiếu test tooling ở FE**: đã thêm Jest + Testing Library (`jest.config.js`, `jest.setup.ts`,
   script `test` / `test:watch` / `test:cov`).

## Ghi Chú Về Schema

`PracticeSession` **không** có cột `score` hay `durationSeconds` như tài liệu cũ mô tả. Các cột thực tế:

```prisma
model PracticeSession {
  id                 String
  studentId          String   // → StudentProfile.id
  sessionType        SessionType
  examId             String?
  jlptLevel          JlptLevel?
  skill              String?
  totalQuestions     Int
  questionsCompleted Int
  correctAnswers     Int
  totalTimeSeconds   Int?
  status             SessionStatus
  startedAt          DateTime
  completedAt        DateTime?
  attempts           QuestionAttempt[]
}
```

Điểm số được tính lại: `correctAnswers / totalQuestions * 100`.

## API Tóm Tắt

```
GET  /api/v1/exams?level=N2              → Exam[]          (totalQuestions = số câu thực tế)
GET  /api/v1/exams/:id                   → Exam + questions (không có đáp án)
POST /api/v1/exams/:id/submit            → { sessionId, score, results[] }
GET  /api/v1/exams/sessions/:sessionId   → { score, sections[], results[] }
```

## Kiểm Thử

```bash
cd backend  && pnpm test src/practice/exams   # 9 tests
cd frontend && pnpm test                      # 5 tests
```

Đã xác minh thủ công end-to-end (đăng nhập → list → detail → submit → results) trên database dev:
điểm, số câu đúng, số câu bỏ trống, `studentId` = `StudentProfile.id`, thống kê câu hỏi và
`Exam.totalQuestions` đều đúng; `GET /exams/:id` không trả về đáp án; các trường hợp 401/404/400 đúng.

## Cải Thiện Tương Lai

1. **Lưu tiến độ**: tạo `PracticeSession` ở trạng thái `IN_PROGRESS` khi bắt đầu để có thể làm tiếp.
2. **Lịch sử làm bài**: endpoint liệt kê session của học viên + điểm cao nhất.
3. **Chế độ thi thử thật**: chia phần thi và thời gian riêng cho từng phần.
4. **Xếp hạng / so sánh**: thống kê theo cấp độ.
5. **Sinh type tự động**: chạy `pnpm orval` sau khi backend đổi API (hiện FE dùng type viết tay trong
   `src/types/ExamTypes.ts`).
