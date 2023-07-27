import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const path = 'graphql';
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000/${path}`);
  console.log(`Example of query: 
  query {
    tickets(eventId:1195){
       Section
       Row
       SeatNumber
       Price
       }
   }`);
  console.log('To run tests: npm run test');
}
bootstrap();
