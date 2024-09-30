// src/projects/projects.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto.';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    async findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }
}
