import { IssueService } from './issue.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Put,
} from '@nestjs/common';
import { JWTAuthenticationGuard } from '../auth/guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Attachment, Comment, Issue, IssueType, StatusType } from '@prisma/client';

@ApiTags('Issues')
@Controller('issues')
@ApiBearerAuth()
@UseGuards(JWTAuthenticationGuard)
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Get('attachments')
  getAttachments() {
    return this.issueService.getAttachments();
  }

  @Get('attachment/:id')
  getSingleAttachment(@Param('id', ParseIntPipe) id) {
    return this.issueService.getSingleAttachment(id);
  }

  @Put('attatchmet/:id')
  updateAttachment(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Attachment,
  ) {
    return this.issueService.updateAttachment(id, payload);
  }

  @Post('attachments')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  createAttachment(@UploadedFiles() files: Express.Multer.File[]) {
    return this.issueService.createAttachment(files);
  }

  @Delete('attachment/:id')
  deleteAttatchment(@Param('id', ParseIntPipe) id: any) {
    return this.issueService.deleteAttachment(id);
  }

  @Get('status')
  getStatusType() {
    return this.issueService.getStatusType();
  }

  @Get('status/:id')
  getSingleStatusType(@Param('id', ParseIntPipe) id) {
    return this.issueService.getSingleStatusType(id);
  }

  @Post('status')
  createStatusType(@Body() payload: StatusType) {
    return this.issueService.createStatusType(payload);
  }

  @Put('status/:id')
  updateStatusType(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: StatusType,
  ): Promise<StatusType> {
    return this.issueService.updateStatusType(id, payload);
  }

  @Delete('status/:id')
  deleteStatusType(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.deleteStatusType(id);
  }

  @Get('type')
  getIssueType() {
    return this.issueService.getIssueType();
  }

  @Get('type/:id')
  getSingleIssueType(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.getSingleIssueType(id);
  }

  @Post('type')
  createIssueType(@Body() payload: IssueType) {
    return this.issueService.createIssueType(payload);
  }

  @Put('type/:id')
  updateType(@Param('id', ParseIntPipe) id, @Body() payload: IssueType) {
    return this.issueService.updateType(id, payload);
  }

  @Delete('type/:id')
  deleteIssueType(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.deleteIssueType(id);
  }

  @Get('')
  getIssues() {
    return this.issueService.getIssues();
  }

  @Get('/:id')
  getSingleIssue(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.getSingleIssueType(id);
  }

  @Post('')
  createIssue(@Body() payload: Issue) {
    return this.issueService.createIssue(payload);
  }

  @Delete('/:id')
  deleteIssue(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.deleteIssue(id);
  }

  @Get('/comment')
  getComments() {
    return this.issueService.getComments();
  }

  @Get('/comment/:id')
  getSingleComment(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.getSingleComment(id);
  }

  @Post('/comment')
  createComment(@Body() payload: Comment) {
    return this.issueService.createComment(payload);
  }

  @Put('/comment/id')
  updateComment(@Param('id', ParseIntPipe) id, @Body() payload: Comment) {
    return this.issueService.updateComment(id, payload)
  }

  @Delete('/comment/:id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.deleteComment(id);
  }
}
