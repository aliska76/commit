import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ImageController } from './images.controller' 
import { ImageService } from './images.service' 
import * as schemas from '../schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: schemas.Image.name, schema: schemas.ImageSchema },
      { name: schemas.Album.name, schema: schemas.AlbumSchema }
    ])
  ],
  controllers: [ImageController],
  providers: [ImageService]
})

export class ImageModule {}