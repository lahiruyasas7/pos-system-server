import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
