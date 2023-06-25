import { ApiProperty } from '@nestjs/swagger';

class OwnerResponse {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}

export class ResponseDepartments {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  owner?: OwnerResponse;
  @ApiProperty()
  ownerId?: number;
  @ApiProperty()
  projects?: string;
  @ApiProperty()
  deleted?: boolean;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
}
