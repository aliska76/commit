import { Test, TestingModule } from '@nestjs/testing';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';

describe('FruitsController', () => {
  let controller: FruitsController;
  let service: FruitsService;

  // Mock service containing the methods used by the controller
  const mockFruitsService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FruitsController],
      providers: [
        {
          provide: FruitsService,
          useValue: mockFruitsService, // Replace real service with mock implementation
        },
      ],
    }).compile();

    controller = module.get<FruitsController>(FruitsController);
    service = module.get<FruitsService>(FruitsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call fruitsService.findAll with parsed query params and default values', async () => {
    const mockResult = {
      data: [
        {
          id: '1',
          name: 'Apple',
          price: 1.5,
          description: 'Crisp red apple',
          imageUrl: 'http://example.com/apple.jpg',
        },
      ],
      total: 1,
      page: 1,
      limit: 6,
      totalPages: 1,
    };

    mockFruitsService.findAll.mockResolvedValue(mockResult);

    const result = await controller.getFruits('apple', '2', '6');

    // Verify controller correctly parses string query params into numbers
    expect(service.findAll).toHaveBeenCalledWith('apple', 2, 6);
    expect(result).toEqual(mockResult);
  });

  it('should fall back to default values when page and limit query params are missing', async () => {
    const mockResult = {
      data: [],
      total: 0,
      page: 1,
      limit: 6,
      totalPages: 1,
    };

    mockFruitsService.findAll.mockResolvedValue(mockResult);

    await controller.getFruits();

    // Verify fallback to default pagination parameters (page = 1, limit = 6)
    expect(service.findAll).toHaveBeenCalledWith(undefined, 1, 6);
  });
});