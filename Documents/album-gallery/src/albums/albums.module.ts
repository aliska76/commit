import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbumController } from './albums.controller'
import { AlbumService } from './albums.service'
import * as schemas from '../schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: schemas.Album.name, schema: schemas.AlbumSchema },
      { name: schemas.User.name, schema: schemas.UserSchema }
    ]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})

export class AlbumModule {}