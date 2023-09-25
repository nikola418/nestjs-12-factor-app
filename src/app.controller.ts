import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    this.logger.log(`Incoming request at handler: ${this.getHello.name}`);
    return this.appService.getHello();
  }
}
