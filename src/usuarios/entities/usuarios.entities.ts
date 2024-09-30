import { Branch } from 'src/branch/entities/branch.entities';
import { MonthlyTargets } from 'src/monthly_targets/entities/monthly-targets.entity';
import { Role } from 'src/roles/entities/roles.entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('users')
export class Usuarios {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  email: string;
  
  @Column({ type: 'text', default: 'vacio' })
  avatar_url: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  is_active: boolean;
  
  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Branch, (branch) => branch.id)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @OneToMany(() => MonthlyTargets, object => object.users)
  monthlyTargets: MonthlyTargets;
 
  @Column({ type: 'number', nullable: false })
  roleId: number;

  @Column({ type: 'number', nullable: false })
  branchId: number;

}