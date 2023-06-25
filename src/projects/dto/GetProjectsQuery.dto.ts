import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProjectsQueryDto {
  @ApiPropertyOptional({
    description: 'Number of items to retrieve',
    example: 10,
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Number of items to skip',
    example: 10,
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip?: number;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'name',
  })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Ascending or Descending order',
    example: 'asc',
  })
  @IsString()
  @IsOptional()
  order?: string;

  @ApiPropertyOptional({
    description: 'Project Name to Search',
    example: 'Project 1',
  })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({
    description: 'Project Customer as Customer ID to Search',
    example: 1,
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  c?: number;

  @ApiPropertyOptional({
    description: 'Project Department as Department ID to Search',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsOptional()
  d?: number;

  @ApiPropertyOptional({
    description: 'Project Owner as Owner ID to Search',
    example: 1,
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  o?: number;

  @ApiPropertyOptional({
    description: 'Project Manager as Project Manager ID to Search',
    example: 1,
  })
  @IsNumber()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pm?: number;

  @ApiPropertyOptional({
    description: 'Project Deadline to Search',
    example: '2023-05-12T18:38:32.758Z',
  })
  @IsDate()
  @IsOptional()
  deadline?: Date;
}
