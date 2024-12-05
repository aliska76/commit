import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './users.service'
import { getModelToken } from '@nestjs/mongoose'
import * as schemas from '../schemas'

describe('UserService', () => {
  let service: UserService

  // Mock data and mock functions
  const createUserDto: any = { name: 'John Doe', email: 'johndoe@example.com', albumCount: 1 }
  const userId = 'uuid-1234'
  const mockUser = { _id: userId, ...createUserDto }
  const mockUpdatedUser = { _id: userId, name: 'Updated Name', email: 'johndoe@example.com' }
  const albums = [{ albumId: 'album-1', userId }]
  const images = [{ imageId: 'image-1', userId }]  
  
  const mockUserModel = {
    create: jest.fn().mockResolvedValue(Promise<any>),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockUser])
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser)
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUpdatedUser),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser)
    })
  }

  const mockAlbumModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(albums)
    })
  }

  const mockImageModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(images)
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(schemas.User.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(schemas.Album.name),
          useValue: mockAlbumModel,
        },
        {
          provide: getModelToken(schemas.Image.name),
          useValue: mockImageModel,
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })
  
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  
  describe('createUser', () => {
    it('should create a new user', async () => {
      // Act
      const user = await service.createUser(createUserDto)

      // Assert
      expect(mockUserModel.create).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      // Arrange
      const users = [mockUser]

      // Act
      const allUsers = await service.getAllUsers()
      
      // Assert
      expect(allUsers).toEqual(users)
      expect(mockUserModel.find).toHaveBeenCalled()
    })
  })

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      // Act
      const user = await service.getUserById(userId)

      // Assert
      expect(user).toEqual(mockUser)
      expect(mockUserModel.findById).toHaveBeenCalledWith(mockUser._id)
    })
  })

  describe('updateUser', () => {
    it('should update a user', async () => {
      // Act
      const user = await service.updateUser(userId, mockUpdatedUser)

      // Assert
      expect(user).toEqual(mockUpdatedUser)
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(userId, mockUpdatedUser, { new: true })
    })
  })

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      // Act
      const user = await service.deleteUser(userId)

      // Assert
      expect(user).toEqual(mockUser)
      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(userId)
    })
  })

  describe('getUserAlbums', () => {
    it('should return an array of albums for a user', async () => {
      // Act
      const userAlbums = await service.getUserAlbums(userId)
      
      // Assert
      expect(userAlbums).toEqual(albums)
      expect(mockAlbumModel.find).toHaveBeenCalledWith({ userId })
    })
  })

  describe('getUserImages', () => {
    it('should return an array of images for a user', async () => {
      // Act
      const userImages = await service.getUserImages(userId)

      // Assert
      expect(userImages).toEqual(images)
      expect(mockImageModel.find).toHaveBeenCalledWith({ userId })
    })
  })
})