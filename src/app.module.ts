import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import HealthController from './core/health/health.controller';
import { ConfigModule } from '@nestjs/config';
import requestContext from './core/middlewares/context.middleware';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule],
  controllers: [HealthController],
  providers: [AuthService],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(requestContext.middleware, AuthMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'metrics', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
