import { 
    IsString,
    IsNotEmpty, 
    IsMongoId,
    IsEmail,
    IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    readonly idCompany: string;

    @IsString()
    @IsNotEmpty()
    readonly rol: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}