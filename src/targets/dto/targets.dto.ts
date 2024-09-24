// src/targets/create-target.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty({ message: 'nomenclature should not be empty' })
  nomenclature: string;

  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;
}
