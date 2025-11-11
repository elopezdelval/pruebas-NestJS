import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from "./users.service";
import { ValidateUserPipe } from 'src/pipes/validate-user.pipe';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('usuarios')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('registro')
    @UsePipes(ValidateUserPipe)
    
    async register(@Body() body: { nombre: string; pass: string }) {
        const user = await this.userService.create(body.nombre, body.pass);
        return { message: 'Usuario registrado correctamente', user };
    }

    @Get('lista')
    async getUsers() {
        return await this.userService.findAll();
    }
}