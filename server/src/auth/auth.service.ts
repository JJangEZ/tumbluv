import { Injectable, UnauthorizedException, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/authCredentialDto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void>{
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(request, response, authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const {email, password, nickname, type} = authCredentialDto;
        const user = await this.userRepository.findOne({email})

        if (user && (await bcrypt.compare(password, user.password))){
            // 유저 토큰 생성 (secret + payload)
            const payload = {email, nickname, type}
            const accessToken = await this.jwtService.sign(payload, {expiresIn: '1h'});
            const refreshToken = await this.jwtService.sign(payload, {expiresIn: '14d'})
            
            response.cookie('accessToken', accessToken)
            response.cookie('refreshToken', refreshToken)
            response.send({message: 'successfully sign in'})
            return;
        } else {
            throw new UnauthorizedException('logIn failed')
        }
    }

    async googleSignin(request, response){
        // 데베에 있는 유저면 로그인만 진행, 없으면 데베에 추가
        // 액세스, 리프레시 토큰 만들어서 추가
        console.log('request.user', request.user)

        
    }
}
