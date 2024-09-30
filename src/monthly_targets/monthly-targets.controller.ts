// src/monthly_targets/monthly-targets.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { MonthlyTargetsService } from './monthly-targets.service';
import { CreateMonthlyTargetsDto } from './dto/create-monthly-targets.dto';
import { MonthlyTargets } from './entities/monthly-targets.entity';

@Controller('monthly-targets')
export class MonthlyTargetsController {
    constructor(private readonly monthlyTargetsService: MonthlyTargetsService) {}

    @Post()
    async create(@Body() createMonthlyTargetsDto: CreateMonthlyTargetsDto): Promise<MonthlyTargets> {
        return this.monthlyTargetsService.create(createMonthlyTargetsDto);
    }

    @Get()
    async findAll(): Promise<MonthlyTargets[]> {
        return this.monthlyTargetsService.findAll();
    }
    @Get(':id')
    async findOne(id: number): Promise<MonthlyTargets> {
        return this.monthlyTargetsService.findOne(id);
    }

    @Get('project/:projectId')
    async findByProjectId(projectId: number): Promise<MonthlyTargets[]> {
        return this.monthlyTargetsService.findByProjectId(projectId);
    }
}
