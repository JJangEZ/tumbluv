import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cafes } from 'entities/cafes.entity';
import { Coupons } from 'entities/coupons.entity';
import { Users } from 'entities/users.entity';
import { CafeImages } from 'entities/cafe.images.entity';
import { MenuImages } from 'entities/menu.image.entity';
import { Menus } from 'entities/menus.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Cafes,Coupons,Users,CafeImages,MenuImages,Menus],
      synchronize: true,
      autoLoadEntities: true,
      charset: "utf8mb4" //  회원가입시 이모지가 들어갈 경우를 대비.
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
