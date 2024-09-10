import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import * as dotenv from 'dotenv';
dotenv.config();

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
      ssl: false, // Assuming SSL is required
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    RolesModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


