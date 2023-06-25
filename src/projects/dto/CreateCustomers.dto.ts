import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomers {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  market: string;

  @IsOptional()
  @IsNumber()
  marketId: number;

  @IsOptional()
  @IsString()
  projects: string;

  @IsOptional()
  @IsString()
  manager: string;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
