import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { UserService } from './users.service'
import * as schemas from '../schemas'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('insert')
  async insertUsers(): Promise<void> {
    return this.userService.insertUsersFromFile()
  }
 
  @Post()
  async createUser(@Body() createUserDto: any): Promise<schemas.User> {
    return this.userService.createUser(createUserDto)
  }

  @Get()
  async getAllUsers(): Promise<schemas.User[]> {
    return this.userService.getAllUsers()
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<schemas.User | null> {
    return this.userService.getUserById(userId)
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: any,
  ): Promise<schemas.User | null> {
    return this.userService.updateUser(userId, updateUserDto)
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<any> {
    return this.userService.deleteUser(userId)
  }

  @Get(':id/albums')
  async getUserAlbums(@Param('id') userId: string): Promise<schemas.Album[]> {
    return this.userService.getUserAlbums(userId)
  }

  @Get(':id/images')
  async getUserImages(@Param('id') userId: string): Promise<schemas.Image[]> {
    return this.userService.getUserImages(userId)
  }
}