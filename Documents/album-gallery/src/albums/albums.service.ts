import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as schemas from '../schemas'
import * as utils from '../utils/readFromFile'

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(schemas.Album.name) private readonly albumModel: Model<schemas.Album>,
    @InjectModel(schemas.User.name) private readonly userModel: Model<schemas.User>
  ) {}

  async createAlbum(createAlbumDto: any): Promise<schemas.Album> {
    return this.albumModel.create(createAlbumDto)
  }

  async getAlbumById(albumId: string): Promise<schemas.Album | null> {
    return this.albumModel.findById(albumId).exec()
  }

  async getAlbumsByUserId(userId: string): Promise<schemas.Album[]> {
    return this.albumModel.find({ userId }).exec()
  }

  async updateAlbum(albumId: string, updateAlbumDto: any): Promise<schemas.Album | null> {
    return this.albumModel.findByIdAndUpdate(albumId, updateAlbumDto, { new: true }).exec()
  }

  async deleteAlbum(albumId: string): Promise<any> {
    return this.albumModel.findByIdAndDelete(albumId).exec()
  }

  async getAlbumImages(albumId: string): Promise<any[]> {
    const album = await this.albumModel.findById(albumId).exec()
    if (!album) {
      throw new Error('Album not found')
    }
    return album.images
  }
  
  async uploadAlbums(): Promise<void> {
    try {
      const albumsData = await utils.readImagesFromJson('albums')
      
      await this.albumModel.deleteMany({})
      
      for (const albumData of albumsData) {
        const existingUser = await this.userModel.findById(albumData.userId).exec()

        if (existingUser) {
          const existingAlbum = await this.albumModel.findById(albumData.albumId).exec()

          if (!existingAlbum) {
            const newAlbum = new this.albumModel(albumData)
            await newAlbum.save()

            await this.userModel.updateOne(
              { _id: albumData.userId },
              { $inc: { albumCount: 1 } }
            )
            console.log(`User with ID ${albumData.userId} found for albumId is ${albumData._id}`)
          }
        } else {
          console.log(`User with ID ${albumData.userId} not found. Skipping.`)
        }
      
      }
    }
      catch(error) {
        throw new Error(`Error reading albums.json: ${error}`)
      }
    console.log('Albums uploaded successfully')
  }
}