import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitsModule } from './fruits/fruits.module';
import { Fruit } from "./fruits/fruit.entity";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Fruit],
      autoLoadEntities: true,
      synchronize: true,
    }),
    FruitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
