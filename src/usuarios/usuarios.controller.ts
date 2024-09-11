import { Controller, Post, Body, Get, Put, Patch, Param } from "@nestjs/common";
import { Usuarios } from "./entities/usuarios.entities";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./dto/create-usuarios.dto";
import { UsuariosService } from "./usuarios.service";

@Controller("usuarios")
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

  @Put()
  async update(@Body() updateUserDto: UpdateUsuarioDto): Promise<Usuarios> {
    return this.usuariosService.update(updateUserDto.id, updateUserDto);
  }

  @Patch('disable/:id')
  async disable(@Param('id') id: number): Promise<Usuarios> {
    return this.usuariosService.disable(id);
  }

  // Additional endpoints like GET, PUT, DELETE can be added here
}
