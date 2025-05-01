import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  senderEmail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  // @IsNotEmpty()
  // @Matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
  //   message: 'Please provide a valid phone number',
  // })
  mobile: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  additional?: string;
}
