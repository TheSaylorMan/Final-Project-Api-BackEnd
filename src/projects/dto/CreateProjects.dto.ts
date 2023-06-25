import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjects {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  @IsOptional()
  projectType: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  market: string;

  @IsOptional()
  @IsNumber()
  marketId: number;

  @IsOptional()
  @IsNumber()
  customer: number;

  @IsOptional()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  department: number;

  @IsOptional()
  @IsNumber()
  departmentId: number;

  @IsOptional()
  @IsString()
  projectUsers: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  deadline: Date;

  @IsOptional()
  @IsNumber()
  cost: number;
  value: number;

  @IsOptional()
  @IsBoolean()
  deleted: Boolean;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
