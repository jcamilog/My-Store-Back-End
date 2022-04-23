import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../../users/services/users/users.service';
import { CompanyService } from '../../../company/services/company/company.service';
import { PayloadToken } from '../../models/token.model';
import { User } from '../../../users/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private companyService: CompanyService
    ){}

    async validateUser( email: string, password: string ) {
        const user: any = await this.usersService.findByEmail(email);
        if(user) {
            if(user.rol !== 'superAdmin') {
                const company = await this.companyService.findOne(user.idCompany);
                if(!company.isActive) {
                    throw new NotFoundException(`The company is inactive `);
                }
            }
            if(user.email === email && user.password === password) {
                const {password, ...rta} = user.toJSON();
                return rta;
            }
        }
        return null
    }
    generateJwt(user: any) {
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
