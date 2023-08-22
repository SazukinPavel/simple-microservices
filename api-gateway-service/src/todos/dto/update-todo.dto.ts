import { IsNumber, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsNumber()
  id: number;

  @IsString()
  message: string;
}
