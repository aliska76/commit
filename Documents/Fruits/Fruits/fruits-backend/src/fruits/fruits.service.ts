import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Fruit } from './fruit.entity';
import initialFruits from './fruits-init.json';

export interface PaginatedFruitsResult {
    data: Fruit[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Injectable()
export class FruitsService implements OnModuleInit {
    constructor(
        @InjectRepository(Fruit)
        private readonly fruitRepository: Repository<Fruit>,
    ) {}

    async onModuleInit() {
        const count = await this.fruitRepository.count();

        if (count === 0) {
            await this.fruitRepository.save(initialFruits);
            console.log(`🌱 Database automatically seeded with ${initialFruits.length} fruits from JSON`);
        }
    }

    async findAll(
        search?: string,
        page: number = 1,
        limit: number = 6,
    ): Promise<PaginatedFruitsResult> {
        const pageNumber = Math.max(1, Number(page) || 1);
        const limitNumber = Math.max(1, Number(limit) || 6);
        const skip = (pageNumber - 1) * limitNumber;

        const [data, total] = await this.fruitRepository.findAndCount({
            where: search ? { name: Like(`%${search}%`) } : {},
            skip,
            take: limitNumber,
        });

        return {
            data,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber) || 1,
        };
    }
}