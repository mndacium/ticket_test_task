import { Ticket } from 'src/ticket/domain/models/Ticket.model';
import { PriceData, SeatData, SectionData } from '../models';

export function mapApiDataToTicketModel({
  seats,
  prices,
  sections,
}: {
  seats: SeatData[];
  prices: PriceData[];
  sections: SectionData[];
}): Ticket[] {
  try {
    const availableSeats = seats.filter(
      ({ SeatStatusId }) => SeatStatusId === 0,
    );

    const pricesDictionary = prices
      .filter(({ PerformanceId }) => PerformanceId === 0)
      .reduce((acc, { ZoneId, Price }) => {
        acc[ZoneId] = Price;
        return acc;
      }, {});

    const sectionsDictionary = sections.reduce((acc, { Id, Description }) => {
      acc[Id] = Description;
      return acc;
    }, {});

    const mergedData: Ticket[] = availableSeats.map(
      ({ SectionId, SeatRow, SeatNumber, ZoneId }) => {
        const price = pricesDictionary[ZoneId] || 0;
        const section = sectionsDictionary[SectionId];
        const seatNumber = parseInt(SeatNumber);
        return {
          Section: section,
          Row: SeatRow,
          SeatNumber: seatNumber,
          Price: price,
        };
      },
    );

    return mergedData;
  } catch (error) {
    console.error('Error mapping data to ticket model:', error.message);
    throw error;
  }
}
