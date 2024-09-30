// src/objectives_projects/objectives-projects.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ObjectivesProjectsService } from './objectives-projects.service';
import { CreateObjectivesProjectsDto } from './dto/create-objectives-projects.dto';
import { ObjectivesProjects } from './entities/objectives-projects.entity';

@Controller('objectives-projects')
export class ObjectivesProjectsController {
    constructor(private readonly objectivesProjectsService: ObjectivesProjectsService) {}

    @Post()
    async create(@Body() createObjectivesProjectsDto: CreateObjectivesProjectsDto): Promise<ObjectivesProjects> {
        return this.objectivesProjectsService.create(createObjectivesProjectsDto);
    }

    @Get()
    async findAll(): Promise<ObjectivesProjects[]> {
        return this.objectivesProjectsService.findAll();
    }
}
