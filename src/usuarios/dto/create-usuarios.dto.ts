import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  avatar_url?: string;

  @IsNotEmpty()
  roleId: number;

  @IsNotEmpty()
  branchId: number;
}

export class UpdateUsuarioDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  avatar_url?: string;

  @IsNotEmpty()
  roleId: number;

  @IsNotEmpty()
  branchId: number;
}
