import {
  Difficulty,
  JlptLevel,
  QuestionSection,
} from 'generated/prisma/client';

export const JLPT_LEVELS: JlptLevel[] = [
  JlptLevel.N1,
  JlptLevel.N2,
  JlptLevel.N3,
  JlptLevel.N4,
  JlptLevel.N5,
];

export const SECTIONS: QuestionSection[] = [
  QuestionSection.VOCABULARY,
  QuestionSection.GRAMMAR,
  QuestionSection.KANJI,
  QuestionSection.READING,
  QuestionSection.LISTENING,
];

export const DIFFICULTIES: Difficulty[] = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
];

// Granular sub-skills grouped by exam section (stored as free text on Question.skill)
export const SKILLS_BY_SECTION: Record<QuestionSection, string[]> = {
  [QuestionSection.VOCABULARY]: [
    'Word Meaning',
    'Paraphrase',
    'Usage',
    'Contextual Word',
  ],
  [QuestionSection.GRAMMAR]: [
    'Sentence Grammar',
    'Sentence Composition',
    'Text Grammar',
  ],
  [QuestionSection.KANJI]: ['Kanji Reading', 'Orthography'],
  [QuestionSection.READING]: [
    'Short Passage',
    'Mid-size Passage',
    'Long Passage',
    'Information Retrieval',
    'Inference',
  ],
  [QuestionSection.LISTENING]: [
    'Task-based Comprehension',
    'Point Comprehension',
    'Verbal Expressions',
    'Quick Response',
  ],
};

export const ALL_SKILLS: string[] = Object.values(SKILLS_BY_SECTION).flat();

export const round2 = (value: number): number => Math.round(value * 100) / 100;

export const daysAgo = (n: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};

export const daysFromNow = (n: number): Date => daysAgo(-n);
