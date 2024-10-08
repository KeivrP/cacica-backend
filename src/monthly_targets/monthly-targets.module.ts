// src/monthly_targets/monthly-targets.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MonthlyTargets } from "./entities/monthly-targets.entity";
import { MonthlyTargetsService } from "./monthly-targets.service";
import { MonthlyTargetsController } from "./monthly-targets.controller";
import { ObjectivesProjectsModule } from "src/objectives_projects/objectives-projects.module";
import { ProjectsModule } from "src/projects/projects.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MonthlyTargets]),
        ObjectivesProjectsModule,
        forwardRef(() => ProjectsModule)
    ],
    providers: [MonthlyTargetsService],
    controllers: [MonthlyTargetsController],
    exports: [TypeOrmModule],
})
export class MonthlyTargetsModule {}
