export class CreateCustomers {
  id: number;
  name: string;
  address?: string;
  market?: string;
  marketId?: number;
  projects?: string;
  manager?: string;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
