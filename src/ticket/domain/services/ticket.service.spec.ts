import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { ITicketRepository } from '../repositories/ITicketRepository';
import { Ticket } from '../models/Ticket.model';
const mockTickets: Ticket[] = [
  { Section: 'section1', Row: 'Row1', SeatNumber: 123, Price: '999' },
  { Section: 'section2', Row: 'Row2', SeatNumber: 456, Price: '888' },
];
describe('TicketService', () => {
  let ticketService: TicketService;
  let ticketRepository: ITicketRepository;

  beforeEach(async () => {
    const mockRepository = {
      findAllByEventId: jest.fn((eventId: string) =>
        Promise.resolve(mockTickets),
      ),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: ITicketRepository, useValue: mockRepository },
      ],
    }).compile();

    ticketService = moduleRef.get<TicketService>(TicketService);
    ticketRepository = moduleRef.get<ITicketRepository>(ITicketRepository);
  });

  describe('#getAll', () => {
    beforeEach(() => {
      jest.spyOn(ticketRepository, 'findAllByEventId');
    });

    it('should be defined', () => {
      expect(ticketRepository.findAllByEventId).toBeDefined();
    });

    it('should call the api', () => {
      ticketService.findAllByEventId(1195);
      expect(ticketRepository.findAllByEventId).toBeCalledTimes(1);
    });
  });
});
