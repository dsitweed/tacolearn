# Chức Năng Đề Thi JLPT

Chức năng này cho phép người dùng:
1. Xem danh sách các đề thi JLPT
2. Làm đề thi với tính năng đếm ngược thời gian
3. Xem kết quả và phân tích chi tiết

## Cấu Trúc Files

### Frontend
```
src/
├── app/[locale]/exams/
│   ├── page.tsx                    # Trang danh sách đề thi
│   └── [id]/
│       ├── page.tsx                # Trang làm đề thi
│       └── results/
│           └── page.tsx            # Trang kết quả đề thi
├── features/exams/
│   ├── components/
│   │   ├── ExamCard.tsx            # Card hiển thị đề thi trong danh sách
│   │   ├── ExamQuestion.tsx        # Component hiển thị câu hỏi
│   │   ├── ExamTimer.tsx           # Timer đếm ngược thời gian
│   │   └── ExamSidebarSummary.tsx  # Sidebar summary (đã có)
│   └── README.md                   # Tài liệu này
├── hooks/api/
│   ├── useExams.ts                 # Hook lấy danh sách đề thi
│   └── useSubmitExam.ts            # Hook submit kết quả đề thi
└── generated/model/
    ├── exam.ts                     # Type definition cho Exam
    └── examType.ts                 # Type definition cho ExamType
```

### Backend
```
backend/src/practice/exams/
├── exams.controller.ts              # Controller với các endpoints
├── exams.service.ts                # Service xử lý business logic
├── exams.module.ts                  # Module definition
└── dto/
    └── submit-exam.dto.ts          # DTO cho submit exam
```

## API Endpoints

### GET /exams
- **Mô tả**: Lấy danh sách các đề thi đã publish
- **Query params**: `level` (optional) - Lọc theo cấp độ JLPT
- **Response**: Array of `Exam` objects

### GET /exams/:id
- **Mô tả**: Lấy thông tin chi tiết một đề thi
- **Response**: `Exam` object với danh sách câu hỏi

### POST /exams/:id/submit
- **Mô tả**: Submit kết quả làm đề thi
- **Body**:
  ```typescript
  {
    answers: Array<{
      questionId: string;
      selectedAnswer: string;
    }>;
    timeSpent: number; // seconds
  }
  ```
- **Response**:
  ```typescript
  {
    sessionId: string;
    score: number;
    correctCount: number;
    totalQuestions: number;
    timeSpent: number;
    results: Array<{
      questionId: string;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }>;
  }
  ```

## Tính Năng

### 1. Danh Sách Đề Thi
- Hiển thị grid các đề thi với thông tin: tiêu đề, mô tả, cấp độ JLPT, loại đề, thời gian, số câu
- Bộ lọc theo: cấp độ JLPT (N1-N5), loại đề (chính thức/mô phỏng)
- Tìm kiếm theo từ khóa
- Thống kê tổng quan

### 2. Làm Đề Thi
- Timer đếm ngược thời gian
- Navigation giữa các câu hỏi
- Đánh dấu câu đã trả lời
- Progress bar hiển thị tiến độ
- Tự động submit khi hết giờ

### 3. Kết Quả & Phân Tích
- Điểm số và xếp loại
- Thống kê chi tiết: số câu đúng/tổng, độ chính xác, thời gian làm bài
- Phân tích theo kỹ năng: từ vựng, ngữ pháp, đọc hiểu, nghe hiểu
- Chi tiết từng câu hỏi với giải thích
- Lịch sử làm bài và cải thiện

## Các Hook API

### `useExams(level?: string)`
Hook để lấy danh sách đề thi

```typescript
const { data: exams, isLoading, error } = useExams('N2');
```

### `useExam(id: string)`
Hook để lấy thông tin chi tiết một đề thi

```typescript
const { data: exam, isLoading, error } = useExam(examId);
```

### `useSubmitExam()`
Hook để submit kết quả đề thi

```typescript
const { mutate: submitExam, isPending } = useSubmitExam();

submitExam({
  examId: 'exam-id',
  data: {
    answers: [{ questionId: 'q1', selectedAnswer: 'A' }],
    timeSpent: 1800, // 30 minutes in seconds
  }
}, {
  onSuccess: (data) => {
    // Navigate to results page
  }
});
```

## Các Component

### `ExamCard`
Component hiển thị thông tin đề thi trong danh sách

### `ExamQuestion`
Component hiển thị một câu hỏi với các lựa chọn

### `ExamTimer`
Component timer đếm ngược thời gian với progress bar

## Cài Đặt & Chạy

1. **Backend**: Đảm bảo database đã có dữ liệu đề thi
   ```bash
   cd backend
   pnpm prisma migrate dev
   pnpm prisma db seed
   ```

2. **Frontend**: Generate types từ backend API
   ```bash
   cd frontend
   pnpm orval
   ```

3. **Chạy ứng dụng**:
   ```bash
   # Backend
   cd backend && pnpm start:dev

   # Frontend
   cd frontend && pnpm dev
   ```

## Database Schema

### Exam Model
```prisma
model Exam {
  id          String    @id @default(uuid())
  title       String
  description String?
  jlptLevel   JlptLevel
  type        ExamType  @default(MOCK)
  year        Int?      // official past-paper year
  month       Int?      // JLPT sitting month: 7 or 12
  durationMinutes Int?
  totalQuestions  Int     @default(0)
  isPublished     Boolean @default(false)
  
  // Relations
  createdBy   User?      @relation("ExamAuthor")
  questions   Question[]
  sessions    PracticeSession[]
}
```

### PracticeSession Model
```prisma
model PracticeSession {
  id              String        @id @default(uuid())
  student         StudentProfile @relation(fields: [studentId], references: [id])
  exam            Exam?         @relation(fields: [examId], references: [id])
  
  // Stats
  totalQuestions     Int  @default(0)
  correctAnswers     Int  @default(0)
  score              Decimal? @db.Decimal(5, 2)
  durationSeconds    Int?
  
  // Status
  status      SessionStatus @default(IN_PROGRESS)
  completedAt DateTime?
}
```

## Tính Năng Tương Lai

1. **Lưu tiến độ làm bài**: Cho phép tiếp tục làm bài sau
2. **Chế độ thi thử**: Giống kỳ thi thật với các phần thi riêng biệt
3. **So sánh với người khác**: Xếp hạng và so sánh điểm số
4. **Đề thi tùy chỉnh**: Tạo đề thi từ ngân hàng câu hỏi
5. **Phân tích nâng cao**: Phân tích điểm mạnh/yếu chi tiết
6. **Luyện tập theo kỹ năng**: Làm bài tập riêng cho từng kỹ năng