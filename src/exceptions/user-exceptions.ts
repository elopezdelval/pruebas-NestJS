import { HttpException, HttpStatus } from '@nestjs/common';
//Excepciones personalizadas

export class UsuarioDuplicadoException extends HttpException {
  constructor() {
    super('El usuario ya existe', HttpStatus.CONFLICT);
  }
}

export class DatosIncompletosException extends HttpException {
  constructor() {
    super('Faltan datos obligatorios', HttpStatus.BAD_REQUEST);
  }
}

export class UsuarioNoEncontradoException extends HttpException {
  constructor() {
    super('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }
}
