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
            response.send('successfully sign in')
            return;
        } else {
            throw new UnauthorizedException('logIn failed')
        }
    }
}
