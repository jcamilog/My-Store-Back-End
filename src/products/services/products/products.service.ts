import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Product } from '../../entities/products.entity';
import { CreateProductDto, FilterProductsDto } from '../../dtos/products.dto';
import { ProductModel } from '../../models/product.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}
    async findAll(params?: FilterProductsDto) {
        const {limit, offset, name} = params;
        const filters: FilterQuery<Product> = {};
        if(name !== '') {
            filters.name = name
        }
        const product: ProductModel[] = await this.productModel.find(filters)
        .populate('idCompany')
        .populate('idCategory')
        .skip(offset)
        .limit(limit)
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
        const product: ProductModel = await this.productModel.findById(id).exec()
        if(!product) {
            throw new NotFoundException(`Product ${id} not found `)
        }
        return product;
    }

    async create(payload: CreateProductDto) {
        const newProduct =  new this.productModel(payload)
        const rta =  await newProduct.save();
        return {
            message: 'The product was created successfully',
            result: rta
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
    };

    remove(id: string) {
        return this.productModel.findByIdAndDelete(id);
    };
    async topProducts() {
        const products: any = await this.findAll();
        let top: CreateProductDto[] = [];
        products.result.map(item => {
            if(item.qualification > 4) {
                top.push(item)
            }
        })
        return top;
    };
    async filterProductsByCompany(idCompany: string, params: FilterProductsDto) {
        const {limit, offset, name} = params;
        const filters: FilterQuery<Product> = {};
        filters.idCompany = idCompany;
        if(name !== '') {
            filters.name = name
        }
        const products = await this.productModel.find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
        if(products.length > 0) {
            return {
                message: 'Available Category',
                moreData: true,
                result: products
            }
        } else {
            return {
                message: 'You have no products in this category available',
                moreData: false,
                result: products
            }
        }
    };
    async filterProductsByCategory(idCategory: string, params: FilterProductsDto) {
        const {limit, offset, name} = params;
        const filters: FilterQuery<Product> = {};
        filters.idCategory = idCategory;
        if(name !== '') {
            filters.name = name
        }
        const products = await this.productModel.find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
        if(products.length > 0) {
            return {
                message: 'Available Category',
                moreData: true,
                result: products
            }
        } else {
            return {
                message: 'You have no products in this category available',
                moreData: false,
                result: products
            }
        }
    }
}
