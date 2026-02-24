import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsStatusLogModule } from './tickets-status-log/tickets-status-log.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/entities/user.entity';
import { Ticket } from './tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'ticket_system',
      synchronize: true,
    }),
    UsersModule,
    TicketsModule,
    TicketsStatusLogModule,
    CommentsModule,

    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
