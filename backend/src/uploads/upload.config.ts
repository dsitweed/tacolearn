const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MB = 1024 * 1024;

export enum UploadPurpose {
  USER_AVATAR = 'USER_AVATAR',
}

export type UploadPurposeConfig = {
  folderPath: string;
  visibility: 'public' | 'private';
  maxFileSize: number;
  allowedContentTypes: string[];
};

export const UPLOAD_CONFIG: Record<UploadPurpose, UploadPurposeConfig> = {
  [UploadPurpose.USER_AVATAR]: {
    folderPath: 'uploads/images/users',
    visibility: 'public',
    maxFileSize: 2 * MB,
    allowedContentTypes: ALLOWED_IMAGE_TYPES,
  },
};
