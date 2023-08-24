import { IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(254)
  password: string;
}
