// src/projects/projects.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./entities/project.entity";
import { ObjectivesProjects } from "../objectives_projects/entities/objectives-projects.entity";
import { MonthlyTargets } from "../monthly_targets/entities/monthly-targets.entity";
import { MonthlyTargetsService } from "../monthly_targets/monthly-targets.service";
import { Target } from "../targets/entities/targets.entities";
import { CreateProjectDto } from "./dto/create-projects.dto.";
import { Usuarios } from "src/usuarios/entities/usuarios.entities";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(ObjectivesProjects)
    private objectivesProjectsRepository: Repository<ObjectivesProjects>,
    @InjectRepository(MonthlyTargets)
    private monthlyTargetsRepository: Repository<MonthlyTargets>,
    @InjectRepository(Target)
    private targetsRepository: Repository<Target>,
    @InjectRepository(Usuarios)
    private UsuariossRepository: Repository<Usuarios>, // Inyectar el repositorio de usuarios
    private monthlyTargetsService: MonthlyTargetsService
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // Crear el proyecto
    const project = this.projectsRepository.create(createProjectDto);
    const savedProject = await this.projectsRepository.save(project);

    // Calcular los meses entre las fechas
    const startDate = new Date(createProjectDto.start_date);
    const endDate = new Date(createProjectDto.end_date);
    const months = this.calculateMonths(startDate, endDate);

    // Obtener los user_id basados en los roles y la sucursal
    const userIds = await this.getUserIdsByRolesAndBranch(
      createProjectDto.objectives,
      createProjectDto.branch_id
    );

    for (const objectiveData of createProjectDto.objectives) {      const objective = await this.targetsRepository.findOneBy({
        id: objectiveData.id,
      });
      if (objective) {
        // Crear la relación en objectives_projects
        const objectivesProject = this.objectivesProjectsRepository.create({
          target_id: objective.id,
          project_id: savedProject.id,
          general_target: objectiveData.goal,
        });
        await this.objectivesProjectsRepository.save(objectivesProject);

        // Calcular y guardar los objetivos mensuales
        const totalUsers = userIds.length;
        const totalGoals = objectiveData.goal; // Total de metas generales
        const monthsCount = months.length; // Número de meses

        // Calcular metas por mes
        const baseTargetPerMonth = Math.floor(totalGoals / monthsCount);
        const remainder = totalGoals % monthsCount; // Resto que se debe distribuir

        // Crear un arreglo para almacenar las metas por mes
        const targetsPerMonth = Array(monthsCount).fill(baseTargetPerMonth);

        // Distribuir el resto de las metas
        for (let i = 0; i < remainder; i++) {
          targetsPerMonth[i] += 1; // Asignar 1 meta adicional a los primeros meses
        }

        // Ahora asignar metas a cada usuario
        const userTargets = Array(totalUsers)
          .fill(0)
          .map(() => Array(monthsCount).fill(0));

        for (let monthIndex = 0; monthIndex < monthsCount; monthIndex++) {
          const targetForThisMonth = targetsPerMonth[monthIndex];
          const targetPerUserPerMonth = Math.floor(
            targetForThisMonth / totalUsers
          );
          const extraTargets = targetForThisMonth % totalUsers; // Metas adicionales a distribuir


          for (let userIndex = 0; userIndex < totalUsers; userIndex++) {
            userTargets[userIndex][monthIndex] = targetPerUserPerMonth;
            if (userIndex < extraTargets) {
              userTargets[userIndex][monthIndex] += 1; // Asignar metas adicionales
            }
          }

          for (let userIndex = 0; userIndex < totalUsers; userIndex++) {
            const userId = userIds[userIndex];
            if (userId) {
              const monthlyTarget = this.monthlyTargetsRepository.create({
                user_id: Number(userId), // Convert userId to number
                target_id: objective.id,
                month: months[monthIndex],
                target_planificado: userTargets[userIndex][monthIndex], // Asignar la meta calculada para cada usuario
                project_id: savedProject.id,
                is_closed: false, // Por defecto, no se ha cerrado
              });
              await this.monthlyTargetsRepository.save(monthlyTarget);
            }
          }
        }
      }
    }

    return savedProject;
  }
  private async getUserIdsByRolesAndBranch(
    objectives: any[],
    branchId: number
  ): Promise<number[]> {
    const userIds: number[] = [];
    for (const objective of objectives) {
      // Asegúrate de que objective.roles sea un arreglo de objetos
      for (const role of objective.roles) {
        // Asegúrate de que role.id sea un número o una cadena válida
        const users = await this.UsuariossRepository.find({
          where: {
            roleId: role.id, // Asegúrate de que el campo sea correcto
            branchId: branchId, // Filtrar por sucursal
            is_active: true, // Filtrar por usuarios activos
          },
        });
        userIds.push(...users.map((user) => user.id));
      }
    }
    return Array.from(new Set(userIds)); // Eliminar duplicados
  }

  private calculateMonths(startDate: Date, endDate: Date): string[] {
    const months = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      months.push(
        currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      );
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return months;
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }
}
