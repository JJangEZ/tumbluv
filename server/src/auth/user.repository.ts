import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/authCredentialDto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {nickname, password, email, type} = authCredentialDto;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({email, type, nickname, password: hashedPassword})

        try {
            await user.save();
        } catch (error){
            if (error.code === '23505'){ // username 중복
                throw new ConflictException('email is already existed');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}