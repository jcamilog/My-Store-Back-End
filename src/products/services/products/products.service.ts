import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Product } from '../../entities/products.entity';
import { CreateProductDto } from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}
    async findAll() {
        const product: any = await this.productModel.find()
        .populate('idCompany')
        .populate('idCategory')
        .exec();
        if(product.length > 0) {
            return {
                message: 'Available products',
                moreData: true,
                result: product
            }
        } else {
            return {
                message: 'You have no products available',
                moreData: false,
                result: product
            }
        }
    }

    async findOne(id: string) {
        const product = await this.productModel.findById(id).exec()
        if(!product) {
            throw new NotFoundException(`Product ${id} not found `)
        }
        return product;
    }

    create(payload: CreateProductDto) {
        const newProduct =  new this.productModel(payload)
        console.log(newProduct);
        return {
            message: 'The product was created successfully',
            result: newProduct.save()
        };
    }

    update(id: string, changes: any) {
        const product = this.productModel
        .findByIdAndUpdate(id, { $set: changes}, {new: true})
        .exec();
        if(!product) {
            throw new NotFoundException(`Product ${id} not found `)
        }
        return product;
    }

    remove(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
    async topProducts() {
        const products: any = await this.findAll();
        let top: CreateProductDto[] = [];
        products.result.map(item => {
            if(item.qualification > 4) {
                top.push(item)
            }
        })
        return top
    }
}
