import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commands } from 'src/enum/commands.enum';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LoggerEntity } from './logger.entity';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(LoggerEntity)
    private readonly loggerRepository: Repository<LoggerEntity>,
  ) {}

  async create(dto: CreateLogDto): Promise<LoggerEntity> {
    const log = this.loggerRepository.create({ ...dto });
    return await this.loggerRepository.save(log);
  }

  async update(id: number, dto: UpdateLogDto) {
    const log = await this.loggerRepository.findOne({ where: { id } });
    if (log && log.telegram_id) {
      return await this.loggerRepository.update(id, { ...dto });
    }
  }

  async updateLog(updateData: {
    action: Commands;
    day: string;
    telegram_id: number;
    username: string;
  }) {
    const { action, day, telegram_id, username } = updateData;
    const log = await this.loggerRepository.findOne({
      where: {
        action,
        day,
        telegram_id,
      },
    });
    if (log) {
      return await this.update(log.id, { count: log.count + 1 });
    } else {
      return await this.create({ action, telegram_id, username });
    }
  }
}