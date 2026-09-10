# TacoLearn - Nền Tảng Học Tiếng Nhật Thích Ứng cho JLPT

## 📚 Mục Lục

- [TacoLearn - Nền Tảng Học Tiếng Nhật Thích Ứng cho JLPT](#tacolearn---nền-tảng-học-tiếng-nhật-thích-ứng-cho-jlpt)
  - [📚 Mục Lục](#-mục-lục)
  - [1. Tổng Quan Dự Án](#1-tổng-quan-dự-án)
  - [2. Tính Năng Chính](#2-tính-năng-chính)
    - [2.1. Hệ Thống Học Thích Ứng](#21-hệ-thống-học-thích-ứng)
    - [2.2. Luyện Đề JLPT](#22-luyện-đề-jlpt)
    - [2.3. Spaced Repetition System (SRS)](#23-spaced-repetition-system-srs)
    - [2.4. Quản Lý Lớp Học](#24-quản-lý-lớp-học)
    - [2.5. Phân Tích & Báo Cáo](#25-phân-tích--báo-cáo)
    - [2.6. Feature Prioritization by MVP](#26-feature-prioritization-by-mvp)
  - [3. Tech Stack](#3-tech-stack)
    - [3.1. Frontend (Next.js 16)](#31-frontend-nextjs-16)
    - [3.2. Backend (NestJS 11)](#32-backend-nestjs-11)
    - [3.3. Database \& Infrastructure](#33-database--infrastructure)
    - [3.4. Development Tools](#34-development-tools)
  - [4. Cấu Trúc Dự Án](#4-cấu-trúc-dự-án)
  - [5. Cài Đặt \& Phát Triển](#5-cài-đặt--phát-triển)
    - [5.1. Prerequisites](#51-prerequisites)
    - [5.2. Quick Start](#52-quick-start)
    - [5.3. Available Scripts](#53-available-scripts)
  - [6. Database Schema](#6-database-schema)
    - [6.1. Core Entities](#61-core-entities)
    - [6.2. Key Relationships](#62-key-relationships)
  - [7. Authentication \& Authorization](#7-authentication--authorization)
    - [7.1. JWT Strategy](#71-jwt-strategy)
    - [7.2. Role Permissions](#72-role-permissions)
  - [8. System design documentations](#8-system-design-documentations)
    - [8.0. App desciption](#80-app-desciption)
    - [8.1. Business Requirement Document (BRD)](#81-business-requirement-document-brd)
    - [8.2. Use case Diagram](#82-use-case-diagram)
    - [8.3. Screen Transition Diagram](#83-screen-transition-diagram)
    - [8.4. System Architecture Document](#84-system-architecture-document)
    - [8.5. Database Design Document](#85-database-design-document)
    - [8.6. API Specification Document](#86-api-specification-document)
    - [8.7. Security Design Document](#87-security-design-document)
    - [8.8. Shared Types Guide](#88-shared-types-guide)
    - [8.9. Deployment Guide](#89-deployment-guide)
  - [9. Deployment](#9-deployment)
    - [9.1. Quick Deploy với Docker](#91-quick-deploy-với-docker)
    - [9.2. Production Environment](#92-production-environment)
    - [9.3. Cloud Deployment](#93-cloud-deployment)
    - [9.4. Environment Variables](#94-environment-variables)
  - [10. Contributing](#10-contributing)
  - [11. License](#11-license)
  - [12. Support](#12-support)
---

## 1. Tổng Quan Dự Án

TacoLearn là nền tảng học tiếng Nhật thích ứng được xây dựng với Next.js 16 frontend và NestJS 11 backend. Hệ thống cung cấp học tập cá nhân hóa, luyện đề JLPT, spaced repetition, phân tích điểm yếu, và quản lý lớp học tích hợp - tất cả nhằm giúp người học trả lời câu hỏi: **"Hôm nay tôi nên học gì để tiến gần hơn đến mục tiêu JLPT?"**

## 2. Tính Năng Chính

### 2.1. Hệ Thống Học Thích Ứng
- **Adaptive Practice**: Tự động tạo bài luyện đề dựa trên điểm yếu hiện tại
- **Skill Mastery Tracking**: Theo dõi mức độ thành thạo chi tiết tại cấp độ kỹ năng con
- **Personalized Recommendations**: Gợi ý chính xác bài tiếp theo cần học
- **JLPT Readiness Score**: Dự đoán mức độ sẵn sàng cho JLPT dựa trên dữ liệu
- **Daily Learning Plan**: Kế hoạch học tập hàng ngày được tạo tự động

### 2.2. Luyện Đề JLPT
- **Comprehensive Question Bank**: Câu hỏi từ N1 đến N5 với metadata chi tiết
- **Multiple Sections**: Vocabulary, Grammar, Kanji, Reading, Listening
- **Detailed Explanations**: Giải thích chi tiết và ngữ pháp cho mỗi câu hỏi
- **Practice Sessions**: Luyện đề riêng lẻ hoặc mock test đầy đủ
- **Performance Analysis**: Phân tích kết quả theo từng kỹ năng
- **Mistake Tracking**: Theo dõi lỗi và gợi ý ôn tập

### 2.3. Spaced Repetition System (SRS)
- **Automatic SRS Creation**: Tự động tạo mục ôn tập từ lỗi luyện đề
- **Optimal Intervals**: Lên lịch ôn tập dựa trên mô hình SM-2
- **Confidence-based Review**: Điều chỉnh khoảng ôn tập dựa trên mức độ tự tin
- **Progress Tracking**: Theo dõi tiến bộ ôn tập
- **Review Reminders**: Nhắc nhở khi đến hạn ôn tập

### 2.4. Quản Lý Lớp Học
- **Class Management**: Giáo viên tạo và quản lý lớp học
- **Student Tracking**: Theo dõi tiến bộ của từng học sinh
- **Attendance System**: Ghi nhận điểm danh và vắng học
- **Catch-up System**: Tự động tạo kế hoạch bắt kịp cho học sinh vắng
- **Announcements**: Gửi thông báo cho cả lớp
- **Performance Analytics**: Phân tích hiệu suất lớp và cá nhân

### 2.5. Phân Tích & Báo Cáo
- **Student Dashboard**: Bảng điều khiển cá nhân với kế hoạch hôm nay
- **Strength/Weakness Analysis**: Phân tích điểm mạnh và điểm yếu
- **Learning Statistics**: Thống kê thời gian học, số câu trả lời, tỷ lệ chính xác
- **Progress Reports**: Báo cáo tiến bộ chi tiết
- **Teacher Analytics**: Phân tích hiệu suất lớp cho giáo viên

### 2.6. Feature Prioritization by MVP

| Feature | Giá trị | Khả năng bán | Mô tả | Priority | Rationale |
| --- | --- | --- | --- | --- | --- |
| 🎯 Adaptive Practice | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Tự động tạo bài luyện dựa trên điểm yếu | **P0 (Critical)** | Core differentiator - 40% tăng hiệu quả học |
| 📊 Skill Mastery | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Theo dõi mức độ thành thạo chi tiết | **P0 (Critical)** | Foundation cho recommendations |
| 🧠 SRS System | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Ôn tập thông minh theo khoảng cách | **P0 (Critical)** | Tăng retention 60% so với ôn tập thường |
| 📱 Student Dashboard | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Bảng điều khiển cá nhân với kế hoạch | **P1 (High)** | Giao diện chính của ứng dụng |
| 📝 Question Bank | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Ngân hàng câu hỏi với metadata | **P1 (High)** | Nền tảng cho tất cả tính năng học |
| 🎓 Mock Test | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Thi thử JLPT đầy đủ | **P1 (High)** | Simulation thực tế cho JLPT |
| 👨‍🏫 Class Management | ⭐⭐⭐ | ⭐⭐⭐⭐ | Quản lý lớp cho giáo viên | **P2 (Medium)** | Support trường/lớp học |
| 📊 Analytics | ⭐⭐⭐⭐ | ⭐⭐⭐ | Báo cáo chi tiết cho giáo viên/admin | **P2 (Medium)** | Insights cho quyết định |
| 🔄 Missed Class Catch-up | ⭐⭐⭐ | ⭐⭐⭐ | Kế hoạch bắt kịp tự động | **P2 (Medium)** | Hỗ trợ quản lý lớp |
| 🎮 Gamification | ⭐⭐ | ⭐⭐ | Points, badges, leaderboards | **P3 (Low)** | Nice-to-have post-MVP |

**Priority Legend:**
- **P0 (Critical)**: Must-have cho MVP, trực tiếp tác động đến giá trị học
- **P1 (High)**: Quan trọng cho sản phẩm, cải thiện UX đáng kể
- **P2 (Medium)**: Hỗ trợ quan trọng, ROI thấp hơn, có thể phân chia
- **P3 (Low)**: Nice-to-have, xem xét sau MVP

## 3. Tech Stack

### 3.1. Frontend (Next.js 16)
```json
{
  "framework": "Next.js 16 với App Router và i18n",
  "language": "TypeScript (strict mode)",
  "styling": "Tailwind CSS v4",
  "components": "shadcn/ui",
  "forms": "React Hook Form + Zod validation",
  "state": "TanStack Query v5+ (server) + Zustand (client)",
  "realtime": "Socket.io Client",
  "http": "Axios",
  "i18n": "Intlayer",
  "notifications": "React Hot Toast"
}
```

### 3.2. Backend (NestJS 11)
```json
{
  "framework": "NestJS 11 với TypeScript",
  "database": "PostgreSQL 14+ với Prisma 7+ ORM",
  "authentication": "JWT + Passport (Local & JWT strategies)",
  "api": "REST + Swagger/OpenAPI",
  "validation": "class-validator + class-transformer",
  "realtime": "Socket.io",
  "queue": "Bull Queue với Redis (optional)",
  "email": "Nodemailer",
  "testing": "Jest (unit tests)"
}
```

### 3.3. Database & Infrastructure
```json
{
  "database": "PostgreSQL 14+ (main database)",
  "cache": "Redis (optional, cho caching/queue)",
  "containerization": "Docker & Docker Compose",
  "package_manager": "pnpm 8+",
  "node_version": "18+",
  "monitoring": "Prisma Studio (development)"
}
```

### 3.4. Development Tools
```json
{
  "formatting": "ESLint + Prettier",
  "git": "Lefthook (pre-commit hooks)",
  "testing": "Jest (unit) + Playwright (e2e)",
  "workspace": "pnpm workspaces",
  "api_generation": "Orval (từ OpenAPI spec)"
}
```

## 4. Cấu Trúc Dự Án

```
tacolearn/
├── frontend/                 # Next.js App
│   ├── src/
│   │   ├── app/             # App Router pages + i18n [locale]
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature-specific components
│   │   ├── hooks/           # Custom React hooks (useQuery, useMutation)
│   │   ├── libs/            # Utilities, API client, queryKeys
│   │   ├── stores/          # Zustand stores
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── [feature]/       # Feature modules (questions, practice, srs, etc.)
│   │   │   ├── [feature].controller.ts
│   │   │   ├── [feature].service.ts
│   │   │   ├── [feature].module.ts
│   │   │   └── dto/
│   │   ├── auth/            # Authentication module
│   │   ├── common/          # Shared utilities, decorators, pipes
│   │   ├── config/          # Configuration
│   │   ├── prisma/          # Prisma service
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   ├── migrations/      # Database migrations
│   │   └── seeds/           # Seed data (questions, vocabulary, etc.)
│   └── package.json
├── documents/               # System design documentation
│   ├── 0.App_description.md
│   ├── 1.businessRequirementDocument*.md
│   ├── 2.useCaseDiagram*.md
│   ├── 3.screenTransactionDiagram.md
│   ├── 4.systemArchitectureDocument.md
│   ├── 5.dataTableDesignDocument.md
│   ├── 6.tacolearn-api-spec.yaml
│   ├── 6.api-enhancement-summary.md
│   ├── 7.securityDesignDocument.md
│   ├── 8.shared-types-guide.md
│   └── 9.deployment-guide.md
├── docker-compose.yml       # Local development services
├── pnpm-workspace.yaml      # pnpm workspace config
└── README.md
```

## 5. Cài Đặt & Phát Triển

### 5.1. Prerequisites
- Node.js 18+
- PostgreSQL 14+
- pnpm 8+
- Docker & Docker Compose (optional, cho local development)

### 5.2. Quick Start
```bash
# Clone repository
git clone <repo-url>
cd tacolearn

# Install dependencies (toàn bộ monorepo)
pnpm install

# Setup environment variables
cp backend/.env.example backend/.env.local
cp frontend/.env.example frontend/.env.local

# Cập nhật backend/.env.local với DATABASE_URL
# DATABASE_URL=postgresql://user:password@localhost:5432/tacolearn

# Start PostgreSQL (with Docker)
docker-compose up -d postgres

# Setup database
cd backend
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed

# Start development servers (từ root)
cd ..
pnpm dev
```

Frontend sẽ chạy ở `http://localhost:3000`  
Backend sẽ chạy ở `http://localhost:3005`  
Swagger API docs: `http://localhost:3005/docs`

### 5.3. Available Scripts
```bash
# Development
pnpm dev              # Start both frontend & backend in development
pnpm dev:frontend     # Frontend only
pnpm dev:backend      # Backend only

# Build & Production
pnpm build            # Build all packages
pnpm start            # Start both applications in production

# Code Quality
pnpm lint             # Lint both applications
pnpm test             # Run tests for both applications
pnpm format           # Format code with Prettier

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run Prisma migrations
pnpm db:seed          # Seed database with initial data
pnpm db:studio        # Open Prisma Studio

# Orval (API Type Generation)
pnpm orval            # Generate TypeScript types từ OpenAPI spec
```

## 6. Database Schema

### 6.1. Core Entities
- **Users**: Admin, Students, Teachers
- **Students**: Student profile với JLPT goals
- **Teachers**: Teacher profile với class assignments
- **Questions**: Question bank với metadata (level, section, skill, difficulty)
- **QuestionAttempts**: Theo dõi từng lần trả lời câu hỏi
- **SkillMastery**: Mức độ thành thạo từng kỹ năng
- **PracticeSessions**: Phiên luyện đề
- **SRSItems**: Spaced Repetition System items
- **Classes**: Lớp học do giáo viên tạo
- **Lessons**: Bài học với video, vocabulary, grammar

### 6.2. Key Relationships
- One User → One Student/Teacher Profile
- One Question → Many QuestionAttempts
- One Student → Many QuestionAttempts (tracks all practice)
- One Student → Many SkillMastery (tracks proficiency per skill)
- One Question → One SRSItem per student (many-to-many via SRS)
- One Teacher → Many Classes
- One Class → Many Students (many-to-many)
- One Class → Many Lessons
- One Lesson → Many Questions (for homework, assignments)

## 7. Authentication & Authorization

### 7.1. JWT Strategy
- Access tokens (24 giờ)
- Refresh tokens (7 ngày)
- HttpOnly cookies để lưu trữ tokens
- Role-based permissions (RBAC)

### 7.2. Role Permissions
- **Admin**: Full system access, user management, content moderation, analytics
- **Teacher**: Manage classes, view student progress, create assignments, track attendance
- **Student**: View personal dashboard, practice, access lessons, view skill mastery

## 8. System design documentations

### 8.0. App desciption
- [Mô tả TacoLearn](documents/0.App_description.md) - Product vision, philosophy, core concepts

### 8.1. Business Requirement Document (BRD)
- Tài liệu yêu cầu kinh doanh chi tiết
- [Tài liệu bản Tiếng Việt](documents/1.businessRequirementDocumentVi.md)
- [Tài liệu bản Tiếng Anh](documents/1.businessRequirementDocumentEn.md)

### 8.2. Use case Diagram
- Biểu đồ và mô tả chi tiết 100+ use cases
- [Tài liệu Tiếng Việt](documents/2.useCaseDiagramVi.md)
- [Tài liệu Tiếng Anh](documents/2.useCaseDiagramEn.md)

### 8.3. Screen Transition Diagram
- Luồng giao diện chi tiết cho tất cả user journeys
- [Tài liệu Screen Transition](documents/3.screenTransactionDiagram.md)

### 8.4. System Architecture Document
- Kiến trúc hệ thống, layers, integrations
- [Tài liệu Architecture](documents/4.systemArchitectureDocument.md)

### 8.5. Database Design Document
- Schema design, entities, relationships
- [Tài liệu Database Design](documents/5.dataTableDesignDocument.md)

### 8.6. API Specification Document
- OpenAPI 3.0 specification với 50+ endpoints
- [Tài liệu OpenAPI YAML](documents/6.tacolearn-api-spec.yaml)
- [Tài liệu API Summary](documents/6.api-enhancement-summary.md)
- API documentation is available at:
  - Development: `http://localhost:3005/api/docs`
  - Swagger UI with interactive endpoints
  - Authentication examples included

### 8.7. Security Design Document
- Thiết kế bảo mật hệ thống
- [Tài liệu Security Design](documents/7.securityDesignDocument.md)
- Includes: JWT, encryption, HTTPS, GDPR compliance, data privacy

### 8.8. Shared Types Guide
- Hướng dẫn sử dụng shared types từ Prisma cho BE & FE
- [Tài liệu Shared Types](documents/8.shared-types-guide.md)
- Setup, workflow, best practices, examples

### 8.9. Deployment Guide
- Hướng dẫn deploy chi tiết
- [Deployment Documentation](documents/9.deployment-guide.md)
- Docker setup, cloud providers (Vercel, Railway, GCP), CI/CD pipeline

## 9. Deployment

### 9.1. Quick Deploy với Docker

```bash
# 1. Copy environment variables
cp backend/.env.example backend/.env.production
cp frontend/.env.example frontend/.env.production
# Edit environment files with your values

# 2. Deploy all services
docker-compose -f docker-compose.prod.yml up -d

# 3. Check health
curl http://localhost:3005/health
```

### 9.2. Development Deployment

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 9.3. Cloud Deployment

**Frontend (Vercel):**
- Deploy Next.js app directly from GitHub
- Environment variables configured in Vercel dashboard
- Automatic deployment on main branch
- Preview deployments for PRs

**Backend (Railway/Render/Fly.io):**
- Deploy NestJS API server
- Environment variables for PostgreSQL connection
- Auto-scaling based on traffic
- Built-in logging and monitoring

**Database (Managed PostgreSQL):**
- Railway PostgreSQL, Render PostgreSQL, or AWS RDS
- Automatic backups
- Point-in-time recovery

**Full Guide:** See [Deployment Guide](documents/9.deployment-guide.md) for detailed instructions

### 9.4. Environment Variables

**Backend (.env.production):**
```
DATABASE_URL=postgresql://user:password@host:5432/tacolearn
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=3005
```

**Frontend (.env.production):**
```
NEXT_PUBLIC_API_ORIGIN=https://api.tacolearn.com
NEXT_PUBLIC_APP_URL=https://tacolearn.com
```

## 10. Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**Development Guidelines:**
- Follow the backend and frontend instructions in `.github/instructions/`
- Use TypeScript (strict mode) for all new code
- Write tests for new features
- Run linting and formatting before submitting PR

## 11. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 12. Support

For support, email support@tacolearn.com or open an issue on GitHub.

**Project Links:**
- Website: https://tacolearn.com
- API Documentation: https://api.tacolearn.com/docs
- GitHub: https://github.com/tacolearn

---

**TacoLearn** - Empowering students to master Japanese JLPT with adaptive, intelligent learning! 🚀