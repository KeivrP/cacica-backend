import { Project } from "src/projects/entities/project.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToMany } from "typeorm";

@Entity("branches")
export class Branch {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  location: string;

  @OneToMany(() => Project, (project) => project.branch)
  projects: Project[];
}
