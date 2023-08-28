import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from './services/crypto.service';
import { JwtService } from './services/jwt.service';
import { RpcException } from '@nestjs/microservices';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from '@common/dto/auth';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, username }: LoginDto) {
    const userWithSameName = await this.findByUserName(username);
    if (userWithSameName) {
      throw new RpcException('User with same name already exist');
    }

    const encryptPassword = await this.cryptoService.crypt(password);

    const user = this.usersRepository.create({
      password: encryptPassword,
      username,
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      result: true,
      data: { token: this.getToken(savedUser), user: savedUser },
    };
  }

  async login({ password, username }: LoginDto) {
    const userWithSameName = await this.findByUserName(username);
    if (!userWithSameName) {
      throw new RpcException('User with same name doesnt exist');
    }

    const isPasswordCorrect = await this.cryptoService.compare(
      password,
      userWithSameName.password,
    );
    if (!isPasswordCorrect) {
      throw new RpcException('Wrong password');
    }

    return {
      result: true,
      data: { token: this.getToken(userWithSameName), user: userWithSameName },
    };
  }

  async me(token: string) {
    const { id } = this.jwtService.verify(token) as any;

    const realUser = await this.usersRepository.findOneBy({ id: +id });

    return {
      result: true,
      data: { token: this.getToken(realUser), user: realUser },
    };
  }

  private findByUserName(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  private getToken(user: UserEntity) {
    return this.jwtService.sign({ id: user.id });
  }
}
