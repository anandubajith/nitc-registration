import { Test, TestingModule } from '@nestjs/testing';
import { DueService } from './due.service';

describe('DueService', () => {
  let service: DueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DueService],
    }).compile();

    service = module.get<DueService>(DueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
