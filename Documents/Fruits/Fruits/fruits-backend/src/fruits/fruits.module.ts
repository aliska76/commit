import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { Fruit } from './fruit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit])],
  controllers: [FruitsController],
  providers: [FruitsService],
})
export class FruitsModule {}
