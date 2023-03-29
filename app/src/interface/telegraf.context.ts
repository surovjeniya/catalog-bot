import { Actions } from 'src/enum/actions.enum';
import { Context } from 'telegraf';

interface TelegrafImage {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

export interface TelegrafContext extends Context {
  match: {
    input: string;
  };
  session: {
    prev_message: number;
    pinTick: boolean;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name: string;
      username: string;
      language_code: string;
    };
    create_service_ctx: {
      categorySlug?: string;
      chatId: string;
      serviceId?: number;
      image: {
        file_id?: string;
        file_unique_id?: string;
        file_size?: number;
        width?: number;
        height?: number;
      }[];
      description: string;
      price?: number;
    };
    profile_contacts: {
      contact_telegram?: any;
      contact_email?: any;
      contact_instagram?: any;
      contact_viber?: any;
      contact_vk?: any;
      contact_whatsup?: any;
      phone_number?: any;
    };
    action: Actions;
    jwt: string;
    register_data: {
      email: string;
      validateEmail: boolean;
      password: string;
    };
    login_data: {
      identifier: string;
      password: string;
      validateEmail: boolean;
    };
  };
}
