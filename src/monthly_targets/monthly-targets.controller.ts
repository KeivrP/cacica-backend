// src/monthly_targets/monthly-targets.controller.ts
import { Controller, Post, Body, Get, Put } from '@nestjs/common';
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
    @Put('update-target-reportado')
    async updateTargetReportado(@Body() body: { id: number, targetReportado: number }): Promise<MonthlyTargets> {
        const { id, targetReportado } = body;
        return this.monthlyTargetsService.updateTargetReportado(id, targetReportado);
    }

    @Put('close-monthly-targets')
    async closedMonthlyTargets(@Body() body: { projectId: number, month: string }): Promise<MonthlyTargets[]> {
        const { projectId, month } = body;
        return this.monthlyTargetsService.closedMonthlyTargets(projectId, month);
    }
}
