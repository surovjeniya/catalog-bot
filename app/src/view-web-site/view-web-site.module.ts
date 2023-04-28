import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { ViewWebSiteService } from './view-web-site.service';

@Module({
  imports: [UserModule],
  providers: [ViewWebSiteService, SellersHubBotApi],
  exports: [ViewWebSiteService],
})
export class ViewWebSiteModule {}
