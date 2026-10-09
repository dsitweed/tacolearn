# Chức Năng Đề Thi JLPT

Chức năng này cho phép người dùng:

1. Xem danh sách các đề thi JLPT đã publish
2. Làm đề thi (đếm ngược thời gian, điều hướng câu hỏi, xác nhận trước khi nộp)
3. Xem kết quả thật lấy từ server (điểm, phân tích theo kỹ năng, chi tiết từng câu)

## Luồng hoạt động

```
/exams                        GET  /exams                    → danh sách đề đã publish
/exams/[id]                   GET  /exams/:id                → đề + câu hỏi (KHÔNG có đáp án)
        │  nộp bài
        ▼
                              POST /exams/:id/submit         → lưu PracticeSession + QuestionAttempt, trả kết quả
        │  redirect ?sessionId=…
        ▼
/exams/[id]/results           GET  /exams/sessions/:sessionId → đọc lại kết quả đã lưu
```

Trang kết quả **không** dùng mock data: `sessionId` được truyền qua query string và toàn bộ
số liệu (điểm, số câu đúng, thời gian, phân tích theo kỹ năng, đáp án đúng + giải thích) đều
đọc từ `GET /exams/sessions/:sessionId`.

## Cấu Trúc Files

### Frontend

```
src/
├── app/[locale]/exams/
│   ├── page.tsx                    # Trang danh sách đề thi
│   └── [id]/
│       ├── page.tsx                # Trang làm đề thi
│       └── results/page.tsx        # Trang kết quả (đọc ?sessionId=)
├── features/exams/
│   ├── components/
│   │   ├── ExamCard.tsx            # Card hiển thị đề thi trong danh sách
│   │   ├── ExamQuestion.tsx        # Hiển thị câu hỏi + lựa chọn (chỉ trạng thái đã chọn)
│   │   ├── ExamTimer.tsx           # Timer đếm ngược
│   │   └── ExamSidebarSummary.tsx  # Sidebar của exam hub
│   └── README.md                   # Tài liệu này
├── hooks/api/
│   ├── useExams.ts                 # useExams / useExam / useExamSessionResult
│   └── useSubmitExam.ts            # useSubmitExam
└── types/ExamTypes.ts              # ExamDetail, ExamQuestion, ExamSessionResult, …
```

### Backend

```
backend/src/practice/exams/
├── exams.controller.ts              # GET /exams, GET /exams/:id,
│                                    # GET /exams/sessions/:sessionId, POST /exams/:id/submit
├── exams.service.ts                 # Business logic + tính điểm
├── exams.service.spec.ts            # Unit tests (Jest)
├── exams.module.ts                  # Module definition
└── dto/submit-exam.dto.ts           # DTO + validation cho submit exam
```

## API Endpoints

Tất cả endpoint đều yêu cầu đăng nhập (JWT qua cookie/Bearer).

### GET `/exams`

- **Query params**: `level` (optional) — lọc theo cấp độ JLPT; giá trị không hợp lệ bị bỏ qua
- **Response**: `Exam[]`, trong đó `totalQuestions` là số câu hỏi **thực tế** của đề

### GET `/exams/:id`

- **Response**: `Exam` + `questions` (sắp theo `orderInExam`).
- **Bảo mật**: response **không** chứa `correctAnswerCode` và `explanation` để thí sinh không
  đọc được đáp án từ network tab. `choices` được parse từ JSON thành `[{ code, text }]`.
- **404** nếu đề không tồn tại hoặc chưa publish.

### POST `/exams/:id/submit`

- **Body**:
  ```typescript
  {
    answers: Array<{ questionId: string; selectedAnswer: string }>; // chỉ gửi câu đã trả lời
    timeSpent: number; // giây, >= 0
  }
  ```
- **Xử lý**:
  - Câu không có trong `answers` được tính là **sai / chưa trả lời**.
  - Điểm = `correctCount / totalQuestions * 100` (làm tròn 2 chữ số).
  - Tạo `PracticeSession` (`sessionType = MOCK_TEST`, `status = COMPLETED`) với
    `studentId` = **StudentProfile.id** (tra theo `userId` của user đang đăng nhập).
  - Tạo `QuestionAttempt` cho **tất cả** câu hỏi (câu bỏ trống có `studentAnswerCode = ''`).
  - Cập nhật thống kê `attemptCount` / `correctCount` của từng câu và `Exam.totalQuestions`.
  - Toàn bộ ghi trong một `$transaction`.
- **Response**:
  ```typescript
  {
    sessionId: string;
    examId: string;
    examTitle: string;
    jlptLevel: JlptLevel;
    score: number;
    correctCount: number;
    totalQuestions: number;
    answeredCount: number;
    timeSpent: number;
    results: Array<{
      questionId: string;
      orderInExam: number | null;
      section: string;
      skill: string;
      content: string;
      imageUrl: string | null;
      choices: Array<{ code: string; text: string }>;
      selectedAnswer: string | null;
      correctAnswer: string;
      explanation: string;
      isCorrect: boolean;
    }>;
  }
  ```
- **Lỗi**: `404` đề không tồn tại/chưa publish hoặc đề không có câu hỏi; `403` user không có
  StudentProfile (ví dụ teacher/admin).

### GET `/exams/sessions/:sessionId`

- **Response**: giống payload submit nhưng thêm `sections` (thống kê theo kỹ năng) và
  `startedAt` / `completedAt`.
- **Quyền**: chỉ chủ sở hữu session hoặc ADMIN; người khác nhận `403`, không tồn tại nhận `404`.

## Components

### `ExamCard`

Card hiển thị đề thi trong danh sách (cấp độ, loại đề, thời gian, số câu, nút "Làm đề thi").

### `ExamQuestion`

Hiển thị câu hỏi và các lựa chọn. **Chỉ** hiển thị trạng thái đã chọn — không so sánh với đáp
án đúng, vì trong lúc làm bài client không có `correctAnswerCode`.

### `ExamTimer`

Timer đếm ngược kèm progress bar, đổi màu khi gần hết giờ.

## Hooks

```typescript
const { data: exams } = useExams('N2'); // GET /exams?level=N2
const { data: exam } = useExam(examId); // GET /exams/:id (ExamDetail)
const { mutate: submitExam } = useSubmitExam(); // POST /exams/:id/submit
const { data: result } = useExamSessionResult(id); // GET /exams/sessions/:id

submitExam(
  {
    examId,
    data: {
      answers: [{ questionId: 'q1', selectedAnswer: 'A' }],
      timeSpent: 1800,
    },
  },
  {
    onSuccess: (data) =>
      router.replace(`/exams/${examId}/results?sessionId=${data.sessionId}`),
  },
);
```

## Cài Đặt & Chạy

```bash
# Backend
cd backend
pnpm install
pnpm prisma migrate dev
pnpm db:seed          # tạo exam + question mẫu
pnpm start:dev

# Frontend
cd frontend
pnpm install
pnpm dev
```

## Kiểm Thử

```bash
# Backend (Jest) — luồng tính điểm, quyền, che đáp án
cd backend && pnpm test src/practice/exams

# Frontend (Jest + Testing Library)
cd frontend && pnpm test
```

## Lưu Ý

- Đáp án chỉ được trả về **sau khi** nộp bài (ở response submit và ở endpoint kết quả).
- `PracticeSession` không có cột `score`; điểm được tính lại từ số câu đúng / tổng số câu.
- Tiến trình làm bài **không** được lưu tạm: nếu thoát giữa chừng, bài làm sẽ mất.

## Tính Năng Tương Lai

1. **Lưu tiến độ làm bài**: cho phép thoát ra và làm tiếp (hiện chưa hỗ trợ)
2. **Lịch sử làm bài**: danh sách các lượt làm và điểm cao nhất
3. **Chế độ thi thử**: chia phần thi riêng biệt theo thời gian thật
4. **So sánh với người khác**: xếp hạng
5. **Đề thi tùy chỉnh**: tạo đề từ ngân hàng câu hỏi
