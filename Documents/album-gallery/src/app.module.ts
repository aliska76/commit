import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbumModule } from './albums/albums.module'
import { UserModule } from './users/user.module'
import { ImageModule } from './images/images.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/album-gallery'),
    UserModule,
    AlbumModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}