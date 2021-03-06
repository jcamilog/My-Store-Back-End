import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}
    async findAll() {
        const user = await this.userModel.find().exec()
        if(user.length > 0) {
            return {
                message: 'Available users',
                moreData: true,
                result: user
            }
        } else {
            return {
                message: 'You have no users available',
                moreData: false,
                result: user
            }
        }
    }
    async create(payload: CreateUserDto) {
        const userByCompany = await this.usersByCompany(payload.idCompany);
        if(userByCompany.result.length >= 5) {
            throw new NotFoundException(`You have no more licenses available`)
        }
        const dataUser = {
            ...payload,
            rol: 'admin'
        }
        const user = new this.userModel(dataUser);
        const model = await user.save();
        const {password, ...rta} = model.toJSON() 
        return {
            message: 'User created successfully',
            response: rta
        }
    }
    async usersByCompany(idCompany: string) {
        const userCompany = await this.userModel.find({idCompany});
        return {
            message: 'users by company',
            result: userCompany
        } 
    }
    async findByEmail(email: string) {
        const user = await this.userModel.findOne({email}).exec();
        return user;
    }
    updateUser(id: string, changes: any) {
        const user = this.userModel
        .findByIdAndUpdate(id, {$set: changes }, { new: true })
        .exec();
        if(!user) {
            throw new NotFoundException(`User ${id} not found `)
        }
        return {
            message: 'User update',
            user
        };
    }
    removeUser( id: string ) {
        const user = this.userModel.findByIdAndDelete(id);
        return {
            message: 'user removed',
            response : user
        }
    }
}
