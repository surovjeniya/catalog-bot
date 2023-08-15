import { ConfigService } from '@nestjs/config';
import { Action, Ctx, Message, On, Update } from 'nestjs-telegraf';
import { AuthService } from 'src/auth/auth.service';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { FastReviewService } from 'src/fast-review/fast-review.service';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';
import {
  getSignInCredentials as getSignInCredentials,
  INVALID_EMAIL,
} from 'src/message';
import { UserService } from 'src/user/user.service';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from 'src/utils/get-buttons.utils';
import { chatListener } from './helpers/chat-listener.helper';

@Update()
export class RegisterUpdate {
  constructor(
    private readonly sellersBotApi: SellersHubBotApi,
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly fastReviewService: FastReviewService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Action(Commands.register)
  async registerAction(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.register,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    ctx.session.action = Actions.register;
    this.clearRegisterData(ctx);

    await ctx.replyWithHTML(
      `Для продолжения регистрации введите свой валидный <b>email</b>.\nНа этот адрес придёт письмо с подтвеждением регистрации. 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '↩️ Вернуться в главное меню',
                callback_data: Commands.menu,
              },
            ],
          ],
        },
      },
    );
  }

  @On('contact')
  async getContact(@Ctx() ctx: TelegrafContext) {
    const contact = await this.authService.getContact(ctx);
  }

  @On('photo')
  async getPhoto(@Ctx() ctx: TelegrafContext, @Message('photo') photo: any) {
    if (ctx.update.message.chat.type === 'supergroup') {
      // const listener = await chatListener(ctx, this.configService);
    }
    if (ctx.update.message.chat.type === 'private') {
      if (ctx.session.action === Actions['create-service']) {
        ctx.session.create_service_ctx.image = photo;
      }
      if (ctx.session.create_service_ctx.image) {
        ctx.replyWithHTML(
          'Отлично! Теперь введите описание вашей услуги. (<b>не более 1000 символов</b>)',
        );
      }
    }
  }

  @On(Commands.message)
  async getMessage(
    @Message('text') message: string,
    @Ctx() ctx: TelegrafContext,
  ) {
    //chat listeners
    // const listener = await chatListener(ctx, this.configService);
    // --
    if (ctx.session.action === Actions.review) {
      console.log(3);

      const reviewMessage = await this.fastReviewService.createReviewMessage(
        ctx,
        message,
      );
    }
    if (
      ctx.session.action === Actions['create-service'] &&
      ctx.session.create_service_ctx.image
    ) {
      ctx.session.create_service_ctx.description = message;
      // console.log(ctx.session.create_service_ctx.description.length);
      if (ctx.session.create_service_ctx.description.length > 1000) {
        ctx.session.create_service_ctx.description =
          ctx.session.create_service_ctx.description.substring(0, 1000) + '...';
        ctx.session.create_service_ctx.description.substring(0, 1000) + '...';
      }
      if (ctx.session.create_service_ctx.description) {
        await ctx.replyWithPhoto(
          ctx.session.create_service_ctx.image[0].file_id,
        );
        await ctx.reply(ctx.session.create_service_ctx.description);
        await ctx.reply(
          'Отлично! Вот ваша услугу. Опубликовать?',
          getInlineButtons([
            {
              data: 'send-to-chat',
              text: 'Да',
            },
            {
              data: Commands.menu,
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
                  data: Commands.menu,
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
          `<b>Ваши сгенерированные данные: </b>\nemail: ${ctx.session.register_data.email},\nпароль: ${ctx.session.register_data.password}`,
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
                data: Commands.menu,
                text: 'Нет',
              },
            ],
            1,
          ),
        );
      } else {
        await ctx.reply('Некорректный формат.');
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
      await ctx.replyWithHTML(
        `Ваша учётная запись успешно создана!\nНа указанный e-mail будет отправлена ссылка для подтверждения регистрации.\n(Вы можете сменить пароль на нашем <a href="https://sellershub.ru">сайте</a> после подтверждения аккаунта)`,
        getInlineButtons([
          {
            text: '↩️ Вернуться в главное меню.',
            data: Commands.menu,
          },
        ]),
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
