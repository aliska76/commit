import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { AlbumService } from './albums.service'
import * as schemas from '../schemas'

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async createAlbum(@Body() createAlbumDto: any): Promise<schemas.Album> {
    return this.albumService.createAlbum(createAlbumDto)
  }

  // @Get()
  // async getAllAlbums(): Promise<schemas.Album[]> {
  //   return this.albumService.getAllAlbums()
  // }

  @Get(':id')
  async getAlbumById(@Param('id') albumId: string): Promise<schemas.Album | null> {
    return this.albumService.getAlbumById(albumId)
  }

  @Get('user/:userId')
  async getAlbumsByUserId(@Param('userId') userId: string): Promise<schemas.Album[]> {
    return this.albumService.getAlbumsByUserId(userId)
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: any,
  ): Promise<schemas.Album | null> {
    return this.albumService.updateAlbum(albumId, updateAlbumDto)
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') albumId: string): Promise<any> {
    return this.albumService.deleteAlbum(albumId)
  }

  @Get(':id/images')
  async getAlbumImages(@Param('id') albumId: string): Promise<any[]> {
    return this.albumService.getAlbumImages(albumId)
  }
}