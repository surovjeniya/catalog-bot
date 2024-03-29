import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Utm {
  chat_good_cards_designer = 'chat_good_cards_designer',
  chat_design = 'chat_design',
  chat_managers = 'chat_managers',
  chat_main = 'chat_main',
  chat_ai = 'chat_ai',
  chat_bayer = 'chat_bayer',
  site = 'site',
  fast_review = 'fast_review',
  download_price = 'download_price',
  view_web_site = 'view_web_site',
}

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  telegram_id: string;

  @Column()
  is_bot: boolean;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  language_code?: string;

  @Column({ nullable: true })
  utm?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
