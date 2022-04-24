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
import { ApiTags } from '@nestjs/swagger';

import { CreateCompanyDto, UpdateCompanyDto } from './../../dtos/company.dto';
import { CompanyService } from '../../services/company/company.service';
import { MongoIdPipe } from './../../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decoractors/public.decoractor';
import { Roles } from '../../../auth/decoractors/roles.decorator';
import { Role } from '../../../auth/models/roles.model';
import { ProductsService } from '../../../products/services/products/products.service';
import { FilterProductsDto } from '../../../products/dtos/products.dto';

@ApiTags('Company')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService,
        private productsService: ProductsService
    ) {}

    @Public()
    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Public()
    @Get(':companyId')
    getCompany(
        @Param('companyId', MongoIdPipe) idCompany: string
    ) {
        return this.companyService.findOne(idCompany);
    }

    @Public()
    @Post()
    createCompany(
        @Body() payload: CreateCompanyDto
    ) {
        return this.companyService.create(payload);
    }

    @Roles(Role.ADMIN,Role.SPADMIN)
    @Put(':companyId')
    update(
        @Param('companyId', MongoIdPipe) idCOmpany: string,
        @Body() payload: UpdateCompanyDto
    ){
        return this.companyService.update(idCOmpany, payload);
    }

    @Roles(Role.SPADMIN)
    @Delete(':companyId')
    delare(
        @Param('companyId', MongoIdPipe) idCompany: string
    ) {
        return this.companyService.remove(idCompany);
    }

    @Public()
    @Get(':companyId/products')
    productsByCompany(
        @Param('companyId', MongoIdPipe) idCompany: string,
        @Query() params: FilterProductsDto
    ){
        return this.productsService.filterProductsByCompany(idCompany, params);
    }
}
