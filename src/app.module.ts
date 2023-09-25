import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.env'] })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    console.log(config.get('NODE_ENV'));
  }

  async onModuleInit() {
    console.log(await this.prisma.user.findMany());
  }
}
