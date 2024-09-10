import { Controller, Post, Body, Get } from '@nestjs/common';
import { Usuarios } from './entities/usuarios.entities';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() createUserDto: CreateUsuarioDto): Promise<Usuarios> {
    return this.usuariosService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  // Additional endpoints like GET, PUT, DELETE can be added here
}
