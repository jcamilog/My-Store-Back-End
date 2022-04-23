import { 
    IsString, 
    IsUrl,
    IsNotEmpty,
    IsOptional, 
    IsBoolean
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly nit: string;

    @IsOptional()
    @IsString()
    readonly direction: string;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    readonly country: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly internationalDeliveries: boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly isActive: boolean;
}
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}