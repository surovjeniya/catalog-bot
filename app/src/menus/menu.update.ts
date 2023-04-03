import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { MenuService } from './menu.service';

@Update()
export class MenuUpdate {
  constructor(private readonly menuService: MenuService) {}

  @Action(Commands.menu)
  async getMenu(@Ctx() ctx: TelegrafContext) {
    const menu = await this.menuService.getMenu(ctx);
  }
}
