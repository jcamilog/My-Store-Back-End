import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../services/auth/auth.service';

import { Strategy } from 'passport-local';

@Injectable()
export class localStrategy extends  PassportStrategy(Strategy, 'local') {
    constructor(
        private authService: AuthService
    ) {
        super({
            usernameField: 'email'
        });
    }
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException("not allow user");
        }
        return user;
    }
}