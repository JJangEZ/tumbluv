import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            //토큰 만들때 사용한 시크릿 키
            secretOrKey: 'Secret1234',

            // 리퀘스트의 토큰이 어떻게 오는지
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload){
        const {email} = payload;
        const user: User = await this.userRepository.findOne({email});

        if (!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}