import { Commands } from 'src/enum/commands.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'logger' })
export class LoggerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: Commands;

  @Column()
  telegram_id: number;

  @Column({ default: 1, nullable: true })
  count?: number;

  @Column()
  username: string;

  @Column({ default: new Date().toDateString() })
  day?: string;
}