import { Controller, Get, Query } from '@nestjs/common';
import { FruitsService, PaginatedFruitsResult } from './fruits.service';

@Controller('fruits')
export class FruitsController {
    constructor(private readonly fruitsService: FruitsService) {}

    @Get()
    async getFruits(
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ): Promise<PaginatedFruitsResult> {
        return this.fruitsService.findAll(
            search,
            page ? parseInt(page, 10) : 1,
            limit ? parseInt(limit, 10) : 6,
        );
    }
}