import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World updated and seeing changes in Insomnia!';
  }
}
