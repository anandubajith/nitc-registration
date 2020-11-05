import { Test, TestingModule } from '@nestjs/testing';
import { DueController } from './due.controller';

describe('DueController', () => {
  let controller: DueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DueController],
    }).compile();

    controller = module.get<DueController>(DueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
