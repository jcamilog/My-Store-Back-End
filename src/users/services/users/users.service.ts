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
        const users: any = await this.findAll();
        const userForCompany = users.result.filter(item => payload.idCompany === item.idCompany)
        if(userForCompany.length >= 5) {
            throw new NotFoundException(`You have no more licenses available`)
        }
        const user = new this.userModel(payload);
        const model = await user.save();
        const {password, ...rta} = model.toJSON() 
        return {
            message: 'User created successfully',
            response: rta
        }
    }
    async usersByCompany(id: string) {
        const users: any = await this.findAll();
        const userCompany = users.result.filter(item => id === item.idCompany);
        if(userCompany.lenght < 0){
            return {
                message: 'Not users by company',
                result: userCompany
            }
        }
        return {
            message: 'users by company',
            result: userCompany
        } 
    }
    async findByEmail(email: string) {
        const user = await this.userModel.findOne({email}).exec();
        return user;
    }
    removeUser( id: string ) {
        const user = this.userModel.findByIdAndDelete(id);
        return {
            message: 'user removed',
            response : user
        }
    }
}
