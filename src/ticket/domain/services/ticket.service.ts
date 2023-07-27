import { Inject, Injectable } from '@nestjs/common';
import { ITicketService } from './ITicketService';
import { ITicketRepository } from '../repositories/ITicketRepository';
import { Ticket } from '../models/Ticket.model';

@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @Inject(ITicketRepository)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async findAllByEventId(eventId: number): Promise<Ticket[]> {
    return this.ticketRepository.findAllByEventId(eventId);
  }
}
