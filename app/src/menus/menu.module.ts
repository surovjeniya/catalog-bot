import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { MenuService } from './menu.service';
import { MenuUpdate } from './menu.update';

@Module({
  imports: [LoggerModule],
  providers: [MenuService, MenuUpdate],
})
export class MenuModule {}
