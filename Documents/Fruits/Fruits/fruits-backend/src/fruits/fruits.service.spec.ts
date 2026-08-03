import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { FruitsService } from './fruits.service';
import { Fruit } from './fruit.entity';
import initialFruits from './fruits-init.json';

describe('FruitsService', () => {
  let service: FruitsService;
  let mockRepository: any;

  beforeEach(async () => {
    // Mock TypeORM repository methods
    mockRepository = {
      count: jest.fn().mockResolvedValue(0),
      save: jest.fn().mockResolvedValue(initialFruits),
      findAndCount: jest.fn().mockResolvedValue([initialFruits, initialFruits.length]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FruitsService,
        {
          provide: getRepositoryToken(Fruit),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FruitsService>(FruitsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('FruitsService should be defined', () => {
    expect(service).toBeDefined();
  });

  // 1. Test default pagination and returning expected structure
  it('should return paginated fruits with default page and limit values', async () => {
    const defaultLimit = 6;
    const expectedData = initialFruits.slice(0, defaultLimit);

    mockRepository.findAndCount.mockResolvedValue([expectedData, initialFruits.length]);

    const result = await service.findAll();

    expect(result).toEqual({
      data: expectedData,
      total: initialFruits.length,
      page: 1,
      limit: 6,
      totalPages: Math.ceil(initialFruits.length / 6),
    });

    expect(mockRepository.findAndCount).toHaveBeenCalledTimes(1);
    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: {},
      skip: 0,
      take: 6,
    });
  });

  // 2. Test pagination with custom page and limit parameters
  it('should apply pagination parameters (skip and take) correctly', async () => {
    const page = 2;
    const limit = 2;
    const expectedSkip = (page - 1) * limit; // (2 - 1) * 2 = 2

    mockRepository.findAndCount.mockResolvedValue([[], initialFruits.length]);

    const result = await service.findAll(undefined, page, limit);

    expect(result.page).toBe(2);
    expect(result.limit).toBe(2);
    expect(result.totalPages).toBe(Math.ceil(initialFruits.length / limit));

    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: {},
      skip: expectedSkip,
      take: limit,
    });
  });

  // 3. Test search filter using TypeORM Like operator
  it('should filter fruits by name using TypeORM Like operator', async () => {
    const searchTerm = 'Apple';
    const targetFruit = initialFruits.find((f) => f.name === searchTerm);

    if (!targetFruit) {
      throw new Error('Test setup error: mock fruit not found');
    }

    const expectedResult = [targetFruit];
    mockRepository.findAndCount.mockResolvedValue([expectedResult, 1]);

    const results = await service.findAll(searchTerm, 1, 6);

    expect(results.data).toEqual(expectedResult);
    expect(results.total).toBe(1);
    expect(mockRepository.findAndCount).toHaveBeenCalledWith({
      where: {
        name: Like(`%${searchTerm}%`),
      },
      skip: 0,
      take: 6,
    });
  });

  // 4. Test error handling when repository query fails
  it('should throw an error if findAndCount method fails', async () => {
    const dbError = new Error('Database connection lost');
    mockRepository.findAndCount.mockRejectedValue(dbError);

    await expect(service.findAll()).rejects.toThrow('Database connection lost');
    expect(mockRepository.findAndCount).toHaveBeenCalledTimes(1);
  });

  // 5. Test database initialization and seeding branch logic (onModuleInit)
  describe('onModuleInit (Database Seeding)', () => {
    it('should seed the database with initial fruits if it is empty', async () => {
      mockRepository.count.mockResolvedValue(0);

      await service.onModuleInit();

      expect(mockRepository.count).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledWith(initialFruits);
    });

    it('should NOT seed the database if fruit records already exist', async () => {
      mockRepository.count.mockResolvedValue(6);

      await service.onModuleInit();

      expect(mockRepository.count).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('FruitsService - Pagination & Limits', () => {
    it('should calculate skip and take correctly for page 1 and limit 6', async () => {
      mockRepository.findAndCount.mockResolvedValue([initialFruits.slice(0, 6), initialFruits.length]);

      const result = await service.findAll(undefined, 1, 6);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        skip: 0, // (1 - 1) * 6
        take: 6,
      });
      expect(result.page).toBe(1);
      expect(result.limit).toBe(6);
    });

    it('should calculate skip correctly for subsequent pages (page 3, limit 4)', async () => {
      mockRepository.findAndCount.mockResolvedValue([[], initialFruits.length]);

      const result = await service.findAll(undefined, 3, 4);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        skip: 8, // (3 - 1) * 4
        take: 4,
      });
      expect(result.page).toBe(3);
      expect(result.limit).toBe(4);
    });

    it('should calculate totalPages correctly when total items division has a remainder', async () => {
      // 10 items total, limit 3 -> 4 total pages (3 + 3 + 3 + 1)
      mockRepository.findAndCount.mockResolvedValue([[], 10]);

      const result = await service.findAll(undefined, 1, 3);

      expect(result.totalPages).toBe(4);
    });

    it('should return totalPages as 1 when there are 0 total items', async () => {
      mockRepository.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.findAll(undefined, 1, 6);

      expect(result.totalPages).toBe(1);
      expect(result.total).toBe(0);
    });

    it('should sanitize negative or zero page values to page 1', async () => {
      mockRepository.findAndCount.mockResolvedValue([[], 0]);

      const resultWithZero = await service.findAll(undefined, 0, 6);
      const resultWithNegative = await service.findAll(undefined, -5, 6);

      expect(resultWithZero.page).toBe(1);
      expect(resultWithNegative.page).toBe(1);
      expect(mockRepository.findAndCount).toHaveBeenLastCalledWith({
        where: {},
        skip: 0,
        take: 6,
      });
    });

    it('should sanitize invalid/NaN limit values to default limit 6', async () => {
      mockRepository.findAndCount.mockResolvedValue([[], 0]);

      // @ts-expect-handling invalid input type cast
      const result = await service.findAll(undefined, 1, Number('invalid'));

      expect(result.limit).toBe(6);
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 6,
      });
    });
  });
});