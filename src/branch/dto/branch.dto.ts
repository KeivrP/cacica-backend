import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  location?: string;
}