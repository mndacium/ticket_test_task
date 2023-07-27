import { Ticket } from '../models/Ticket.model';

export interface ITicketRepository {
  findAllByEventId(eventId: number): Promise<Ticket[]>;
}

export const ITicketRepository = Symbol('ITicketRepository');
