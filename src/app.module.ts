import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/midd.log';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './users/users.structure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'usuarios.sqlite', 
      entities: [Usuario],
      synchronize: true,
    }),
    UserModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('usuarios');
  }
}
