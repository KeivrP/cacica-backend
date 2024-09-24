// src/targets/targets.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TargetsService } from './targets.service';
import { Target } from './entities/targets.entities';
import { CreateTargetDto } from './dto/targets.dto';

@Controller('targets')
export class TargetsController {
  constructor(private readonly targetsService: TargetsService) {}

  @Get()
  findAll(): Promise<Target[]> {
    return this.targetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Target> {
    return this.targetsService.findOne(id);
  }

  @Post()
  async create(@Body() createTargetDto: CreateTargetDto): Promise<Target> {
    return this.targetsService.create(createTargetDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() target: Partial<Target>): Promise<Target> {
    return this.targetsService.update(id, target);
  }
}
