// src/projects/dto/create-project.dto.ts
import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    branch_id: number;

    @IsDateString()
    start_date: string;

    @IsDateString()
    end_date: string;

    @IsNotEmpty()
    objectives: {
        id: number;
        goal: number;
        roles: { id: number; name: string }[];
    }[];
}
