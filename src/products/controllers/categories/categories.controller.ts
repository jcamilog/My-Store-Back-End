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

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService
    ) {}

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':categoryId/products')
    productsForCategory(
        @Param('categoryId', MongoIdPipe) idCategory: string
    ) {
        return this.categoriesService.productForCategory(idCategory);
    }

    @Get(':categoryId')
    findOne(
        @Param('categoryId', MongoIdPipe) idCategory: string
    ) {
        return this.categoriesService.findOne(idCategory);
    }

    @Post()
    create(
        @Body() payload: CreateCategoryDto
    ) {
        return this.categoriesService.create(payload);
    }

    @Put(':categoryId')
    update(
        @Param('categoryId', MongoIdPipe) idCategory: string,
        @Body() changes: any
    ) {
        return this.categoriesService.update(idCategory, changes);
    }

    @Delete(':categoryId')
    remove(
        @Param('categoryId', MongoIdPipe) idCategory: string
    ) {
        return this.categoriesService.remove(idCategory)
    }

}
