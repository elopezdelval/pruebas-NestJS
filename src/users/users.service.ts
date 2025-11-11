import { Injectable } from "@nestjs/common";
import { Usuario } from './users.structure';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    UsuarioDuplicadoException,
    DatosIncompletosException,
    UsuarioNoEncontradoException,
} from '../exceptions/user-exceptions';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
    ) { }

    async create(nombre: string, pass: string): Promise<Usuario> {

        // Validar datos obligatorios
        if (!nombre || !pass) {
            throw new DatosIncompletosException();
        }

        // Verificar duplicado
        const existingUser = await this.userRepository.findOne({ where: { nombre } });
        if (existingUser) {
            throw new UsuarioDuplicadoException();
        }
        const user = this.userRepository.create({ nombre, pass }); // crea un objeto
        return await this.userRepository.save(user); // guarda en la base de datos
    }

    async findAll(): Promise<Usuario[]> {
        const users = await this.userRepository.find(); // devuelve todos los registros
        if (!users.length) {
            throw new UsuarioNoEncontradoException();
        }
        return users;
    }
}