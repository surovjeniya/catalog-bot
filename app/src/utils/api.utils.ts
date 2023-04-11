import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

class RegisterDtoRequest {
  username: string;
  email: string;
  password: string;
  registered_from_bot: boolean;
  phone_number: string;
  telegram_id: number;
}

@Injectable()
export class Api {
  constructor(private readonly configService: ConfigService) {}

  readonly $axios = axios.create({
    baseURL: `${this.configService.get('API')}/v1`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async registration(data: RegisterDtoRequest) {
    try {
      const { data: registerData } = await this.$axios.post(
        '/auth/local/register',
        data,
      );
    } catch (e) {}
  }
}
