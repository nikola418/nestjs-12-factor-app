import {
  Logger,
  Module,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.env'] })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.logger.log(config.get('NODE_ENV'));
  }

  private logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.prisma.$connect();
    const users = await this.prisma.user.findMany();
    this.logger.log(`Users: ${users}`);
  }

  async onModuleDestroy() {
    this.logger.warn('SHUTTING DOWN...');
    this.prisma.$disconnect();
  }

  onApplicationShutdown(signal?: string) {
    this.logger.warn(`Received signal: ${signal}`);
  }
}
