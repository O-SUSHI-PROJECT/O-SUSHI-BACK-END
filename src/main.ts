import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const API_KEY = '123456';


const b = "v";

if(b ==0){
console.log("testando sonar");
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
