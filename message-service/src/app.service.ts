import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { Message } from '@common/message';
import { ServiceResponse } from '@common/base';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async get(): Promise<ServiceResponse<MessageEntity[]>> {
    return { result: true, data: await this.messageRepository.find() };
  }

  async add(message: Message): Promise<ServiceResponse<MessageEntity>> {
    const newMessage = this.messageRepository.create({ ...message });

    const data = await this.messageRepository.save(newMessage);

    return { result: true, data };
  }

  async update(message: Message): Promise<ServiceResponse<MessageEntity>> {
    await this.messageRepository.update(message.id, {
      ...message,
    });

    const data = await this.messageRepository.findOneBy({ id: message.id });

    return { result: true, data };
  }

  async delete(id: string): Promise<ServiceResponse<any>> {
    await this.messageRepository.delete(id);

    return { result: true, data: {} };
  }
}
