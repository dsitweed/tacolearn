import { JlptLevel, PrismaClient, Vocabulary } from 'generated/prisma/client';

type VocabSeed = {
  word: string;
  hiragana: string;
  vietnameseMeaning: string;
  englishMeaning: string;
  jlptLevel: JlptLevel;
  partOfSpeech: string;
  exampleSentences: string[];
};

const VOCABULARY: VocabSeed[] = [
  {
    word: '食べる',
    hiragana: 'たべる',
    vietnameseMeaning: 'ăn',
    englishMeaning: 'to eat',
    jlptLevel: JlptLevel.N5,
    partOfSpeech: 'verb',
    exampleSentences: ['朝ごはんを食べる。'],
  },
  {
    word: '水',
    hiragana: 'みず',
    vietnameseMeaning: 'nước',
    englishMeaning: 'water',
    jlptLevel: JlptLevel.N5,
    partOfSpeech: 'noun',
    exampleSentences: ['水を飲みます。'],
  },
  {
    word: '学校',
    hiragana: 'がっこう',
    vietnameseMeaning: 'trường học',
    englishMeaning: 'school',
    jlptLevel: JlptLevel.N5,
    partOfSpeech: 'noun',
    exampleSentences: ['学校へ行きます。'],
  },
  {
    word: '大きい',
    hiragana: 'おおきい',
    vietnameseMeaning: 'to, lớn',
    englishMeaning: 'big',
    jlptLevel: JlptLevel.N5,
    partOfSpeech: 'adjective',
    exampleSentences: ['大きい犬がいます。'],
  },
  {
    word: '行く',
    hiragana: 'いく',
    vietnameseMeaning: 'đi',
    englishMeaning: 'to go',
    jlptLevel: JlptLevel.N5,
    partOfSpeech: 'verb',
    exampleSentences: ['学校に行く。'],
  },
  {
    word: '地図',
    hiragana: 'ちず',
    vietnameseMeaning: 'bản đồ',
    englishMeaning: 'map',
    jlptLevel: JlptLevel.N4,
    partOfSpeech: 'noun',
    exampleSentences: ['地図を見てください。'],
  },
  {
    word: '有名',
    hiragana: 'ゆうめい',
    vietnameseMeaning: 'nổi tiếng',
    englishMeaning: 'famous',
    jlptLevel: JlptLevel.N4,
    partOfSpeech: 'adjective',
    exampleSentences: ['有名なレストランです。'],
  },
  {
    word: '説明',
    hiragana: 'せつめい',
    vietnameseMeaning: 'giải thích',
    englishMeaning: 'explanation',
    jlptLevel: JlptLevel.N4,
    partOfSpeech: 'noun',
    exampleSentences: ['先生が説明します。'],
  },
  {
    word: '準備',
    hiragana: 'じゅんび',
    vietnameseMeaning: 'chuẩn bị',
    englishMeaning: 'preparation',
    jlptLevel: JlptLevel.N4,
    partOfSpeech: 'noun',
    exampleSentences: ['試験の準備をする。'],
  },
  {
    word: '楽しい',
    hiragana: 'たのしい',
    vietnameseMeaning: 'vui',
    englishMeaning: 'fun',
    jlptLevel: JlptLevel.N4,
    partOfSpeech: 'adjective',
    exampleSentences: ['旅行は楽しいです。'],
  },
  {
    word: '経験',
    hiragana: 'けいけん',
    vietnameseMeaning: 'kinh nghiệm',
    englishMeaning: 'experience',
    jlptLevel: JlptLevel.N3,
    partOfSpeech: 'noun',
    exampleSentences: ['貴重な経験をした。'],
  },
  {
    word: '影響',
    hiragana: 'えいきょう',
    vietnameseMeaning: 'ảnh hưởng',
    englishMeaning: 'influence',
    jlptLevel: JlptLevel.N3,
    partOfSpeech: 'noun',
    exampleSentences: ['天気に影響される。'],
  },
  {
    word: '提案',
    hiragana: 'ていあん',
    vietnameseMeaning: 'đề xuất',
    englishMeaning: 'proposal',
    jlptLevel: JlptLevel.N3,
    partOfSpeech: 'noun',
    exampleSentences: ['新しい提案をする。'],
  },
  {
    word: '我慢',
    hiragana: 'がまん',
    vietnameseMeaning: 'nhẫn nhịn, chịu đựng',
    englishMeaning: 'patience',
    jlptLevel: JlptLevel.N3,
    partOfSpeech: 'noun',
    exampleSentences: ['痛みを我慢する。'],
  },
  {
    word: '複雑',
    hiragana: 'ふくざつ',
    vietnameseMeaning: 'phức tạp',
    englishMeaning: 'complex',
    jlptLevel: JlptLevel.N3,
    partOfSpeech: 'adjective',
    exampleSentences: ['複雑な問題です。'],
  },
  {
    word: '訪問',
    hiragana: 'ほうもん',
    vietnameseMeaning: 'thăm viếng',
    englishMeaning: 'visit',
    jlptLevel: JlptLevel.N2,
    partOfSpeech: 'noun',
    exampleSentences: ['客先を訪問する。'],
  },
  {
    word: '傾向',
    hiragana: 'けいこう',
    vietnameseMeaning: 'khuynh hướng',
    englishMeaning: 'tendency',
    jlptLevel: JlptLevel.N2,
    partOfSpeech: 'noun',
    exampleSentences: ['増加する傾向がある。'],
  },
  {
    word: '曖昧',
    hiragana: 'あいまい',
    vietnameseMeaning: 'mơ hồ',
    englishMeaning: 'vague',
    jlptLevel: JlptLevel.N2,
    partOfSpeech: 'adjective',
    exampleSentences: ['曖昧な返事をした。'],
  },
  {
    word: '把握',
    hiragana: 'はあく',
    vietnameseMeaning: 'nắm bắt',
    englishMeaning: 'grasp',
    jlptLevel: JlptLevel.N1,
    partOfSpeech: 'noun',
    exampleSentences: ['状況を把握する。'],
  },
  {
    word: '矛盾',
    hiragana: 'むじゅん',
    vietnameseMeaning: 'mâu thuẫn',
    englishMeaning: 'contradiction',
    jlptLevel: JlptLevel.N1,
    partOfSpeech: 'noun',
    exampleSentences: ['話に矛盾がある。'],
  },
];

export async function seedVocabulary(
  prisma: PrismaClient,
): Promise<Vocabulary[]> {
  console.log('📚 Seeding vocabulary...');

  const existing = await prisma.vocabulary.findMany();
  if (existing.length > 0) {
    console.log(
      `⏭️  Vocabulary already seeded (${existing.length}), skipping.`,
    );
    return existing;
  }

  const created = await Promise.all(
    VOCABULARY.map((data) => prisma.vocabulary.create({ data })),
  );

  console.log(`✅ Vocabulary seeded: ${created.length}`);
  return created;
}
