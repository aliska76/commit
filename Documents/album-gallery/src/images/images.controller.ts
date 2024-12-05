import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ImageService } from './images.service'
import * as schemas from '../schemas'

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async createImage(@Body() createImageDto: any): Promise<schemas.Image> {
    return this.imageService.createImage(createImageDto)
  }

  @Get()
  async getAllImages(): Promise<schemas.Image[]> {
    return this.imageService.getAllImages()
  }

  @Get(':id')
  async getImageById(@Param('id') imageId: string): Promise<schemas.Image | null> {
    return this.imageService.getImageById(imageId)
  }

  @Get('/album/:albumId')
  async getImagesByAlbumId(@Param('albumId') albumId: string): Promise<schemas.Image[]> {
    return this.imageService.getImagesByAlbumId(albumId)
  }

  @Put(':id')
  async updateImage(
    @Param('id') imageId: string,
    @Body() updateImageDto: any,
  ): Promise<schemas.Image | null> {
    return this.imageService.updateImage(imageId, updateImageDto)
  }

  @Delete(':id')
  async deleteImage(@Param('id') imageId: string): Promise<any> {
    return this.imageService.deleteImage(imageId)
  }
}