import { Body, Controller, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentialDto';

@Controller('auth/user')
export class AuthController {
    constructor(private authService: AuthService){}

    // 회원가입
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void>{
        return this.authService.signUp(authCredentialDto)
    }

    // 로그인
    @Post('/signin')
    signIn(@Req() request, @Res({passthrough: true}) response, @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(request, response, AuthCredentialDto)
    }

    // @Post('/authTest')
    // @UseGuards(AuthGuard())
    // authTest(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): void {
    //     console.log(authCredentialsDto)
    //     return
    // }
}
