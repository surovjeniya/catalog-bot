import { Module } from '@nestjs/common';
import { Use } from 'nestjs-telegraf';
import { UserModule } from 'src/user/user.module';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { DownloadPriceService } from './download-price.service';
import { DownloadPriceUpdate } from './download-price.update';

@Module({
  imports: [UserModule],
  providers: [DownloadPriceService, DownloadPriceUpdate, SellersHubBotApi],
  exports: [DownloadPriceService],
})
export class DownloadPriceModule {}
