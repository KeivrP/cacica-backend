// src/monthly_targets/dto/create-monthly-targets.dto.ts
import { IsNotEmpty, IsOptional, IsNumber, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateMonthlyTargetsDto {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  is_active: string;

  @IsNotEmpty()
  objective_id: number;

  @IsNotEmpty()
  @IsString()
  month: string;

  @IsOptional()
  @IsNumber()
  target_planificado: number;

  @IsOptional()
  @IsNumber()
  target_reportado: number;

  @IsOptional()
  project_id: number;
}
