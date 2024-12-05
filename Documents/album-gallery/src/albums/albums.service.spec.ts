import { Test, TestingModule } from '@nestjs/testing'
import { AlbumService  } from './albums.service'
import { getModelToken } from '@nestjs/mongoose'
import * as schemas from '../schemas'

describe('UserService', () => {
  let service: AlbumService

  // Mock data and mock functions
  const userId = 'uuid-1234'
  const createAlbumDto: any = { title: 'Album 1', userId: userId, description: 'First album' }
  const albumId = 'album-1234'
  const mockAlbum = { _id: albumId, ...createAlbumDto }
  const mockUpdatedAlbum = { _id: albumId, title: 'Updated Album', description: 'Updated description', userId: userId }
  const mockUser = { _id: userId, name: 'John Doe', albumCount: 1 }

  const mockAlbumModel = {
    create: jest.fn().mockResolvedValue(mockAlbum),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockAlbum]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockAlbum),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUpdatedAlbum)
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockAlbum)
    })
  }
  const mockUserModel = {
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
    updateOne: jest.fn().mockResolvedValue({})
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: getModelToken(schemas.Album.name),
          useValue: mockAlbumModel
        },
        {
          provide: getModelToken(schemas.User.name),
          useValue: mockUserModel,
        }
      ]
    }).compile()

    service = module.get<AlbumService>(AlbumService)
  })
  
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  
  describe('createAlbum', () => {
    it('should create a new user', async () => {
      // Act
      const user = await service.createAlbum(createAlbumDto)

      // Assert
      expect(mockAlbumModel.create).toHaveBeenCalledWith(createAlbumDto)
    })
  })

  describe('getAlbumById', () => {
    it('should return a album by albumID', async () => {
      // Act
      const album = await service.getAlbumById(albumId)

      // Assert
      expect(album).toEqual(mockAlbum)
      expect(mockAlbumModel.findById).toHaveBeenCalledWith(mockAlbum._id)
    })
  })

  describe('updateAlbum', () => {
    it('should update an album', async () => {
      // Act
      const album = await service.updateAlbum(albumId, mockUpdatedAlbum)

      // Assert
      expect(album).toEqual(mockUpdatedAlbum)
      expect(mockAlbumModel.findByIdAndUpdate).toHaveBeenCalledWith(albumId, mockUpdatedAlbum, { new: true })
    })
  })

  describe('deleteAlbum', () => {
    it('should delete an album by ID', async () => {
      // Act
      const album = await service.deleteAlbum(albumId)

      // Assert
      expect(album).toEqual(mockAlbum)
      expect(mockAlbumModel.findByIdAndDelete).toHaveBeenCalledWith(albumId)
    })
  })
})