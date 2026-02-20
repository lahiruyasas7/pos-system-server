import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_PREFIX, {
    exclude: ['/'], //Adds a prefix like /api to all routes except /, which remains unprefixed. Great for versioning.
  });
  app.useGlobalPipes(new ValidationPipe()); //Ensures that incoming requests conform to your DTO validation rules.

  //cors configuration
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests like Postman
      const frontendUrl = process.env.FRONTEND_URL;
      if (frontendUrl && origin === frontendUrl) {
        callback(null, true); // allow this origin
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`)); // block any other origin
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // allowed HTTP methods
    credentials: true, // allow cookies and Authorization headers
  });

  await app.listen(3000);
}
bootstrap();
