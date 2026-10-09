import '@testing-library/jest-dom';

// `intlayer` loads esbuild at import time, which cannot run inside the Jest
// jsdom environment. Only `Locales` (and a few helpers) are used by the app
// code that unit tests pull in, so stub the module instead.
jest.mock('intlayer', () => ({
  Locales: { ENGLISH: 'en', VIETNAMESE: 'vi' },
  getHTMLTextDir: () => 'ltr',
  getLocaleName: (locale: string) => locale,
  getLocalizedUrl: (url: string) => url,
  t: (value: unknown) => value,
}));
