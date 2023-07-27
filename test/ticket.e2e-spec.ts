import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
describe('Ticket Resolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  const getQuery = (eventId: any) => `
    query {
      tickets(eventId: ${eventId}) {
        Section
        Row
        SeatNumber
        Price
      }
    }
  `;
  it('should return tickets data from the external APIs', async () => {
    const eventId = 1195;
    const query = getQuery(eventId);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });
    expect(response.body.data.tickets).toBeDefined();
    expect(Array.isArray(response.body.data.tickets)).toBe(true);
  }, 10000);

  it('should return validation error code', async () => {
    const eventId = 'text';
    const query = getQuery(eventId);
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });
    expect(response.body.errors[0].extensions.code).toBe(
      'GRAPHQL_VALIDATION_FAILED',
    );
  }, 10000);
});
