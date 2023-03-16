import { Action, Ctx, Message, On, Update } from 'nestjs-telegraf';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import {
  getSignInCredentials as getSignInCredentials,
  INVALID_EMAIL,
} from 'src/message';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from 'src/utils/get-buttons.utils';

@Update()
export class RegisterUpdate {
  constructor(private readonly sellersBotApi: SellersHubBotApi) {}

  @Action(Commands.register)
  async registerAction(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions.register;
    this.clearRegisterData(ctx);
    await ctx.replyWithHTML(
      `Для продолжения регистрации введите свой валидный <b>email</b>.\nНа этот адрес придёт письмо с подтвеждением регистрации. 👇`,
    );
  }

  @On('photo')
  async test(@Ctx() ctx: TelegrafContext, @Message('photo') photo: any) {
    if (ctx.session.action === Actions['create-service']) {
      ctx.session.create_service_ctx.image = photo;
    }
    if (ctx.session.create_service_ctx.image) {
      ctx.reply('Отлично!Теперь введите описание вашей услуги.');
    }
  }

  @On(Commands.message)
  async getMessage(
    @Message('text') message: string,
    @Ctx() ctx: TelegrafContext,
  ) {
    if (
      ctx.session.action === Actions['create-service'] &&
      ctx.session.create_service_ctx.image
    ) {
      ctx.session.create_service_ctx.description = message;
      ctx.session.create_service_ctx.description.substring(0, 1000) + '...';
      if (ctx.session.create_service_ctx.description) {
        await ctx.replyWithPhoto(
          ctx.session.create_service_ctx.image[0].file_id,
        );
        await ctx.reply(ctx.session.create_service_ctx.description);
        await ctx.reply(
          'Отлично!Вот ваша услугу.Опубликовать?',
          getInlineButtons([
            {
              data: 'send-to-chat',
              text: 'Да',
            },
            {
              data: 'start',
              text: 'Нет (Вернуться в главное меню)',
            },
          ]),
        );
      }
    }
    if (ctx.session.action === Actions['sign-in']) {
      !ctx.session.login_data.validateEmail
        ? (ctx.session.login_data.identifier = message)
        : (ctx.session.login_data.password = message);
      if (
        ctx.session.login_data.identifier.length &&
        ctx.session.login_data.identifier.match(
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
        )
      ) {
        ctx.session.login_data.validateEmail = true;
        if (ctx.session.login_data.password.length) {
          await ctx.replyWithHTML(
            getSignInCredentials(ctx),
            getInlineButtons(
              [
                {
                  text: 'Да',
                  data: '/sign-in/continue',
                },
                {
                  text: 'Нет',
                  data: 'start',
                },
              ],
              1,
            ),
          );
        } else {
          await ctx.reply('Введите пароль: 👇');
        }
      } else {
        await ctx.reply(INVALID_EMAIL);
      }
    }
    if (ctx.session.action === Actions.register) {
      ctx.session.register_data.email = message;
      if (
        ctx.session.register_data.email.length &&
        ctx.session.register_data.email.match(
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
        )
      ) {
        ctx.session.register_data.validateEmail = true;
        ctx.session.register_data.password = this.generatePass();
        await ctx.replyWithHTML(
          `<b>Ваши сгенерированные данные:</b>\nemail: ${ctx.session.register_data.email},\nпароль: ${ctx.session.register_data.password}`,
        );
        await ctx.reply(
          'Продолжить?',
          getInlineButtons(
            [
              {
                data: '/register/continue',
                text: 'Да',
              },
              {
                data: 'start',
                text: 'Нет',
              },
            ],
            1,
          ),
        );
      } else {
        await ctx.reply('Невалидный email');
      }
    }
  }

  @Action('/register/continue')
  async registration(@Ctx() ctx: TelegrafContext) {
    const { email, password } = ctx.session.register_data;
    const registerData = await this.sellersBotApi.registration(
      ctx,
      email,
      password,
      email,
    );
    if (registerData && registerData.user.id) {
      ctx.session.action = null;
      this.clearRegisterData(ctx);
      await ctx.reply(
        'Спасибо за регистрацию.\nПисьмо с подтверждением выслано на вашу почту',
      );
    }
  }

  generatePass() {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 12;
    let password = '';
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  clearRegisterData(ctx: TelegrafContext) {
    ctx.session.register_data = {
      email: '',
      password: '',
      validateEmail: false,
    };
    return 1;
  }
}
