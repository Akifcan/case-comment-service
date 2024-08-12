import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { AppConfig } from './config/config.interface'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    options: {
      port: Number(process.env.APP_PORT),
    },
    transport: Transport.TCP,
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen()
}
bootstrap()
