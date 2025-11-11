import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: any) {
    const {nombre,pass} = value;
    if (!nombre || !pass){
      throw new BadRequestException('faltan datos');
    }
    if (nombre.length < 3){
      throw new BadRequestException('el nombre es demasiado corto');
    }
    if (pass.length < 8){
      throw new BadRequestException('contraseña demasiado corta');
    }
    return value;
  }
}
