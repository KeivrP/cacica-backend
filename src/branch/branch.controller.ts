import { Body, Controller, Post } from '@nestjs/common';
import { BranchesService } from './branch.service';
import { CreateBranchDto } from './dto/branch.dto';
import { Branch } from './entities/branch.entities';


@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  async create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchesService.create(createBranchDto);
  }

  // Métodos adicionales para manejar otras operaciones
}
