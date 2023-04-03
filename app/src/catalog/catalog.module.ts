import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { CatalogService } from './catalog.service';
import { CatalogUpdate } from './catalog.update';

@Module({
  imports: [LoggerModule],
  providers: [CatalogService, CatalogUpdate, SellersHubBotApi],
})
export class CatalogModule {}
