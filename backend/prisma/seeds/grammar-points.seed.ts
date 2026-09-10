import { GrammarPoint, JlptLevel, PrismaClient } from 'generated/prisma/client';

type GrammarSeed = {
  pattern: string;
  vietnameseMeaning: string;
  englishMeaning: string;
  japaneseExplanation: string;
  jlptLevel: JlptLevel;
  exampleSentences: string[];
};

const GRAMMAR_POINTS: GrammarSeed[] = [
  {
    pattern: '〜たいです',
    vietnameseMeaning: 'muốn làm gì',
    englishMeaning: 'want to do',
    japaneseExplanation: '話し手の願望を表す。',
    jlptLevel: JlptLevel.N5,
    exampleSentences: ['日本へ行きたいです。'],
  },
  {
    pattern: '〜てください',
    vietnameseMeaning: 'hãy làm gì (đề nghị)',
    englishMeaning: 'please do',
    japaneseExplanation: '依頼や指示を表す。',
    jlptLevel: JlptLevel.N5,
    exampleSentences: ['名前を書いてください。'],
  },
  {
    pattern: '〜ないでください',
    vietnameseMeaning: 'xin đừng làm gì',
    englishMeaning: 'please do not',
    japaneseExplanation: '禁止の依頼を表す。',
    jlptLevel: JlptLevel.N5,
    exampleSentences: ['ここで写真を撮らないでください。'],
  },
  {
    pattern: '〜ことができる',
    vietnameseMeaning: 'có thể làm gì',
    englishMeaning: 'be able to',
    japaneseExplanation: '能力や可能性を表す。',
    jlptLevel: JlptLevel.N4,
    exampleSentences: ['漢字を読むことができる。'],
  },
  {
    pattern: '〜たほうがいい',
    vietnameseMeaning: 'nên làm gì',
    englishMeaning: 'had better',
    japaneseExplanation: '助言を表す。',
    jlptLevel: JlptLevel.N4,
    exampleSentences: ['早く寝たほうがいい。'],
  },
  {
    pattern: '〜そうです',
    vietnameseMeaning: 'trông có vẻ',
    englishMeaning: 'looks like',
    japaneseExplanation: '見た目からの推量を表す。',
    jlptLevel: JlptLevel.N4,
    exampleSentences: ['雨が降りそうです。'],
  },
  {
    pattern: '〜わけではない',
    vietnameseMeaning: 'không hẳn là',
    englishMeaning: 'it does not mean that',
    japaneseExplanation: '部分否定を表す。',
    jlptLevel: JlptLevel.N3,
    exampleSentences: ['嫌いなわけではない。'],
  },
  {
    pattern: '〜おかげで',
    vietnameseMeaning: 'nhờ có',
    englishMeaning: 'thanks to',
    japaneseExplanation: '良い結果の原因を表す。',
    jlptLevel: JlptLevel.N3,
    exampleSentences: ['先生のおかげで合格した。'],
  },
  {
    pattern: '〜にとって',
    vietnameseMeaning: 'đối với',
    englishMeaning: 'for / to',
    japaneseExplanation: '立場や観点を表す。',
    jlptLevel: JlptLevel.N3,
    exampleSentences: ['私にとって大切な人だ。'],
  },
  {
    pattern: '〜に違いない',
    vietnameseMeaning: 'chắc chắn là',
    englishMeaning: 'must be',
    japaneseExplanation: '確信のある推量を表す。',
    jlptLevel: JlptLevel.N2,
    exampleSentences: ['彼は来るに違いない。'],
  },
  {
    pattern: '〜ものだ',
    vietnameseMeaning: 'thường thì, vốn dĩ',
    englishMeaning: 'tend to / should',
    japaneseExplanation: '一般的な性質や道理を表す。',
    jlptLevel: JlptLevel.N2,
    exampleSentences: ['子どもは遊びたいものだ。'],
  },
  {
    pattern: '〜ながらも',
    vietnameseMeaning: 'mặc dù',
    englishMeaning: 'although',
    japaneseExplanation: '逆接を表す。',
    jlptLevel: JlptLevel.N2,
    exampleSentences: ['狭いながらも快適な部屋だ。'],
  },
  {
    pattern: '〜をめぐって',
    vietnameseMeaning: 'xoay quanh',
    englishMeaning: 'concerning',
    japaneseExplanation: '議論の対象を表す。',
    jlptLevel: JlptLevel.N1,
    exampleSentences: ['遺産をめぐって争う。'],
  },
  {
    pattern: '〜ならではの',
    vietnameseMeaning: 'chỉ có ở',
    englishMeaning: 'unique to',
    japaneseExplanation: 'その存在だけの特徴を表す。',
    jlptLevel: JlptLevel.N1,
    exampleSentences: ['京都ならではの風景だ。'],
  },
  {
    pattern: '〜が早いか',
    vietnameseMeaning: 'ngay khi',
    englishMeaning: 'as soon as',
    japaneseExplanation: 'ある動作の直後を表す。',
    jlptLevel: JlptLevel.N1,
    exampleSentences: ['ベルが鳴るが早いか教室を出た。'],
  },
];

export async function seedGrammarPoints(
  prisma: PrismaClient,
): Promise<GrammarPoint[]> {
  console.log('📐 Seeding grammar points...');

  const existing = await prisma.grammarPoint.findMany();
  if (existing.length > 0) {
    console.log(
      `⏭️  Grammar points already seeded (${existing.length}), skipping.`,
    );
    return existing;
  }

  const created = await Promise.all(
    GRAMMAR_POINTS.map((data) => prisma.grammarPoint.create({ data })),
  );

  console.log(`✅ Grammar points seeded: ${created.length}`);
  return created;
}
