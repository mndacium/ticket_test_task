import { Args, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from '../../domain/models/Ticket.model';
import { TicketService } from '../../domain/services/ticket.service';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

class TicketsArgs {
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'eventId must be an integer' })
  @Min(0, { message: 'eventId must be a positive integer' })
  eventId: number;
}
@Resolver(Ticket)
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @Query(() => [Ticket])
  async tickets(@Args() args: TicketsArgs): Promise<Ticket[]> {
    const { eventId } = args;
    return this.ticketService.findAllByEventId(eventId);
  }
}
