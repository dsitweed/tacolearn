import { type Dictionary, t } from 'intlayer';

const loginPageContent = {
  key: 'loginPage',
  content: {
    hero: {
      title: t({
        vi: 'Chào mừng đến với TacoLearn.',
        en: 'Welcome to TacoLearn.',
      }),
      description: t({
        vi: 'Đăng nhập để bắt đầu sử dụng nền tảng.',
        en: 'Sign in to start using the platform.',
      }),
      retentionValue: t({ vi: '98%', en: '98%' }),
      retentionLabel: t({
        vi: 'Độ hài lòng',
        en: 'Satisfaction',
      }),
      responseValue: t({ vi: '15 phút', en: '15 min' }),
      responseLabel: t({
        vi: 'Thời gian phản hồi',
        en: 'Response Time',
      }),
      quote: t({
        vi: '"Công cụ trực quan nhất trong bộ công cụ của tôi."',
        en: '"The most intuitive tool in my toolkit."',
      }),
    },
    title: t({
      vi: 'Chào mừng trở lại',
      en: 'Welcome back',
    }),
    subtitle: t({
      vi: 'Đăng nhập để tiếp tục.',
      en: 'Sign in to continue.',
    }),
    googleButton: t({ vi: 'Continue with Google', en: 'Continue with Google' }),
    continueWithGoogle: t({
      vi: 'Bạn sẽ được đăng nhập bằng tài khoản Google của mình.',
      en: 'You will be signed in with your Google account.',
    }),
    community: t({
      vi: '10,000+ học viên',
      en: '10,000+ learners',
    }),
    noAccount: t({
      vi: 'Chưa có tài khoản? ',
      en: "Don't have an account? ",
    }),
    createAccount: t({
      vi: 'Tạo tài khoản',
      en: 'Create an account',
    }),
  },
} satisfies Dictionary;

export default loginPageContent;
