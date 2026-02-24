import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsStatusLogService } from './tickets-status-log.service';
import { CreateTicketsStatusLogDto } from './dto/create-tickets-status-log.dto';
import { UpdateTicketsStatusLogDto } from './dto/update-tickets-status-log.dto';

@Controller('tickets-status-log')
export class TicketsStatusLogController {
  constructor(private readonly ticketsStatusLogService: TicketsStatusLogService) {}

  @Post()
  create(@Body() createTicketsStatusLogDto: CreateTicketsStatusLogDto) {
    return this.ticketsStatusLogService.create(createTicketsStatusLogDto);
  }

  @Get()
  findAll() {
    return this.ticketsStatusLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsStatusLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketsStatusLogDto: UpdateTicketsStatusLogDto) {
    return this.ticketsStatusLogService.update(+id, updateTicketsStatusLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsStatusLogService.remove(+id);
  }
}
