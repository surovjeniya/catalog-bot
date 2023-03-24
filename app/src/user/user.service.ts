import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { UserEntity } from './user.entity';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    findOptions: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: findOptions });
    return user;
  }

  async find(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async delete(id: number): Promise<DeleteResult> {
    const user = await this.findOne({ id });
    if (user && user.id) {
      return await this.userRepository.delete(id);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async update(
    id: number,
    data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UpdateResult> {
    const user = await this.findOne({ id });
    if (user && user.id) {
      return await this.userRepository.update(id, { ...data });
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async create(
    telegramUser: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity> {
    const user = this.userRepository.create({ ...telegramUser });
    return await this.userRepository.save(user);
  }
}
