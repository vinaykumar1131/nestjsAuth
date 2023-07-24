import {
    Body, Controller, Post, HttpCode, HttpStatus, UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.gaurd';
import { AuthService } from './auth.service';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}