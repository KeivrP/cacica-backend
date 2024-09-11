import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuarios } from "./entities/usuarios.entities";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./dto/create-usuarios.dto";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>
  ) {}

  async create(CreateUsuariosDto: CreateUsuarioDto): Promise<Usuarios> {
    const user = this.usuariosRepository.create(CreateUsuariosDto);
    return this.usuariosRepository.save(user);
  }

  async findAll(): Promise<Usuarios[]> {
    return this.usuariosRepository.find({ relations: ["role", "branch"] });
  }

  async update(
    id: number,
    UpdateUsuariosDto: UpdateUsuarioDto
  ): Promise<Usuarios> {
    const user = await this.usuariosRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = {
      name: UpdateUsuariosDto.name,
      email: UpdateUsuariosDto.email,
      roleId: UpdateUsuariosDto.roleId,
      branchId: UpdateUsuariosDto.branchId,
    };

    await this.usuariosRepository.update(id, updatedUser);
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async disable(id: number): Promise<Usuarios> {
    const user = await this.usuariosRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }
    // Invertimos el valor de is_active usando un operador ternario
    user.is_active = user.is_active ? false : true;

    return this.usuariosRepository.save(user);
  }
  // Additional methods like findAll, findOne, update, delete can be added here
}
