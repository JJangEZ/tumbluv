import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // 모든 클라이언트로 부터 들어오는 payload에 대한 유효성 검사 규칙 적용
    // 규칙은 DTO에 명시 dto는 타입스크립트의 인터페이스와 같다.
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.enableCors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    // preflightContinue: false,
    // allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();