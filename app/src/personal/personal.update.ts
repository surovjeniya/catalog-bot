import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { PersonalService } from './personal.service';

@Update()
export class PersonalUpdate {
  constructor(private readonly personalService: PersonalService) {}

  @Action(Commands.personal)
  async getPersonal(@Ctx() ctx: TelegrafContext) {
    const personal = await this.personalService.getPersonal(ctx);
  }
}
