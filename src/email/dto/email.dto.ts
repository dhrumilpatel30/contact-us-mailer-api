import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class EmailDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mobile: string;

    @IsString()
    additional?: string;
} 