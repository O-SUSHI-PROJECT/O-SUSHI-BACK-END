import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  private readonly apiKey = process.env.API_KEY;

  validateApiKey(requestApiKey: string | undefined): boolean {
    return !!requestApiKey && this.apiKey === requestApiKey;
  }
}
