import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entities';
import { CreateRoleDto } from './dto/role.dto';


@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = this.rolesRepository.create(createRoleDto);
        return this.rolesRepository.save(role);
    }

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }
}
