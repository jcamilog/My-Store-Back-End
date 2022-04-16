import { 
    IsString, 
    IsUrl, 
    IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}