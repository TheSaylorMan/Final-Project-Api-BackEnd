import { BadRequestException } from '@nestjs/common';
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception';
import { ValidationError } from 'class-validator';

export class ValidationBadRequestException extends BadRequestException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(objectOrError, descriptionOrOptions);
  }
}

export interface ValidationBadRequestExceptionResult {
  message: ValidationError[];
}
