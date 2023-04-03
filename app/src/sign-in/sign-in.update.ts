import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SignInService } from './sign-in.service';

@Update()
export class SignInUpdate {
  constructor(private readonly signInService: SignInService) {}

  @Action(Commands['sign-in'])
  async signInAction(@Ctx() ctx: TelegrafContext) {
    const singInAction = await this.signInService.signInAction(ctx);
  }

  @Action('/sign-in/continue')
  async signIn(@Ctx() ctx: TelegrafContext) {
    const singIn = await this.signInService.signIn(ctx);
  }
}
