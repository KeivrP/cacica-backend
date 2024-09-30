// src/objectives_projects/dto/create-objectives-projects.dto.ts
import { IsNotEmpty } from "class-validator";
import { Project } from "src/projects/entities/project.entity";
import { Target } from "src/targets/entities/targets.entities";
import { ManyToOne, JoinColumn } from "typeorm";

export class CreateObjectivesProjectsDto {
  @IsNotEmpty()
  @ManyToOne(() => Target)
  @JoinColumn({ name: "target_id" })
  target_id: number;

  @IsNotEmpty()
  @ManyToOne(() => Project)
  @JoinColumn({ name: "project_id" })
  project_id: number;

  general_target: number;
}
