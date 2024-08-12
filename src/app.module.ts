import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbConfig } from './config/config.interface'
import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'
import { ProductPricing } from './entities/product-pricing.entity'
import { Comment } from './entities/comment.entity'
import { User } from './entities/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.getOrThrow<DbConfig>('database')
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          synchronize: true,
          autoLoadEntities: true,
        }
      },
    }),
    TypeOrmModule.forFeature([Product, Category, Comment, ProductPricing, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
