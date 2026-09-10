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
    googleButton: t({ vi: 'Google', en: 'Google' }),
    facebookButton: t({ vi: 'Facebook', en: 'Facebook' }),
    emailLabel: t({ vi: 'Email', en: 'Email' }),
    passwordLabel: t({ vi: 'Mật khẩu', en: 'Password' }),
    submitButton: t({ vi: 'Đăng nhập', en: 'Sign In' }),
    divider: t({
      vi: 'Hoặc dùng email',
      en: 'Or use email',
    }),
    rememberMe: t({
      vi: 'Ghi nhớ đăng nhập',
      en: 'Remember me',
    }),
    forgotPassword: t({
      vi: 'Quên mật khẩu?',
      en: 'Forgot password?',
    }),
    noAccount: t({
      vi: 'Chưa có tài khoản? ',
      en: "Don't have an account? ",
    }),
    createAccount: t({
      vi: 'Tạo tài khoản mới',
      en: 'Create new account',
    }),
    comingSoon: t({
      vi: 'Tính năng sắp ra mắt',
      en: 'Coming soon',
    }),
    validation: {
      emailInvalid: t({
        vi: 'Email không hợp lệ.',
        en: 'Invalid email.',
      }),
      passwordMin: t({
        vi: 'Mật khẩu phải có ít nhất 6 ký tự.',
        en: 'Password must be at least 6 characters.',
      }),
    },
  },
} satisfies Dictionary;

export default loginPageContent;
