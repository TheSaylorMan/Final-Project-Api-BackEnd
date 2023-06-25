import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JWTAuthenticationGuard } from 'src/auth/guards';
import { CreateCustomers } from './dto/CreateCustomers.dto';
import { CreateProjects } from './dto/CreateProjects.dto';
import { ResponseDepartments } from './dto/ResponseDepartments.dto';
import {
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetProjectsQueryDto } from './dto/GetProjectsQuery.dto';
import { Customer, Department, Project } from '@prisma/client';

@ApiTags('Projects')
@Controller('projects')
@ApiBearerAuth()
@UseGuards(JWTAuthenticationGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  ////////////////////Departments/////////////////////

  @Get('departments')
  @ApiResponse({ type: [ResponseDepartments] })
  getDepartments(): Promise<ResponseDepartments[]> {
    return this.projectService.getDepartments();
  }

  @Get('departments/:id')
  @ApiResponse({ type: ResponseDepartments })
  @ApiParam({ name: 'id', type: Number })
  getSingleDepartment(@Param('id', ParseIntPipe) id): any {
    return this.projectService.getSingleDepartment(id);
  }

  @Post('departments')
  createDepartment(@Body() payload: Department) {
    return this.projectService.createDepartment(payload);
  }

  @Put('departments/:id')
  async updateDepartment(
    @Param('id', ParseIntPipe) id,
    @Body() payload: Department,
  ): Promise<Department> {
    await this.projectService.updateDepartment(id, payload);
    return payload;
  }

  //@Put('departments')
  //async bulkUpdateDepartments(@Body() payload: Department[]) {
  //await this.projectService.bulkUpdateDepartments(payload);
  //return payload;
  //}

  @Delete('departments/:id')
  deleteDepartment(@Param('id', ParseIntPipe) id) {
    return this.projectService.deleteDepartment(id);
  }

  ////////////////////customers/////////////////////

  @Get('customers/')
  getCustomers(): any {
    return this.projectService.getCustomers();
  }

  @Get('customers/:id')
  getSingleCustomer(@Param('id', ParseIntPipe) id) {
    return this.projectService.getSingleCustomer(id);
  }

  @Post('customers')
  createCustomer(@Body() payload: CreateCustomers) {
    return this.projectService.createCustomer(payload);
  }

  @Put('customer/:id')
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Customer,
  ): Promise<Customer> {
    await this.projectService.updateCustomer(id, payload);
    return payload;
  }

  @Delete('customer/:id')
  deleteCustomer(id: any) {
    return this.projectService.deleteCustomer(id);
  }

  ////////////////////Projects/////////////////////
  @Get('')
  getProjects(@Query() query: GetProjectsQueryDto) {
    return this.projectService.getProjects(query);
  }

  @Get(':id')
  getSingleProject(@Param('id', ParseIntPipe) id) {
    return this.projectService.getSingleProject(id);
  }

  @Post('')
  createProject(@Body() payload: CreateProjects) {
    return this.projectService.createProject(payload);
  }

  @Put(':id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Project,
  ): Promise<Project> {
    await this.projectService.updateProject(id, payload);
    return payload;
  }

  @Delete(':id')
  deleteProject(@Param('id') id) {
    return this.projectService.deleteProject(id);
  }
}
