import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'core/prisma/prisma.service';
import { R2StorageService } from 'infrastructure/storage/r2-storage.service';

import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

describe('UploadsController', () => {
  let controller: UploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      providers: [
        UploadsService,
        { provide: PrismaService, useValue: {} },
        { provide: R2StorageService, useValue: {} },
      ],
    }).compile();

    controller = module.get<UploadsController>(UploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
