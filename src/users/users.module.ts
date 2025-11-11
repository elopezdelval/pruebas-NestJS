import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { Usuario } from './users.structure';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // 👈 habilita el repositorio para esta entidad
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
