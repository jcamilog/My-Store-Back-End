import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../../users/services/users/users.service';
import { User } from '../../../users/entities/user.entity';
import { PayloadToken } from '../../models/token.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser( email: string, password: string ) {
        const user = await this.usersService.findByEmail(email); 
        if(user) {
            if(user.email === email && user.password === password) {
                const {password, ...rta} = user.toJSON();
                return rta;
            }
        }
        return null
    }
    generateJwt(user: User) {
        const payload: PayloadToken = {
            role: user.rol,
            sub: user._id,
            company: user.idCompany
        }
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }
}
