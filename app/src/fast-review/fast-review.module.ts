import { Module } from '@nestjs/common';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { FastReviewService } from './fast-review.service';
import { FastReviewUpdate } from './fast-review.update';

@Module({
  imports: [],
  providers: [FastReviewService, SellersHubBotApi, FastReviewUpdate],
  exports: [FastReviewService],
})
export class FastReviewModule {}
