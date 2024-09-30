// src/monthly_targets/monthly-targets.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyTargets } from './entities/monthly-targets.entity';
import { MonthlyTargetsService } from './monthly-targets.service';
import { MonthlyTargetsController } from './monthly-targets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MonthlyTargets])],
    providers: [MonthlyTargetsService],
    controllers: [MonthlyTargetsController],
    exports: [TypeOrmModule], // Asegúrate de exportar el TypeOrmModule
})
export class MonthlyTargetsModule {}
