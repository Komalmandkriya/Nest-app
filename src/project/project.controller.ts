import { Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}
  @Post('seed')
  seedData() {
    return this.service.createDeveloper();
  }
  @Get('developers')
  getDevelopers() {
    return this.service.getDevelopers();
  }
  @Get()
  getProjects() {
    return this.service.getProjects();
  }
}
