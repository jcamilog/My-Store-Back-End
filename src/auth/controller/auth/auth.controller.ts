import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(
        @Req() req: Request
    ) {
        const user = req.user as User;
        return this.authService.generateJwt(user);
    }
}
