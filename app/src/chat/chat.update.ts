import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { ChatService } from './chat.service';

@Update()
export class ChatUpdate {
  constructor(private readonly chatService: ChatService) {}

  @Action(Commands.chats)
  async getChats(@Ctx() ctx: TelegrafContext) {
    const chats = await this.chatService.getChats(ctx);
  }
}
