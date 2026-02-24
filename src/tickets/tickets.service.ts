import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    @InjectRepository(User) private UserRepo: Repository<User>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketRepo.create(createTicketDto);
    return {
      message: 'Ticket Generated successfully',
      status: 200,
      data: this.ticketRepo.save(ticket),
    };
  }

  findAll() {
    return this.ticketRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.ticketRepo.findOne({ where: { id } });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    this.ticketRepo.update(id, updateTicketDto);
    return {
      message: 'Ticket Updated successfully',
      status: 200,
    };
  }

  remove(id: number) {
    this.ticketRepo.delete(id);
    return {
      message: 'Ticket Deleted successfully',
      status: 200,
    };
  }
}
