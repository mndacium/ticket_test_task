import axios from 'axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Ticket } from '../../domain/models/Ticket.model';
import { ITicketRepository } from '../../domain/repositories/ITicketRepository';
import { PriceData, SeatData, SectionData } from './models';
import { mapApiDataToTicketModel } from './utils/mapApiDataToTicketModel';
import {
  getPricesEndpoint,
  getSeatsEndpoint,
  getSectionsEndpoint,
} from './constants/externalApiEndpoints';

@Injectable()
export class getTickets implements ITicketRepository {
  async findAllByEventId(eventId: number): Promise<Ticket[]> {
    const seatsEndpoint = getSeatsEndpoint(eventId);
    const pricesEndpoint = getPricesEndpoint(eventId);
    const sectionsEndpoint = getSectionsEndpoint();

    try {
      const [seatsResponse, pricesResponse, sectionsResponse] =
        await Promise.all([
          axios.get<SeatData[]>(seatsEndpoint),
          axios.get<PriceData[]>(pricesEndpoint),
          axios.get<SectionData[]>(sectionsEndpoint),
        ]);

      const { data: seats } = seatsResponse;
      const { data: prices } = pricesResponse;
      const { data: sections } = sectionsResponse;

      return mapApiDataToTicketModel({ seats, prices, sections });
    } catch (error) {
      console.error('Error fetching tickets from API:', error.message);

      throw new HttpException(
        'Error fetching tickets from API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
