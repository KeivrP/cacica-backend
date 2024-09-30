// src/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { ObjectivesProjectsModule } from '../objectives_projects/objectives-projects.module'; // Importar el módulo de ObjectivesProjects
import { TargetModule } from 'src/targets/targets.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { MonthlyTargetsModule } from 'src/monthly_targets/monthly-targets.module';
import { MonthlyTargetsService } from 'src/monthly_targets/monthly-targets.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        ObjectivesProjectsModule,
        MonthlyTargetsModule,
        TargetModule,
        UsuariosModule,
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService, MonthlyTargetsService],
})
export class ProjectsModule {}