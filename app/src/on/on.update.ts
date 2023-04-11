import { Ctx, On, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf-context.interface';

@Update()
export class OnUpdate {
  constructor() {}

  @On('contact')
  async contactHandler(@Ctx() ctx: TelegrafContext) {}
}
