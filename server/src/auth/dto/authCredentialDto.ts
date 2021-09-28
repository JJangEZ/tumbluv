import { IsInt, isString, IsString, Matches, MaxLength, MinLength } from "class-validator";
import UserType from "../userTypeEnum";

export class AuthCredentialDto{
    @IsString()
    nickname: string;

    @IsString()
    email: string;

    @IsInt()
    type: UserType;

    @IsString()
    password: string;    
}