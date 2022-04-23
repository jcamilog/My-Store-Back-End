import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Category } from './../../entities/category.entity';
import { CreateCategoryDto } from './../../dtos/category.dto';
import { ProductsService } from './../../services/products/products.service';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) {}
    async findAll() {
        const category = await this.categoryModel.find().exec();
        
        if(category.length > 0) {
            return {
                message: 'Available Category',
                moreData: true,
                result: category
            }
        } else {
            return {
                message: 'You have no categories available',
                moreData: false,
                result: category
            }
        }
    }
    async findOne(id: string) {
        const category = await this.categoryModel.findById(id).exec();
        if(!category) {
            throw new NotFoundException(`Product ${id} not found `)
        }
        return category;
    }
    create( payload: CreateCategoryDto ) {
        const category = new this.categoryModel(payload);
        if(!category) {
            throw new NotFoundException(`the product could not be created`)
        }
        return category.save()
    }
    update(id: string, changes: any) {
        const category = this.categoryModel
        .findByIdAndUpdate(id, {$set: changes}, {new: true})
        .exec();
        if(!category) {
            throw new NotFoundException(`Product ${id} not found `)
        }
        return {
            message: 'Update category',
            result: category
        };
    }
    remove(id: string) {
        const category = this.categoryModel.findByIdAndDelete(id);
        
        if(!category) {
            throw new NotFoundException(`Product ${id} not found `)
        }
        return category;
    }
}
