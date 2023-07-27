import { Module } from '@nestjs/common';
import { TicketResolver } from './adapters/ticketResolver/ticket.resolver';
import { TicketService } from './domain/services/ticket.service';
import { ITicketRepository } from './domain/repositories/ITicketRepository';
import { getTickets } from './adapters/myLaphilApi/getTickets';

@Module({
  providers: [
    TicketService,
    {
      provide: ITicketRepository,
      useClass: getTickets,
    },
    TicketResolver,
  ],
})
export class TicketModule {}
