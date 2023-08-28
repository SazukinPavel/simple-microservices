import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { Message } from '@common/message';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async get() {
    return { result: true, data: await this.messageRepository.find() };
  }

  async add(message: Message) {
    const newMessage = this.messageRepository.create({ ...message });

    const data = await this.messageRepository.save(newMessage);

    return { result: true, data };
  }

  async update(message: Message) {
    const data = await this.messageRepository.update(message.id, {
      ...message,
    });

    return { result: true, data };
  }

  async delete(id: string) {
    await this.messageRepository.delete(id);

    return { result: true };
  }
}
