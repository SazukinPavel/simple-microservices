import { IsString } from 'class-validator';
import { AddMessageDto } from '@common/dto/message/';

export class AddMessageApiDto implements AddMessageDto {
  @IsString()
  message: string;
}
