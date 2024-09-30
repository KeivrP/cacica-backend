// src/objectives_projects/objectives-projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectivesProjects } from './entities/objectives-projects.entity';
import { ObjectivesProjectsService } from './objectives-projects.service';
import { ObjectivesProjectsController } from './objectives-projects.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ObjectivesProjects])],
    providers: [ObjectivesProjectsService],
    controllers: [ObjectivesProjectsController],
    exports: [TypeOrmModule] // Asegúrate de exportar el TypeOrmModule
})
export class ObjectivesProjectsModule {}
