export interface RegisterTelegramDtoRequest {
  phone_number: string;
  password: string;
  email?: string;
  username?: string;
  registered_from_bot?: boolean;
  telegram_id?: number;
}

export interface RegisterTelegramDtoResponse {
  jwt: string;
  user: User;
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  registered_from_bot: boolean;
  createdAt: string;
  updatedAt: string;
  telegram_id: number;
  phone_number: string;
}
