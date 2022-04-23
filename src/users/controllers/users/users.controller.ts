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
    Headers
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../../dtos/user.dto';
import { UsersService } from '../../services/users/users.service';
import { MongoIdPipe } from './../../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decoractors/public.decoractor';
import { Roles } from 'src/auth/decoractors/roles.decorator';
import { Role } from '../../../auth/models/roles.model';

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Roles(Role.SPADMIN)
    @Get()
    getUsers(
    ){
        return this.usersService.findAll()
    }

    @Public()
    @Post()
    createUser(
        @Body() payload: CreateUserDto
    ){
        return this.usersService.create(payload);
    }
    
    @Roles(Role.ADMIN, Role.SPADMIN)
    @Get(':companyId/byCompany')
    usersByCompany(
        @Param('idCompany', MongoIdPipe) idCompany: string
    ){
        return this.usersService.usersByCompany(idCompany);
    }

    @Roles(Role.ADMIN)
    @Put(':idUser')
    update(
        @Param('idUser', MongoIdPipe) idUser: string,
        @Body() payload: any
    ) {
        return this.usersService.updateUser(idUser, payload);
    }

    @Roles(Role.ADMIN, Role.SPADMIN)
    @Delete(':idUser')
    removeUser(
        @Param('idUser', MongoIdPipe) id: string
    ){
        return this.usersService.removeUser(id);
    }
}
