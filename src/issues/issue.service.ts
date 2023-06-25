import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import {
  Attachment,
  Comment,
  Issue,
  IssueType,
  StatusType,
} from '@prisma/client';

@Injectable()
export class IssueService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async getAttachments() {
    return this.prismaService.attachment.findMany({});
  }

  async getSingleAttachment(id: number) {
    return this.prismaService.attachment.findUnique({
      where: { id },
    });
  }

  async updateAttachment(id: number, payload: Attachment): Promise<Attachment> {
    return this.prismaService.attachment.update({
      where: { id: id },
      data: payload,
    });
  }

  async createAttachment(files: Express.Multer.File[]) {
    const s3 = new S3();
    const result: Attachment[] = [];

    try {
      for await (const file of files) {
        const uploadResult = await s3
          .upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Body: file.buffer,
            Key: `${uuid()}-${file.originalname}`,
          })
          .promise();

        const uploadedFile = await this.prismaService.attachment.create({
          data: {
            path: uploadResult.Location,
            name: file.originalname,
            bucketKey: uploadResult.Key,
            size: file.size,
            type: file.mimetype,
          },
        });

        result.push(uploadedFile);
      }
      return result;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Cant upload the file.');
    }
  }

  async deleteAttachment(id: number) {
    return this.prismaService.attachment.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async getStatusType() {
    return this.prismaService.statusType.findMany({
      where: { deleted: false },
    });
  }

  async getSingleStatusType(id: number) {
    return this.prismaService.statusType.findUnique({
      where: { id },
    });
  }

  async createStatusType(payload: StatusType) {
    return this.prismaService.statusType.create({ data: payload });
  }

  async updateStatusType(id: number, payload: StatusType) {
    return this.prismaService.statusType.update({
      where: { id: id },
      data: payload,
    });
  }

  async deleteStatusType(id: number) {
    return this.prismaService.statusType.update({
      where: { id },
      data: { deleted: false },
    });
  }

  async getIssueType() {
    return this.prismaService.issueType.findMany({
      where: { deleted: false },
    });
  }

  async getSingleIssueType(id: number) {
    return this.prismaService.issueType.findUnique({
      where: { id },
    });
  }

  async createIssueType(payload: IssueType) {
    return this.prismaService.issueType.create({ data: payload });
  }

  async updateType(id: number, payload: IssueType): Promise<IssueType> {
    return this.prismaService.issueType.update({
      where: { id: id },
      data: payload,
    });
  }

  async deleteIssueType(id: number) {
    return this.prismaService.issueType.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async getIssues() {
    return this.prismaService.issue.findMany({
      where: { deleted: false },
    });
  }

  async getSingleIssue(id: number) {
    return this.prismaService.issue.findUnique({
      where: { id },
    });
  }

  async createIssue(payload: Issue) {
    return this.prismaService.issue.create({ data: payload });
  }

  async deleteIssue(id: number) {
    return this.prismaService.issue.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async getComments() {
    return this.prismaService.comment.findMany({
      where: { deleted: false },
    });
  }

  async getSingleComment(id: number) {
    return this.prismaService.comment.findUnique({
      where: { id },
    });
  }

  async createComment(payload: Comment) {
    return this.prismaService.comment.create({ data: payload });
  }

  async updateComment(id: number, payload: Comment) {
    return this.prismaService.comment.update({
      where: { id: id },
      data: payload,
    });
  }

  async deleteComment(id: number) {
    return this.prismaService.comment.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
