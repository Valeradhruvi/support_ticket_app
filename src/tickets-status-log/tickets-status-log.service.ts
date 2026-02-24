import { Injectable } from '@nestjs/common';
import { CreateTicketsStatusLogDto } from './dto/create-tickets-status-log.dto';
import { UpdateTicketsStatusLogDto } from './dto/update-tickets-status-log.dto';

@Injectable()
export class TicketsStatusLogService {
  create(createTicketsStatusLogDto: CreateTicketsStatusLogDto) {
    return 'This action adds a new ticketsStatusLog';
  }

  findAll() {
    return `This action returns all ticketsStatusLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketsStatusLog`;
  }

  update(id: number, updateTicketsStatusLogDto: UpdateTicketsStatusLogDto) {
    return `This action updates a #${id} ticketsStatusLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketsStatusLog`;
  }
}
