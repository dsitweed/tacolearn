import { faker } from '@faker-js/faker';
import {
  Exam,
  GrammarPoint,
  PrismaClient,
  Question,
  QuestionSection,
  QuestionSource,
  QuestionType,
  User,
  Vocabulary,
} from 'generated/prisma/client';

import {
  DIFFICULTIES,
  JLPT_LEVELS,
  SECTIONS,
  SKILLS_BY_SECTION,
  round2,
} from './constants';

const TOTAL_QUESTIONS = 120;
const CHOICE_CODES = ['A', 'B', 'C', 'D'];

const SOURCES: QuestionSource[] = [
  QuestionSource.OFFICIAL_PAST_PAPER,
  QuestionSource.TEXTBOOK,
  QuestionSource.AI_GENERATED,
  QuestionSource.MANUAL,
];

function buildChoices(): {
  choices: { code: string; text: string }[];
  correct: string;
} {
  const choices = CHOICE_CODES.map((code) => ({
    code,
    text: faker.word.words({ count: { min: 1, max: 3 } }),
  }));
  const correct = faker.helpers.arrayElement(CHOICE_CODES);
  return { choices, correct };
}

function sourceReference(source: QuestionSource): string | null {
  switch (source) {
    case QuestionSource.OFFICIAL_PAST_PAPER:
      return `JLPT ${faker.helpers.arrayElement([2016, 2017, 2018, 2019])}-${faker.helpers.arrayElement(['07', '12'])}`;
    case QuestionSource.TEXTBOOK:
      return `Shin Kanzen Master, p.${faker.number.int({ min: 10, max: 220 })}`;
    case QuestionSource.AI_GENERATED:
      return 'gpt-4o';
    default:
      return null;
  }
}

type SeedQuestionOptions = {
  authors: User[];
  exams: Exam[];
  vocabulary: Vocabulary[];
  grammarPoints: GrammarPoint[];
};

export async function seedQuestions(
  prisma: PrismaClient,
  { authors, exams, vocabulary, grammarPoints }: SeedQuestionOptions,
): Promise<Question[]> {
  console.log('❓ Seeding questions...');

  const existing = await prisma.question.findMany();
  if (existing.length > 0) {
    console.log(`⏭️  Questions already seeded (${existing.length}), skipping.`);
    return existing;
  }

  const created: Question[] = [];

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const section = faker.helpers.arrayElement(SECTIONS);
    const skill = faker.helpers.arrayElement(SKILLS_BY_SECTION[section]);
    const jlptLevel = faker.helpers.arrayElement(JLPT_LEVELS);
    const difficulty = faker.helpers.arrayElement(DIFFICULTIES);
    const source = faker.helpers.arrayElement(SOURCES);
    const { choices, correct } = buildChoices();

    // ~40% of questions belong to an exam paper of the same level (fallback: any exam)
    const attachToExam = Math.random() < 0.4 && exams.length > 0;
    const exam = attachToExam
      ? (exams.find((e) => e.jlptLevel === jlptLevel) ??
        faker.helpers.arrayElement(exams))
      : null;

    const linkVocabulary =
      section === QuestionSection.VOCABULARY && vocabulary.length > 0;
    const linkGrammar =
      section === QuestionSection.GRAMMAR && grammarPoints.length > 0;

    const question = await prisma.question.create({
      data: {
        jlptLevel,
        section,
        skill,
        questionType: QuestionType.MULTIPLE_CHOICE,
        difficulty,
        content: `【${jlptLevel} / ${section}】次の文の（　）に入る最も適切なものを一つ選びなさい。 ${faker.lorem.sentence()}`,
        choices,
        correctAnswerCode: correct,
        explanation: `正解は ${correct} です。 ${faker.lorem.sentences(2)}`,
        tags: faker.helpers.arrayElements(
          [jlptLevel, section, skill, 'core', 'frequent'],
          { min: 1, max: 3 },
        ),
        difficultyIndex: round2(faker.number.float({ min: 20, max: 95 })),
        source,
        sourceReference: sourceReference(source),
        examId: exam?.id ?? null,
        orderInExam: exam ? faker.number.int({ min: 1, max: 90 }) : null,
        createdById: faker.helpers.arrayElement(authors).id,
        ...(linkVocabulary && {
          vocabulary: {
            connect: faker.helpers
              .arrayElements(vocabulary, { min: 1, max: 2 })
              .map((v) => ({ id: v.id })),
          },
        }),
        ...(linkGrammar && {
          grammarPoints: {
            connect: faker.helpers
              .arrayElements(grammarPoints, { min: 1, max: 2 })
              .map((g) => ({ id: g.id })),
          },
        }),
      },
    });

    created.push(question);
  }

  console.log(`✅ Questions seeded: ${created.length}`);
  return created;
}
