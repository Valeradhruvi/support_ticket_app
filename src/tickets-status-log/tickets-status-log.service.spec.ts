import { Test, TestingModule } from '@nestjs/testing';
import { TicketsStatusLogService } from './tickets-status-log.service';

describe('TicketsStatusLogService', () => {
  let service: TicketsStatusLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsStatusLogService],
    }).compile();

    service = module.get<TicketsStatusLogService>(TicketsStatusLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
