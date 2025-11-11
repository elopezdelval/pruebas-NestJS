import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // Captura cualquier excepción que ocurra
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Si es un HttpException (controlada), saca su status y mensaje
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Error interno del servidor';

        // Devuelve una respuesta limpia y uniforme
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}
