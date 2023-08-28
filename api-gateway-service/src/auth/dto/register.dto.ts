import { IsString, MaxLength, MinLength } from 'class-validator';
import { RegisterDto } from '@common/dto/auth/';

export class RegisterApiDto implements RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(254)
  password: string;
}
