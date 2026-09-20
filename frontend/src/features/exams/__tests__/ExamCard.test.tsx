import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExamCard } from '../components/ExamCard';

const mockExam = {
  id: '1',
  title: 'JLPT N2 Mock Exam 2023',
  description: 'Practice exam for JLPT N2 level',
  jlptLevel: 'N2',
  type: 'MOCK',
  year: 2023,
  month: 7,
  durationMinutes: 120,
  totalQuestions: 50,
  isPublished: true,
  createdById: 'user-1',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('ExamCard', () => {
  it('renders exam title and description', () => {
    render(<ExamCard exam={mockExam} />);

    expect(screen.getByText('JLPT N2 Mock Exam 2023')).toBeInTheDocument();
    expect(
      screen.getByText('Practice exam for JLPT N2 level'),
    ).toBeInTheDocument();
  });

  it('displays JLPT level badge', () => {
    render(<ExamCard exam={mockExam} />);

    expect(screen.getByText('N2')).toBeInTheDocument();
  });

  it('shows exam type', () => {
    render(<ExamCard exam={mockExam} />);

    expect(screen.getByText('Đề mô phỏng')).toBeInTheDocument();
  });

  it('displays duration and question count', () => {
    render(<ExamCard exam={mockExam} />);

    expect(screen.getByText('120 phút')).toBeInTheDocument();
    expect(screen.getByText('50 câu')).toBeInTheDocument();
  });

  it('has a start exam button', () => {
    render(<ExamCard exam={mockExam} />);

    expect(screen.getByText('Làm đề thi')).toBeInTheDocument();
  });
});
