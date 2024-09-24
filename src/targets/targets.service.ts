// src/targets/targets.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Target } from './entities/targets.entities';
import { CreateTargetDto } from './dto/targets.dto';

@Injectable()
export class TargetsService {
  constructor(
    @InjectRepository(Target)
    private targetsRepository: Repository<Target>,
  ) {}

  findAll(): Promise<Target[]> {
    return this.targetsRepository.find();
  }

  findOne(id: number): Promise<Target> {
    return this.targetsRepository.findOneBy({ id });
  }

  async create(CreateTargetsDto: CreateTargetDto): Promise<Target> {
    const targets = this.targetsRepository.create(CreateTargetsDto);
    return this.targetsRepository.save(targets);
  }

  async update(id: number, target: Partial<Target>): Promise<Target> {
    await this.targetsRepository.update(id, target);
    return this.findOne(id);
  }
}
