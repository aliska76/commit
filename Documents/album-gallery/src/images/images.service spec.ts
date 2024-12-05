import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as schemas from '../schemas'

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(schemas.Image.name) private readonly imageModel: Model<schemas.Image>
  ) {}

  async createImage(createImageDto: any): Promise<schemas.Image> {
    const newImage = new this.imageModel(createImageDto)
    return newImage.save()
  }

  async getAllImages(): Promise<schemas.Image[]> {
    return this.imageModel.find().exec()
  }

  async getImagesByUserId(userId: string): Promise<schemas.Image[]> {
    return this.imageModel.find({ userId }).exec()
  }

  async getImageById(imageId: string): Promise<schemas.Image | null> {
    return this.imageModel.findById(imageId).exec()
  }

  async updateImage(imageId: string, updateImageDto: any): Promise<schemas.Image | null> {
    return this.imageModel.findByIdAndUpdate(imageId, updateImageDto, { new: true }).exec()
  }

  async deleteImage(imageId: string): Promise<any> {
    return this.imageModel.findByIdAndDelete(imageId).exec()
  }

  async getImagesByAlbumId(albumId: string): Promise<schemas.Image[]> {
    return this.imageModel.find({ albumId }).exec()
  }
}