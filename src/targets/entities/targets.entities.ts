// src/targets/target.entity.ts
import { MonthlyTargets } from 'src/monthly_targets/entities/monthly-targets.entity';
import { ObjectivesProjects } from 'src/objectives_projects/entities/objectives-projects.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomenclature: string;

  @Column()
  name: string;

  @OneToMany(() => Project, project => project.branch)
  @JoinColumn({ name: 'id' })
  projects: Project[];

  @OneToMany(() => ObjectivesProjects, project => project.target)
  @JoinColumn({ name: 'id' })
  objectivesProjects: ObjectivesProjects[];

  @OneToMany(() => MonthlyTargets, project => project.objective)
  @JoinColumn({ name: 'id' })
  monthlytargets: MonthlyTargets[];


}
