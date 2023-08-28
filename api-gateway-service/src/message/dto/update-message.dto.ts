import { IsNumber, IsString } from 'class-validator';
import { UpdateMessageDto } from '@common/dto/message/';

export class UpdateMessageApiDto implements UpdateMessageDto {
  @IsNumber()
  id: number;

  @IsString()
  message: string;
}
