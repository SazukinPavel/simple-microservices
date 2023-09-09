import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '@common/message';

@Entity()
export class MessageEntity implements Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  ownerId: number;

  @CreateDateColumn()
  ts: Date;
}
