import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entities';
import { Role } from 'src/roles/entities/roles.entities';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Branch } from 'src/branch/entities/branch.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios, Role, Branch])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [TypeOrmModule] // Asegúrate de exportar el TypeOrmModule

})
export class UsuariosModule {}
