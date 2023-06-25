import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { PrismaModule } from 'src/libs/services/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
