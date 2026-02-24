import { Test, TestingModule } from '@nestjs/testing';
import { TicketsStatusLogController } from './tickets-status-log.controller';
import { TicketsStatusLogService } from './tickets-status-log.service';

describe('TicketsStatusLogController', () => {
  let controller: TicketsStatusLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsStatusLogController],
      providers: [TicketsStatusLogService],
    }).compile();

    controller = module.get<TicketsStatusLogController>(TicketsStatusLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
