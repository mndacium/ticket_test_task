import { Ticket } from '../models/Ticket.model';

export interface ITicketService {
  findAllByEventId(eventId: number): Promise<Ticket[]>;
}
