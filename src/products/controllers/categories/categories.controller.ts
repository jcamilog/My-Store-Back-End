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

import { CreateCategoryDto } from './../../dtos/category.dto';
import { CategoriesService } from '../../services/categories/categories.service';
import { MongoIdPipe } from './../../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ProductsService } from '../../services/products/products.service';
import { Public } from '../../../auth/decoractors/public.decoractor';
import { Roles } from '../../../auth/decoractors/roles.decorator';
import { Role } from '../../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService,
        private productsService: ProductsService
    ) {}

    @Public()
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Public()
    @Get(':categoryId/products')
    productsForCategory(
        @Param('categoryId', MongoIdPipe) idCategory: string
    ) {
        return this.productsService.filterProductsByCategory(idCategory);
    }

    @Public()
    @Get(':categoryId')
    findOne(
        @Param('categoryId', MongoIdPipe) idCategory: string
    ) {
        return this.categoriesService.findOne(idCategory);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(
        @Body() payload: CreateCategoryDto
    ) {
        return this.categoriesService.create(payload);
    }

    @Roles(Role.ADMIN)
    @Put(':categoryId')
    update(
        @Param('categoryId', MongoIdPipe) idCategory: string,
        @Body() changes: any
    ) {
        return this.categoriesService.update(idCategory, changes);
    }

    @Roles(Role.ADMIN)
    @Delete(':categoryId')
    remove(
        @Param('categoryId', MongoIdPipe) idCategory: string
    ) {
        return this.categoriesService.remove(idCategory)
    }

}
