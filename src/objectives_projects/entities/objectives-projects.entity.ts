// src/objectives_projects/entities/objectives-projects.entity.ts
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { Target } from "src/targets/entities/targets.entities";

@Entity("objectives_projects")
export class ObjectivesProjects {
  @PrimaryColumn()
  target_id: number;

  @PrimaryColumn()
  project_id: number;

  @Column({ type: "numeric", nullable: true })
  general_target: number;

  @ManyToOne(() => Target, (target) => target.objectivesProjects)
  @JoinColumn({ name: "target_id" })
  target: Target;

  @ManyToOne(() => Project, (project) => project.objectivesProjects)
  @JoinColumn({ name: "project_id" })
  project: Project;
}
