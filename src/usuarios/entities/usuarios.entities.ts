import { Branch } from 'src/branch/entities/branch.entities';
import { Role } from 'src/roles/entities/roles.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class Usuarios {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;
  
  @Column({ type: 'text', nullable: false })
  avatar_url: string;
  
  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Branch, (branch) => branch.id)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;
 
}