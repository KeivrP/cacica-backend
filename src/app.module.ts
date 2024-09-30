import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { BranchesModule } from './branch/branch.module';
import { TargetModule } from './targets/targets.module';
import { ProjectsModule } from './projects/projects.module';
import { ObjectivesProjectsModule } from './objectives_projects/objectives-projects.module';
import { MonthlyTargetsModule } from './monthly_targets/monthly-targets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-jolly-wildflower-a4d8f4m7-pooler.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'default',
      password: '4IEJ3QZsumXY',
      database: 'verceldb',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true, // Assuming SSL is required
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    AuthModule,
    UsuariosModule,
    RolesModule,
    BranchesModule,
    TargetModule,
    ProjectsModule,
    ObjectivesProjectsModule,
    MonthlyTargetsModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
