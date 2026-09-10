import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User, UserRole } from 'generated/prisma/client';
import { extname } from 'path';
import { R2StorageService } from 'storage/r2-storage.service';

import { CreatePresignedUrlsDto } from './dto/create-presigned-urls.dto';
import { DeleteObjectDto } from './dto/delete-object.dto';
import { DeleteObjectsByPrefixDto } from './dto/delete-objects-by-prefix.dto';
import { PresignedUrl } from './entities/presigned-url.entity';
import { UPLOAD_CONFIG, UploadPurpose } from './upload.config';

@Injectable()
export class UploadsService {
  constructor(private readonly storageService: R2StorageService) {}
  /**
   * resourceType
      ↓
  validate
        ↓
  check permission
        ↓
  check contentType
        ↓
  generate object key
        ↓
  generate presigned URL
        ↓
  return URL + key
   * @param currentUser 
   * @param createPresignedUrlsDto 
   */
  async presignedUrls(
    currentUser: User,
    createPresignedUrlsDto: CreatePresignedUrlsDto,
  ): Promise<PresignedUrl[]> {
    const { files, resourceId, purpose } = createPresignedUrlsDto;
    const config = UPLOAD_CONFIG[purpose];

    const isHavePermission = this.checkPermission(
      currentUser,
      purpose,
      resourceId,
    );

    if (!isHavePermission) {
      throw new ForbiddenException(
        'You do not have permission to upload this file.',
      );
    }

    const invalidFile = files.find(
      (file) => !config.allowedContentTypes.includes(file.contentType),
    );

    if (invalidFile) {
      throw new BadRequestException(
        `Invalid content type ${invalidFile.contentType} for this upload purpose`,
      );
    }

    const isPublic = config.visibility === 'public';

    return Promise.all(
      files.map((file) => {
        const uniqueKey = `${config.folderPath}/${resourceId}/${randomUUID()}${extname(file.fileName)}`;
        return this.storageService.createPresignedUploadUrl(
          uniqueKey,
          file.contentType,
          file.fileId,
          isPublic,
        );
      }),
    );
  }

  async deleteObject(user: User, deleteObjectDto: DeleteObjectDto) {
    const { purpose, resourceId, key } = deleteObjectDto;
    const isHavePermission = this.checkPermission(user, purpose, resourceId);

    if (!isHavePermission) {
      throw new ForbiddenException(
        'You do not have permission to delete this file.',
      );
    }

    return this.storageService.deleteObject(
      key,
      UPLOAD_CONFIG[purpose].visibility === 'public',
    );
  }

  async deleteObjectsByPrefix(
    user: User,
    deleteObjectByPrefixDto: DeleteObjectsByPrefixDto,
  ) {
    const { purpose, resourceId, prefix } = deleteObjectByPrefixDto;
    const isHavePermission = this.checkPermission(user, purpose, resourceId);

    if (!isHavePermission) {
      throw new ForbiddenException(
        'You do not have permission to delete this file.',
      );
    }

    return this.storageService.deleteObjectsByPrefix(
      prefix,
      UPLOAD_CONFIG[purpose].visibility === 'public',
    );
  }

  checkPermission(
    currentUser: User,
    purpose: UploadPurpose,
    resourceId: string,
  ): boolean {
    if (currentUser.role === UserRole.ADMIN) return true;

    switch (purpose) {
      case UploadPurpose.USER_AVATAR: {
        return currentUser.id === resourceId;
      }

      default:
        return false;
    }
  }
}
