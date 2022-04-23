import { 
    IsString,
    IsNotEmpty, 
    IsMongoId,
    IsEmail,
    IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}