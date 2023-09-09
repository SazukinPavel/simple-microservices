import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { AddMessageDto, UpdateMessageDto } from '@common/dto/message';
import { ServiceResponse } from '@common/base';
import { User } from '@common/user';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async get(user: User): Promise<ServiceResponse<MessageEntity[]>> {
    return {
      result: true,
      data: await this.messageRepository.find({ where: { ownerId: user.id } }),
    };
  }

  async add(
    message: AddMessageDto,
    user: User,
  ): Promise<ServiceResponse<MessageEntity>> {
    const newMessage = this.messageRepository.create({ ...message });

    const data = await this.messageRepository.save({
      ...newMessage,
      ownerId: user.id,
    });

    return { result: true, data };
  }

  async update(
    dto: UpdateMessageDto,
    user: User,
  ): Promise<ServiceResponse<MessageEntity>> {
    const message = await this.messageRepository.findOneBy({ id: dto.id });

    if (user.id !== message.ownerId) {
      throw new RpcException('You dont have rights edit this messsage');
    }

    await this.messageRepository.update(dto.id, {
      ...dto,
    });

    const data = await this.messageRepository.findOneBy({ id: dto.id });

    return { result: true, data };
  }

  async delete(id: string, user: User): Promise<ServiceResponse<any>> {
    const message = await this.messageRepository.findOneBy({ id: +id });

    if (user.id !== message.ownerId) {
      throw new RpcException('You dont have rights delete this message');
    }

    await this.messageRepository.delete(id);

    return { result: true, data: {} };
  }
}
