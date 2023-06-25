import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { History, HistoryStatusType } from '@prisma/client';

@Injectable()
export class HistoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async getHistory() {
    return this.prismaService.history.findMany({
      where: { deleted: false },
    });
  }

  async getSingleHistory(id: number) {
    return this.prismaService.history.findUnique({
      where: { id },
    });
  }

  async createHistory(payload) {
    return this.prismaService.history.create({
      data: payload,
    });
  }

  async updateHistory(id: number, payload: History) {}

  async deleteHistory(id: number) {
    return this.prismaService.history.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async getHistoryStatusType() {
    return this.prismaService.history.findMany({
      where: { deleted: false },
    });
  }

  async getSingleHistoryStatusType(id: number) {
    return this.prismaService.history.findUnique({
      where: { id },
    });
  }

  async createHistoryStatusType(payload: any) {
    return this.prismaService.history.create({ data: payload });
  }

  async updateHistoryStatusType(id: number, payload: HistoryStatusType) {
    return this.prismaService.history.update({
      where: { id: id },
      data: payload,
    });
  }

  async deleteHistoryStatusType(id: number) {
    return this.prismaService.history.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
