import * as bcrypt from 'bcrypt';
import { Component } from '@nestjs/common';

@Component()
export class CryptoService {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(text, salt);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
