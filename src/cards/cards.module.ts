import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './models/cards.model';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cards]), UsersModule],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
