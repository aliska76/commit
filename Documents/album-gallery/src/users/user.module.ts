import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './users.service'
import { UserController } from './users.controller'
import * as schemas from '../schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: schemas.UserSchema },
      { name: 'Album', schema: schemas.AlbumSchema },
      { name: 'Image', schema: schemas.ImageSchema }
    ])
  ],
  providers: [UserService],
  controllers: [UserController]
})

export class UserModule {}