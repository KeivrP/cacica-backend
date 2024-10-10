// src/monthly_targets/entities/monthly-targets.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity'; // Asegúrate de tener esta entidad
import { Target } from 'src/targets/entities/targets.entities';
import { Usuarios } from 'src/usuarios/entities/usuarios.entities';

@Entity('monthly_targets')
export class MonthlyTargets {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    user_id: number;

    @Column()
    target_id: number;

    @Column()
    month: string;

    @Column({ default: false }) // Set default value to false
    is_closed: boolean;

    @Column({ type: 'numeric', nullable: true })
    target_planificado: number;

    @Column({ type: 'numeric', nullable: true })
    target_reportado: number;

    @Column({ nullable: true })
    project_id: number;

    @ManyToOne(() => Target, objective => objective.monthlytargets)
    @JoinColumn({ name: 'target_id' })
    objective: Target;

    @ManyToOne(() => Project, project => project.monthlyTargets)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => Usuarios, user => user.monthlyTargets)
    @JoinColumn({ name: 'user_id' })
    users: Usuarios;
}
