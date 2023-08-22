import { IsNumber, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsNumber()
  id: number;

  @IsString()
  message: string;
}
