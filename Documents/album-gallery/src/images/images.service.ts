import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as schemas from '../schemas'
import * as utils from '../utils/readFromFile'

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(schemas.Image.name) private readonly imageModel: Model<schemas.Image>,
    @InjectModel(schemas.Album.name) private readonly albumModel: Model<schemas.Album>
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

  async uploadImages(): Promise<void> {
    try {
      const imagesData = await utils.readImagesFromJson('images')
  
      await this.imageModel.deleteMany({})

      for (const imageData of imagesData) {
        const existingAlbum = await this.albumModel.findById(imageData.albumId).exec()
  
        if (existingAlbum) {
          const isImageAlreadyInAlbum = existingAlbum.images.includes(imageData._id)
  
          if (!isImageAlreadyInAlbum) {
            await this.albumModel.updateOne(
              { _id: imageData.albumId },
              {
                $inc: { imageCount: 1 },
                $push: { images: imageData._id }
              }
            )
          } else {
            console.log(`Image with ID ${imageData._id} already exists in album ${imageData.albumId}. Skipping.`)
          }
          
          const newImage = new this.imageModel(imageData)
          
          await newImage.save()
        } else {
          console.log(`Album with ID ${imageData.albumId} not found. Skipping.`)
        }
      }
  
      console.log('Images uploaded successfully')
    } catch (error) {
      throw new Error(`Error reading images.json: ${error}`)
    }
  }
}