import { 
    Controller,
    Get, 
    Param, 
    Post, 
    Query, 
    Body, 
    Put, 
    Delete,
    UseGuards,  
} from '@nestjs/common';

import { CreateCompanyDto, UpdateCompanyDto } from './../../dtos/company.dto';
import { CompanyService } from '../../services/company/company.service';
import { MongoIdPipe } from './../../../common/mongo-id/mongo-id.pipe';

@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService
    ) {}

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Get(':companyId')
    getCompany(
        @Param('companyId', MongoIdPipe) idCompany: string
    ) {
        return this.companyService.findOne(idCompany);
    }

    @Post()
    createCompany(
        @Body() payload: CreateCompanyDto
    ) {
        return this.companyService.create(payload);
    }

    @Put(':companyId')
    update(
        @Param('companyId', MongoIdPipe) idCOmpany: string,
        @Body() payload: UpdateCompanyDto
    ){
        return this.companyService.update(idCOmpany, payload);
    }

    @Delete(':companyId')
    delare(
        @Param('companyId', MongoIdPipe) idCompany: string
    ) {
        return this.companyService.remove(idCompany);
    }

    @Get(':companyId/products')
    productsForCompany(
        @Param('companyId', MongoIdPipe) idCompany: string
    ){
        return this.companyService.productsForCompany(idCompany);
    }
}
