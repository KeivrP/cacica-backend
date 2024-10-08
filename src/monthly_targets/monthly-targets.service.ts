// src/monthly_targets/monthly-targets.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMonthlyTargetsDto } from "./dto/create-monthly-targets.dto";
import { MonthlyTargets } from "./entities/monthly-targets.entity";
import { ObjectivesProjects } from "src/objectives_projects/entities/objectives-projects.entity";

@Injectable()
export class MonthlyTargetsService {
  constructor(
    @InjectRepository(MonthlyTargets)
    private monthlyTargetsRepository: Repository<MonthlyTargets>,
    @InjectRepository(ObjectivesProjects)
    private objectivesProjectsRepository: Repository<ObjectivesProjects>
  ) {}

  async create(
    createMonthlyTargetsDto: CreateMonthlyTargetsDto
  ): Promise<MonthlyTargets> {
    const monthlyTarget = this.monthlyTargetsRepository.create(
      createMonthlyTargetsDto
    );
    return this.monthlyTargetsRepository.save(monthlyTarget);
  }

  async findAll(): Promise<MonthlyTargets[]> {
    return this.monthlyTargetsRepository.find({
      relations: ["objective", "project", "users"],
    });
  }

async closedMonthlyTargets(projectId: number, month: string): Promise<any> {
    const isMonthClosed = await this.monthlyTargetsRepository.findOne({
        where: { project_id: projectId, month, is_closed: true },
    });

    if (isMonthClosed) {
        throw new Error(`El mes ${month} ya está cerrado para el proyecto con ID ${projectId}. Por favor, elija otro mes o proyecto.`);
    }

    const monthlyTargets = await this.monthlyTargetsRepository.find({
        where: { project_id: projectId, month },
    });

    const targetsGroupedByTargetId = monthlyTargets.reduce((acc, target) => {
        if (!acc[target.target_id]) {
            acc[target.target_id] = [];
        }
        acc[target.target_id].push(target);
        return acc;
    }, {});

    for (const targetId in targetsGroupedByTargetId) {
        const targets = targetsGroupedByTargetId[targetId];
        const allTargetsForTargetId = await this.monthlyTargetsRepository.find({
            where: { target_id: Number(targetId), project_id: projectId },
        });

        const totalReported = allTargetsForTargetId.reduce(
            (sum, target) => sum + Number(target.target_reportado),
            0
        );
        const project = await this.objectivesProjectsRepository.findOne({
            where: { project_id: projectId, target_id: Number(targetId) },
        });

        if (!project) {
            throw new Error(`Project not found for target_id ${targetId}`);
        }

        const remainingTarget = project.general_target - totalReported;

        const openMonths = await this.monthlyTargetsRepository
            .createQueryBuilder("monthlyTargets")
            .select("DISTINCT monthlyTargets.month")
            .where("monthlyTargets.project_id = :projectId", { projectId })
            .andWhere("monthlyTargets.is_closed = false")
            .andWhere("monthlyTargets.month != :month", { month })
            .getRawMany();

        const months = openMonths.map((target) => target.month);
        const monthsCount = months.length;
        const baseTargetPerMonth = Math.floor(remainingTarget / monthsCount);
        const remainder = remainingTarget % monthsCount;

        const targetsPerMonth = Array(monthsCount).fill(baseTargetPerMonth);
        for (let i = 0; i < remainder; i++) {
            targetsPerMonth[i] += 1;
        }

        const userIds = targets.map((target) => target.user_id);
        const totalUsers = userIds.length;
        const userTargets = Array(totalUsers)
            .fill(0)
            .map(() => Array(monthsCount).fill(0));

        for (let monthIndex = 0; monthIndex < monthsCount; monthIndex++) {
            const targetForThisMonth = targetsPerMonth[monthIndex];
            const targetPerUserPerMonth = Math.floor(
            targetForThisMonth / totalUsers
            );
            const extraTargets = targetForThisMonth % totalUsers;

            for (let userIndex = 0; userIndex < totalUsers; userIndex++) {
            userTargets[userIndex][monthIndex] = Math.max(targetPerUserPerMonth, 0);
            if (userIndex < extraTargets) {
                userTargets[userIndex][monthIndex] = Math.max(userTargets[userIndex][monthIndex] + 1, 0);
            }
            const userId = userIds[userIndex];
                if (userId) {
                    const existingMonthlyTarget =
                        await this.monthlyTargetsRepository.findOne({
                            where: {
                                user_id: Number(userId),
                                target_id: Number(targetId),
                                month: months[monthIndex],
                                project_id: projectId,
                            },
                        });

                    if (existingMonthlyTarget) {
                        existingMonthlyTarget.target_planificado =
                            Math.max(userTargets[userIndex][monthIndex], 0);
                        await this.monthlyTargetsRepository.save(existingMonthlyTarget);
                    } else {
                        throw new Error(
                            `Monthly target not found for user_id ${userId}, target_id ${targetId}, month ${months[monthIndex]}`
                        );
                    }
                }
            }
        }
    }

    await this.monthlyTargetsRepository
        .createQueryBuilder()
        .update(MonthlyTargets)
        .set({ is_closed: true })
        .where("project_id = :projectId", { projectId })
        .andWhere("month = :month", { month })
        .execute();

    return targetsGroupedByTargetId;
}

  async updateTargetReportado(
    id: number,
    targetReportado: number
  ): Promise<MonthlyTargets> {
    const monthlyTarget = await this.monthlyTargetsRepository.findOne({
      where: { id },
    });
    if (!monthlyTarget) {
      throw new Error("Monthly target not found");
    }
    monthlyTarget.target_reportado = targetReportado;
    return this.monthlyTargetsRepository.save(monthlyTarget);
  }
}
