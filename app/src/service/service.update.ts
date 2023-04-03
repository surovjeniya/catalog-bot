import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { ServiceService } from './service.service';

@Update()
export class ServiceUpdate {
  constructor(private readonly serviceService: ServiceService) {}

  @Action(Commands['create-service'])
  async createServiceAction(@Ctx() ctx: TelegrafContext) {
    const serviceAction = await this.serviceService.createServiceAction(ctx);
  }

  @Action(/(?<=create-service\/).*/)
  async createService(@Ctx() ctx: TelegrafContext) {
    const service = await this.serviceService.createService(ctx);
  }

  @Action(/(?<=use-sh-profile\/).*/)
  async checkShProfile(@Ctx() ctx: TelegrafContext) {
    const profile = await this.serviceService.checkShProfile(ctx);
  }

  @Action(Commands['create-via-bot'])
  async createServiceViaBot(@Ctx() ctx: TelegrafContext) {
    const viaBotService = await this.serviceService.createServiceViaBot(ctx);
  }

  @Action('send-to-chat')
  async sendMessageToChat(@Ctx() ctx: TelegrafContext) {
    const message = await this.serviceService.sendMessageToChat(ctx);
  }

  @Action('notification')
  async getNotification(@Ctx() ctx: TelegrafContext) {
    const notification = await this.serviceService.getNotification(ctx);
  }

  @Action(/(?<=show-contacts\/).*/)
  async sendContacts(@Ctx() ctx: TelegrafContext) {
    const contacts = await this.serviceService.sendContacts(ctx);
  }

  @Action(/(?<=show-more-info\/).*/)
  async sendMoreInfo(@Ctx() ctx: TelegrafContext) {
    const moreInfo = await this.serviceService.sendMoreInfo(ctx);
  }

  @Action(/(?<=create-via-site\/).*/)
  async createServiceViaSite(@Ctx() ctx: TelegrafContext) {
    const serviceViaSite = await this.serviceService.createServiceViaSite(ctx);
  }
}
