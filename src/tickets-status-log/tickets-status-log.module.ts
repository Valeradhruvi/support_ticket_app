import { Module } from '@nestjs/common';
import { TicketsStatusLogService } from './tickets-status-log.service';
import { TicketsStatusLogController } from './tickets-status-log.controller';

@Module({
  controllers: [TicketsStatusLogController],
  providers: [TicketsStatusLogService],
})
export class TicketsStatusLogModule {}
