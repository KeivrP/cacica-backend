// src/monthly_targets/monthly-targets.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMonthlyTargetsDto } from './dto/create-monthly-targets.dto';
import { MonthlyTargets } from './entities/monthly-targets.entity';

@Injectable()
export class MonthlyTargetsService {
    constructor(
        @InjectRepository(MonthlyTargets)
        private monthlyTargetsRepository: Repository<MonthlyTargets>,
    ) {}

    async create(createMonthlyTargetsDto: CreateMonthlyTargetsDto): Promise<MonthlyTargets> {
        const monthlyTarget = this.monthlyTargetsRepository.create(createMonthlyTargetsDto);
        return this.monthlyTargetsRepository.save(monthlyTarget);
    }

    async findAll(): Promise<MonthlyTargets[]> {
        return this.monthlyTargetsRepository.find({ relations: ['objective', 'project', 'users'] });
    }

    async findOne(id: number): Promise<MonthlyTargets> {
        return this.monthlyTargetsRepository.findOne({ where: { id }, relations: ['objective', 'project', 'users'] });
    }

    async findByProjectId(projectId: number): Promise<MonthlyTargets[]> {
        return this.monthlyTargetsRepository.find({ where: { project: { id: projectId } }, relations: ['objective', 'project', 'users'] });
    }
}
