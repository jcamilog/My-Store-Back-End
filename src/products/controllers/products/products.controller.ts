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
import { CreateProductDto } from 'src/products/dtos/products.dto';

import { ProductsService } from './../../services/products/products.service';
import { MongoIdPipe } from './../../../common/mongo-id/mongo-id.pipe';

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ) {}

    @Get()
    getProducts() {
        return this.productsService.findAll()
    }
    @Get('top')
    topProducts() {
        return this.productsService.topProducts();
    }

    @Get(':productId')
    getProduct(
        @Param('productId', MongoIdPipe) idProduct: string
    ) {
        return this.productsService.findOne(idProduct)
    }

    @Post()
    createProduct(
        @Body() payload: CreateProductDto
    ) {
        return this.productsService.create(payload)
    }

    @Put(':productId')
    update(
        @Param('productId', MongoIdPipe) productId: string,
        @Body() payload: any
    ) {
        return this.productsService.update(productId, payload)
    }

    @Delete(':productId')
    delete(
        @Param('productId', MongoIdPipe) productId: string
    ) {
        return this.productsService.remove(productId)
    }
}