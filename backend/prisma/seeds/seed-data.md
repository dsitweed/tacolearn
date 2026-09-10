# 🌱 Seed Data Documentation

Tài liệu tổng hợp dữ liệu mẫu được seed cho hệ thống **TacoLearn**.

- **Chạy seed:** `pnpm prisma:seed` (thực thi `prisma/seeds/index.ts`).
- **Mật khẩu mặc định** của mọi tài khoản: `password` (hash bằng argon2).
- **Idempotent:** mỗi file seed kiểm tra bảng trước khi chèn — nếu đã có dữ liệu sẽ bỏ qua, nên có thể chạy lại an toàn (không nhân đôi).
- Mỗi bảng có một file seed riêng trong `prisma/seeds/`, được gộp lại và điều phối theo thứ tự phụ thuộc trong `index.ts`.

> Số lượng có ký hiệu `~` phụ thuộc vào Faker random trong khoảng cho trước.

---

## 📊 Tổng hợp số lượng

| # | Bảng (`@@map`)            | File seed                        | Số lượng      |
| - | ------------------------- | -------------------------------- | ------------- |
| 1 | `users` (+profiles)       | `users.seed.ts`                  | 22            |
| 2 | `vocabulary`              | `vocabulary.seed.ts`             | 20            |
| 3 | `grammar_points`          | `grammar-points.seed.ts`         | 16            |
| 4 | `exams`                   | `exams.seed.ts`                  | 5             |
| 5 | `questions`               | `questions.seed.ts`              | 120           |
| 6 | `lessons`                 | `lessons.seed.ts`                | 20            |
| 7 | `schools`                 | `schools.seed.ts`                | 2             |
| 8 | `classes`                 | `classes.seed.ts`                | 6             |
| 9 | `class_enrollments`       | `class-enrollments.seed.ts`      | ~36–60        |
| 10| `attendance`              | `attendances.seed.ts`            | ~150–250      |
| 11| `practice_sessions`       | `practice-sessions.seed.ts`      | ~45           |
| 12| `question_attempts`       | `practice-sessions.seed.ts`      | ~350–500      |
| 13| `lesson_progress`         | `lesson-progress.seed.ts`        | ~60           |
| 14| `skill_mastery`           | `skill-mastery.seed.ts`          | ~75           |
| 15| `srs_items`               | `srs-items.seed.ts`              | ~180          |
| 16| `daily_learning_plans`    | `daily-learning-plans.seed.ts`   | ~75           |
| 17| `announcements`           | `announcements.seed.ts`          | 10            |
| 18| `notifications`           | `notifications.seed.ts`          | ~75           |

> Không seed các bảng hạ tầng auth mang tính runtime: `sessions`, `accounts` (account credential được tạo cùng user), `verifications`.

---

## 1. Users (`users`, `user_profiles`, `student_profiles`, `teacher_profiles`, `accounts`)

- **2 Admins:** `admin1@example.com` → `admin2@example.com`
- **5 Teachers:** `teacher1@example.com` → `teacher5@example.com` (kèm `teacher_profiles`: specialization, yearsOfExperience)
- **15 Students:** `student1@example.com` → `student15@example.com` (kèm `student_profiles`: jlptGoalLevel, jlptGoalDate)
- Mỗi user có 1 `user_profiles` (firstName, lastName, phone, avatar, dateOfBirth) và 1 `accounts` credential.

```
User        { email: "student1@example.com", role: STUDENT, isActive: true }
UserProfile { firstName: "An", lastName: "Nguyen", phone: "090...", avatar: "https://i.pravatar.cc/..." }
Student     { jlptGoalLevel: "N3", jlptGoalDate: 2027-01-01 }
```

## 2. Vocabulary (`vocabulary`)

20 từ vựng thật, ưu tiên nghĩa tiếng Việt (`vietnameseMeaning`), có kèm `englishMeaning`.

```
{ word: "経験", hiragana: "けいけん", vietnameseMeaning: "kinh nghiệm",
  englishMeaning: "experience", jlptLevel: "N3", partOfSpeech: "noun",
  exampleSentences: ["貴重な経験をした。"] }
```

## 3. Grammar Points (`grammar_points`)

16 mẫu ngữ pháp thật, nghĩa tiếng Việt là chính.

```
{ pattern: "〜に違いない", vietnameseMeaning: "chắc chắn là",
  englishMeaning: "must be", japaneseExplanation: "確信のある推量を表す。",
  jlptLevel: "N2", exampleSentences: ["彼は来るに違いない。"] }
```

## 4. Exams (`exams`)

5 đề: 2 đề thật (`OFFICIAL`, có year/month) + 3 đề mock (`MOCK`) do đội ngũ soạn.

```
{ title: "JLPT N3 - 2018 December", jlptLevel: "N3", type: OFFICIAL,
  year: 2018, month: 12, durationMinutes: 140, totalQuestions: 95, isPublished: true }
{ title: "TacoLearn Mock N3 #1", type: MOCK, durationMinutes: 140 }
```

## 5. Questions (`questions`)

120 câu trắc nghiệm phân bổ ngẫu nhiên theo `jlptLevel` / `section` / `skill` / `difficulty`.

- `source` phản ánh **nguồn gốc nội dung**: `OFFICIAL_PAST_PAPER`, `TEXTBOOK`, `AI_GENERATED`, `MANUAL` — kèm `sourceReference` (vd: `"Shin Kanzen Master, p.42"`, `"gpt-4o"`, `"JLPT 2018-12"`).
- ~40% câu gắn với một `Exam` (có `examId` + `orderInExam`); còn lại là câu luyện tập trong ngân hàng.
- Câu thuộc section VOCABULARY/GRAMMAR được liên kết m2m tới `vocabulary` / `grammar_points`.

```
{ jlptLevel: "N3", section: "READING", skill: "Inference",
  questionType: MULTIPLE_CHOICE, difficulty: "MEDIUM",
  choices: [{code:"A",text:"..."}, ...], correctAnswerCode: "B",
  source: TEXTBOOK, sourceReference: "Shin Kanzen Master, p.42",
  tags: ["N3","READING","Inference"] }
```

## 6. Lessons (`lessons`)

20 bài học, mỗi bài liên kết m2m với một số `questions` / `vocabulary` / `grammar_points`.

```
{ title: "N3 GRAMMAR — Bài học 4: ...", jlptLevel: "N3", section: "GRAMMAR",
  videoUrl: "https://videos.tacolearn.com/lessons/...mp4",
  videoDurationMinutes: 15, difficulty: INTERMEDIATE }
```

## 7. Schools (`schools`)

2 trung tâm, thuộc sở hữu của admin (`ownerId`).

```
{ name: "Sakura Japanese Center", city: "Hà Nội", country: "Vietnam",
  subscriptionPlan: PRO, subscriptionStatus: ACTIVE, maxStudents: 500 }
```

## 8. Classes (`classes`)

3 lớp / trường (tổng 6), mỗi lớp gán 1 giáo viên (`teacherId` → `teacher_profiles`) và có `schedule` dạng JSON.

```
{ name: "N3 Class 1", jlptLevel: "N3", maxStudents: 25, status: ACTIVE,
  schedule: [{ day: "Monday", time: "18:00", durationMinutes: 90 }, ...] }
```

## 9. Class Enrollments (`class_enrollments`)

Mỗi lớp có 4–10 học viên ghi danh; ~10% ở trạng thái `DROPPED`.

```
{ classId, studentId, status: ACTIVE, enrolledAt: <date>, droppedAt: null }
```

## 10. Attendance (`attendance`)

4 buổi học gần nhất/lớp × các học viên đang `ACTIVE`. Trạng thái: `PRESENT` (chủ yếu), `LATE`, `ABSENT`, `EXCUSED` (kèm ghi chú).

```
{ classId, studentId, date: <db.Date>, status: PRESENT, notes: null }
```

## 11. Practice Sessions (`practice_sessions`)

Mỗi học viên 2–4 phiên. Loại phiên: `TARGETED` / `MIXED` / `WEAK_AREAS` / `PREVIOUS_MISTAKES`, và ~25% là `MOCK_TEST` (gắn `examId`).

```
{ sessionType: MIXED, jlptLevel: "N3", skill: "Word Meaning",
  totalQuestions: 10, correctAnswers: 6, totalTimeSeconds: 540, status: COMPLETED }
```

## 12. Question Attempts (`question_attempts`)

5–12 lượt trả lời/phiên, ~60% đúng. Câu sai có `mistakeType`; kèm `confidenceLevel`, `hintUsed`, `markedForReview`.

```
{ studentId, questionId, sessionId, studentAnswerCode: "C", isCorrect: false,
  timeSpentSeconds: 48, confidenceLevel: LOW, mistakeType: SKILL_GAP }
```

## 13. Lesson Progress (`lesson_progress`)

2–6 bài/học viên, trạng thái `NOT_STARTED` / `IN_PROGRESS` / `COMPLETED` (bài hoàn thành có `quizScore`).

```
{ studentId, lessonId, status: COMPLETED, quizScore: 82.5,
  startedAt, videoWatchedAt, quizCompletedAt, completedAt }
```

## 14. Skill Mastery (`skill_mastery`)

Tổng hợp mức thành thạo theo (student, level, skill) trên 2–4 section, kèm `masteryPercentage`, `weeklyProgress`, `trendDirection`.

```
{ jlptLevel: "N3", section: "READING", skill: "Inference",
  correctAnswers: 18, totalAttempts: 30, masteryPercentage: 60.0,
  trendDirection: IMPROVING }
```

## 15. SRS Items (`srs_items`)

Kho ôn tập cá nhân hoá (chưa triển khai logic SRS, chỉ làm giàu dữ liệu). `origin` cho biết lý do item vào deck:

- `MISTAKE` — từ câu làm sai (contentType `QUESTION`)
- `SAVED` — học viên tự lưu (contentType `VOCABULARY` / `GRAMMAR`)
- `AUTO` — hệ thống tự thêm để tăng ghi nhớ

```
{ contentType: VOCABULARY, contentId: <vocabId>, origin: SAVED,
  stage: 2, easeFactor: 2.4, intervalDays: 6, status: LEARNING }
```

## 16. Daily Learning Plans (`daily_learning_plans`)

3–7 kế hoạch/học viên trên các ngày khác nhau; `activities` là JSON danh sách hoạt động.

```
{ planDate: <db.Date>, totalTimeMinutes: 75, status: COMPLETED,
  activities: [{ type:"PRACTICE", skill:"Word Meaning", count:10, timeMinutes:20, priority:1 }, ...] }
```

## 17. Announcements (`announcements`)

2 thông báo cấp trường/trường + 1 thông báo cấp lớp/lớp.

```
{ schoolId, classId: null, createdById: <ownerId>,
  title: "Khai giảng khóa học mới", postedAt, expiresAt }
```

## 18. Notifications (`notifications`)

2–5 thông báo/user, đủ các loại: `PRACTICE_REMINDER`, `ACHIEVEMENT`, `WEAK_AREA_ALERT`, `CLASS_ANNOUNCEMENT`, `MESSAGE`, `SYSTEM`.

```
{ userId, type: PRACTICE_REMINDER, title: "Đã đến giờ luyện tập!",
  message: "...", isRead: false }
```
