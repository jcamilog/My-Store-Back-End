import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';

import { Company, CompanySchema } from './entities/company.entity';
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema
      }
    ]),
    ProductsModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports:[CompanyService]
})
export class CompanyModule {}
