import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entities';
import { BranchesService } from './branch.service';
import { BranchesController } from './branch.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
