import { Body, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ResponseDepartments } from './dto/ResponseDepartments.dto';
import { GetProjectsQueryDto } from './dto/GetProjectsQuery.dto';
import { Customer, Department, Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  ////////////////////Departments/////////////////////

  async getDepartments(): Promise<ResponseDepartments[]> {
    return this.prismaService.department.findMany({
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getSingleDepartment(id: number) {
    return this.prismaService.department.findFirst({
      where: {
        id: id,
      },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async createDepartment(payload: Department) {
    return this.prismaService.department.create({
      data: payload,
    });
  }

  async updateDepartment(id: number, payload: Department): Promise<Department> {
    return this.prismaService.department.update({
      where: {
        id: id,
      },
      data: payload,
    });
  }

  async deleteDepartment(@Param('id') id: string) {
    return this.prismaService.department.updateMany({
      where: { id: parseInt(id) },
      data: { deleted: true },
    });
  }

  ////////////////////Customers/////////////////////

  async getCustomers() {
    return this.prismaService.customer.findMany({});
  }

  getSingleCustomer(id: any) {
    return this.prismaService.department.findFirst({
      where: id,
    });
  }

  createCustomer(payload: any) {
    return this.prismaService.customer.create(payload);
  }

  async updateCustomer(id: number, payload: Customer): Promise<Customer> {
    return this.prismaService.customer.update({
      where: {
        id: id,
      },
      data: payload,
    });
  }

  deleteCustomer(@Param('id') id: string) {
    return this.prismaService.customer.updateMany({
      where: { id: parseInt(id) },
      data: { deleted: true },
    });
  }

  ////////////////////Projects/////////////////////

  async getProjects(query: GetProjectsQueryDto) {
    const buildWhere: any = {
      deleted: false,
    };

    let orderBy: any = [
      {
        createdAt: 'desc',
      },
    ];

    if (query.sortBy) {
      orderBy = [
        {
          [query.sortBy]: query.order ?? 'desc',
        },
      ];
    }

    if (query.q) {
      buildWhere.name = {
        contains: query.q,
        mode: 'insensitive',
      };
    }

    if (query.c) {
      buildWhere.customerId = {
        equals: query.c,
      };
    }

    if (query.d) {
      buildWhere.departmentId = {
        equals: query.d,
      };
    }

    if (query.pm) {
      buildWhere.projectUsers = {
        some: {
          projectManager: {
            equals: true,
          },
          userId: {
            equals: query.pm,
          },
        },
      };
    }

    if (query.o) {
      buildWhere.projectUsers = {
        some: {
          projectLead: {
            equals: true,
          },
          userId: {
            equals: query.pm,
          },
        },
      };
    }

    return this.prismaService.project.findMany({
      where: buildWhere,
      take: query.limit ?? 10,
      skip: query.skip ?? 0,
      orderBy: orderBy,
      include: {
        market: true,
        projectUsers: true,
        customer: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  getSingleProject(id: any) {
    return this.prismaService.project.findFirst({
      where: id,
    });
  }

  createProject(@Body() payload: any) {
    return this.prismaService.project.create(payload);
  }

  async updateProject(id: number, payload: Project) {
  
  }

  deleteProject(@Param('id') id: string) {
    return this.prismaService.project.updateMany({
      where: { id: parseInt(id) },
      data: { deleted: true },
    });
  }
}
