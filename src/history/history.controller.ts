import { HistoryService } from './history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JWTAuthenticationGuard } from '../auth/guards';
import { History, HistoryStatusType } from '@prisma/client';

@ApiTags('History')
@Controller('History')
@ApiBearerAuth()
@UseGuards(JWTAuthenticationGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  //History
  @Get('')
  getHistory() {
    return this.historyService.getHistory();
  }

  @Get('/:id')
  getSingleHistory(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.getSingleHistory(id);
  }

  @Post('')
  createHistory(@Body() payload) {
    return this.historyService.createHistory(payload);
  }

  @Put(':id')
  updateHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: History,
  ) {
    return this.historyService.updateHistory(id, payload);
  }
  @Delete('/:id')
  deleteHistory(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.deleteHistory(id);
  }

  @Get('status')
  getHistoryStatusType() {
    return this.historyService.getHistoryStatusType();
  }

  @Get('/status/:id')
  getSingleHistoryStatusType(id: number) {
    return this.historyService.getSingleHistoryStatusType(id);
  }

  @Post('/status')
  createHistoryStatusType(@Body() payload) {
    return this.historyService.createHistoryStatusType(payload);
  }

  @Put('/status/:id')
  updateHistoryStatusType(@Param('id', ParseIntPipe) id, @Body() payload: HistoryStatusType) {
    return this.historyService.updateHistoryStatusType(id, payload);
  }

  @Delete('/status/:id')
  deleteHistoryStatusType(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.deleteHistoryStatusType(id);
  }
}
