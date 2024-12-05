import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as schemas from '../schemas'
import * as utils from '../utils/readFromFile'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(schemas.User.name) private readonly userModel: Model<typeof schemas.UserSchema>,
        @InjectModel(schemas.Album.name) private readonly albumModel: Model<schemas.Album>,
        @InjectModel(schemas.Image.name) private readonly imageModel: Model<schemas.Image>
  ) {}

  async createUser(createUserDto: schemas.User): Promise<any> {  
    return this.userModel.create(createUserDto)
  }

  async getAllUsers(): Promise<any[]> {
    return this.userModel.find().exec()
  }

  async getUserById(userId: string): Promise<any | null> {
    return this.userModel.findById(userId).exec()
  }

  async updateUser(userId: string, updateUserDto: any): Promise<any | null> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec()
  }

  async deleteUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndDelete(userId).exec()
  }

  async getUserAlbums(userId: string): Promise<any[]> {
    return this.albumModel.find({ userId }).exec()
  }

  async getUserImages(userId: string): Promise<any[]> {
    return this.imageModel.find({ userId }).exec()
  }

  async insertUsersFromFile(): Promise<void> {
    const users = await utils.readImagesFromJson('users')

    await this.userModel.deleteMany({})

    try {
      console.log('Inserting users into MongoDB...')
      await this.userModel.insertMany(users)
      console.log('Users inserted successfully!')
    } catch (error) {
      console.error('Error inserting users:', error)
      throw error
    }
  }
}