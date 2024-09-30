// src/objectives_projects/objectives-projects.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateObjectivesProjectsDto } from './dto/create-objectives-projects.dto';
import { ObjectivesProjects } from './entities/objectives-projects.entity';

@Injectable()
export class ObjectivesProjectsService {
    constructor(
        @InjectRepository(ObjectivesProjects)
        private objectivesProjectsRepository: Repository<ObjectivesProjects>,
    ) {}

    async create(createObjectivesProjectsDto: CreateObjectivesProjectsDto): Promise<ObjectivesProjects> {
        const objectivesProject = this.objectivesProjectsRepository.create(createObjectivesProjectsDto);
        return this.objectivesProjectsRepository.save(objectivesProject);
    }

    async findAll(): Promise<ObjectivesProjects[]> {
        return this.objectivesProjectsRepository.find({ relations: ['objective', 'project'] });
    }
}
