// src/projects/entities/project.entity.ts
import { Branch } from 'src/branch/entities/branch.entities';
import { MonthlyTargets } from 'src/monthly_targets/entities/monthly-targets.entity';
import { ObjectivesProjects } from 'src/objectives_projects/entities/objectives-projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Branch, branch => branch.projects, { nullable: true })
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

    @OneToMany(() => ObjectivesProjects, object => object.project)
    @JoinColumn({ name: 'id' })
    objectivesProjects: ObjectivesProjects[];

    @OneToMany(() => MonthlyTargets, object => object.project)
    @JoinColumn({ name: 'id' })
    monthlyTargets: MonthlyTargets[];

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column({ nullable: true })
    branch_id: number;
}
