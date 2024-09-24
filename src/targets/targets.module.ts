import { Module } from "@nestjs/common";
import { Target } from "./entities/targets.entities";
import { TargetsController } from "./targets.controller";
import { TargetsService } from "./targets.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Target])],
  providers: [TargetsService],
  controllers: [TargetsController],
})
export class TargetModule {}
