import { type Dictionary, t } from 'intlayer';

const registerPageContent = {
  key: 'registerPage',
  content: {
    title: t({
      vi: 'Tạo tài khoản',
      en: 'Create an account',
    }),
    subtitle: t({
      vi: 'Tiếp tục với Google để bắt đầu.',
      en: 'Continue with Google to get started.',
    }),
    googleButton: t({
      vi: 'Continue with Google',
      en: 'Continue with Google',
    }),
    continueWithGoogle: t({
      vi: 'Bạn sẽ được tạo tài khoản tự động.',
      en: 'Your account will be created automatically.',
    }),
    alreadyAccount: t({
      vi: 'Đã có tài khoản? ',
      en: 'Already have an account? ',
    }),
  },
} satisfies Dictionary;

export default registerPageContent;
