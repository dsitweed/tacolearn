import { fireEvent, render, screen } from '@testing-library/react';

import type { ExamQuestion as ExamQuestionData } from '@/types';

import { ExamQuestion } from '../components/ExamQuestion';

const mockQuestion: ExamQuestionData = {
  id: 'q1',
  jlptLevel: 'N3',
  section: 'VOCABULARY',
  skill: 'VOCABULARY_MEANING',
  questionType: 'MULTIPLE_CHOICE',
  difficulty: 'EASY',
  content: '次の文の（　）に入る最も適切なものを一つ選びなさい。',
  imageUrl: null,
  choices: [
    { code: 'A', text: 'alpha' },
    { code: 'B', text: 'beta' },
    { code: 'C', text: 'gamma' },
  ],
  tags: ['core'],
  orderInExam: 1,
};

describe('ExamQuestion', () => {
  it('renders the question content and every choice', () => {
    render(
      <ExamQuestion
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        selectedAnswer={undefined}
        onAnswerSelect={jest.fn()}
      />,
    );

    expect(
      screen.getByText(/最も適切なものを一つ選びなさい/),
    ).toBeInTheDocument();
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
    expect(screen.getByText('gamma')).toBeInTheDocument();
    expect(screen.getByText(/Câu hỏi\s*1\/10/)).toBeInTheDocument();
    expect(screen.getByText('Từ vựng')).toBeInTheDocument();
  });

  it('reports the selected choice code when a choice is clicked', () => {
    const onAnswerSelect = jest.fn();

    render(
      <ExamQuestion
        question={mockQuestion}
        questionNumber={2}
        totalQuestions={10}
        selectedAnswer={undefined}
        onAnswerSelect={onAnswerSelect}
      />,
    );

    fireEvent.click(screen.getByText('beta'));

    expect(onAnswerSelect).toHaveBeenCalledWith('B');
  });

  it('never exposes the correct answer while the exam is in progress', () => {
    render(
      <ExamQuestion
        question={mockQuestion}
        questionNumber={1}
        totalQuestions={10}
        selectedAnswer="C"
        onAnswerSelect={jest.fn()}
      />,
    );

    expect(screen.queryByText(/Đáp án đúng/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Chính xác/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Chưa chính xác/)).not.toBeInTheDocument();
  });
});
