import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './users.controller'
import { UserService } from './users.service'

describe('UserController', () => {
  let controller: UserController
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            getUserAlbums: jest.fn(),
            getUserImages: jest.fn()
          }
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = { name: 'John Doe', email: 'johndoe@example.com' }
      const result = { _id: 'uuid-1234', ...createUserDto }

      jest.spyOn(service, 'createUser').mockResolvedValue(result)

      expect(await controller.createUser(createUserDto)).toEqual(result)
    })
  })

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [
        { _id: 'uuid-1234', name: 'John Doe', email: 'johndoe@example.com' },
        { _id: 'uuid-5678', name: 'Jane Doe', email: 'janedoe@example.com' }
      ]

      jest.spyOn(service, 'getAllUsers').mockResolvedValue(result)

      expect(await controller.getAllUsers()).toEqual(result)
    })
  })

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const userId = 'uuid-1234'
      const result = { _id: userId, name: 'John Doe', email: 'johndoe@example.com' }

      jest.spyOn(service, 'getUserById').mockResolvedValue(result)

      expect(await controller.getUserById(userId)).toEqual(result)
    })

    it('should return null if user is not found', async () => {
      const userId = 'uuid-1234'
      jest.spyOn(service, 'getUserById').mockResolvedValue(null)

      expect(await controller.getUserById(userId)).toBeNull()
    })
  })

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = 'uuid-1234'
      const updateUserDto = { name: 'Updated Name' }
      const result = { _id: userId, ...updateUserDto }

      jest.spyOn(service, 'updateUser').mockResolvedValue(result)

      expect(await controller.updateUser(userId, updateUserDto)).toEqual(result)
    })
  })

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'uuid-1234'
      const result = { _id: userId }

      jest.spyOn(service, 'deleteUser').mockResolvedValue(result)

      expect(await controller.deleteUser(userId)).toEqual(result)
    })
  })

  describe('getUserAlbums', () => {
    it('should return an array of albums for a user', async () => {
      const userId = 'uuid-1234'
      const result = [
        { _id: 'album-1', title: 'Album 1', userId },
        { _id: 'album-2', title: 'Album 2', userId }
      ]

      jest.spyOn(service, 'getUserAlbums').mockResolvedValue(result)

      expect(await controller.getUserAlbums(userId)).toEqual(result)
    })
  })

  describe('getUserImages', () => {
    it('should return an array of images for a user', async () => {
      const userId = 'uuid-1234'
      const result = [
        { _id: 'image-1', url: 'image1.jpg', userId },
        { _id: 'image-2', url: 'image2.jpg', userId }
      ]

      jest.spyOn(service, 'getUserImages').mockResolvedValue(result)

      expect(await controller.getUserImages(userId)).toEqual(result)
    })
  })
})
