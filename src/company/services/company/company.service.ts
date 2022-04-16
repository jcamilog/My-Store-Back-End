import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Company } from '../../entities/company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dtos/company.dto';
import { ProductsService } from './../../../products/services/products/products.service';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>,
        private productsService: ProductsService
    ) {}

    async findAll() {
        const company = await this.companyModel.find().exec();
        return company;
    }

    async findOne(id: string) {
        const company = await this.companyModel.findById(id).exec();
        if(!company) {
            throw new NotFoundException(`Compnay ${id} not found `);
        }
        return company;
    }

    create(payload: CreateCompanyDto) {
        const newCompany = new this.companyModel(payload);
        return newCompany.save();
        // if(!newCompany) {
        //     throw new NotFoundException(`the product could not be created`)
        // }
        // return {
        //     message: 'The company was created successfully',
        //     result: newCompany.save()
        // };
    }

    update(id: string, changes: UpdateCompanyDto) {
        const company = this.companyModel
        .findByIdAndUpdate(id, {$set: changes}, {new: true})
        .exec();
        if(!company) {
            throw new NotFoundException(`Compnay ${id} not found `)
        }
        return company
    }
    
    remove(id: string) {
        return this.companyModel.findByIdAndDelete(id);
    }
    async productsForCompany(id: string) {
        const products: any = await this.productsService.findAll();
        const productsForCompany = products.result.filter(item => id === item.idCompany);
        return {
            message: 'productos',
            result: productsForCompany
        }
    }
}
