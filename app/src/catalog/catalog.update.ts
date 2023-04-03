import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { CatalogService } from './catalog.service';

@Update()
export class CatalogUpdate {
  constructor(private readonly catalogService: CatalogService) {}

  @Command(Commands.catalog)
  async getCatalog(@Ctx() ctx: TelegrafContext) {
    const catalog = await this.catalogService.getCatalog(ctx);
  }

  @Action(Commands.catalog)
  async getCatalogAction(@Ctx() ctx: TelegrafContext) {
    const catalog = await this.catalogService.getCatalog(ctx);
  }

  @Action(/(?<=child-categories\/).*/)
  async getChildCategories(@Ctx() ctx: TelegrafContext) {
    const childCategories = await this.catalogService.getChildCategories(ctx);
  }
}
