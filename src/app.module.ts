import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { CompanyModule } from './company/company.module';
import { DatabaseModule } from './database/database.module';

import config from './config';
import { enviroments } from './enviroments';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load:[config],
    isGlobal: true,
    validationSchema: Joi.object({ 
      API_KEY: Joi.number().required(),
      DATABASE_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
    }),
  }),ProductsModule, CompanyModule, DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
