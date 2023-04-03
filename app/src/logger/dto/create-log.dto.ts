import { Commands } from 'src/enum/commands.enum';

export class CreateLogDto {
  action: Commands;
  telegram_id: number;
  username?: string;
  day?: string;
}
