import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import config from './../../config';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class jwtStrategy extends  PassportStrategy(Strategy, 'jwt') { 
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtSecret
        })
    }
    validate(payload: PayloadToken) {
        return payload;
    }
}