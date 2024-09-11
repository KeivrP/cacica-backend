import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuarios.entities';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async create(CreateUsuariosDto: CreateUsuarioDto): Promise<Usuarios> {
    const user = this.usuariosRepository.create(CreateUsuariosDto);
    return this.usuariosRepository.save(user);
  }

  async findAll(): Promise<Usuarios[]> {
    return this.usuariosRepository.find({ relations: ['role', 'branch'] });
  }

  // Additional methods like findAll, findOne, update, delete can be added here
}
