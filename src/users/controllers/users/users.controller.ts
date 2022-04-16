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

import { CreateUserDto } from '../../dtos/user.dto';
import { UsersService } from '../../services/users/users.service';
import { MongoIdPipe } from './../../../common/mongo-id/mongo-id.pipe';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}
    
    @Get()
    getUsers(){
        return this.usersService.findAll()
    }

    @Post()
    createUser(
        @Body() payload: CreateUserDto
    ){
        return this.usersService.create(payload);
    }

    @Get('by')
    usersByCompany(
        @Query('company', MongoIdPipe) idCompany: string
    ){
        return this.usersService.usersByCompany(idCompany)
    }
}
