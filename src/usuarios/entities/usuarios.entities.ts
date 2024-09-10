import { Branch } from 'src/branch/entities/branch.entities';
import { Role } from 'src/roles/entities/roles.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('users')
export class Usuarios {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @Column({ type: 'text', nullable: false })
  avatar_url: string;


  @ManyToOne(() => Branch, (branch) => branch.id)
  branch: Branch;

}
 