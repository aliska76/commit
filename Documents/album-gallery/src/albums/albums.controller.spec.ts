import { Test, TestingModule } from '@nestjs/testing'
import { AlbumController } from './albums.controller'
import { AlbumService } from './albums.service'

describe('AlbumController', () => {
  let controller: AlbumController
  let service: AlbumService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        AlbumService,
        {
          provide: AlbumService,
          useValue: {
            createAlbum: jest.fn(),
            getAlbumById: jest.fn(),
            getAlbumsByUserId: jest.fn(),
            updateAlbum: jest.fn(),
            deleteAlbum: jest.fn(),
            getAlbumImages: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<AlbumController>(AlbumController)
    service = module.get<AlbumService>(AlbumService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})