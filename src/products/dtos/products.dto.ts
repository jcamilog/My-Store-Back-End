import { 
    IsString, 
    IsUrl, 
    IsNotEmpty, 
    IsPositive,
    IsMongoId,
    IsNumber, 
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly stock: number;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly idCompany: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly idCategory: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly qualification: number;
}
export class UpdateProductDto extends PartialType(CreateProductDto)  {}