import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
    @InjectModel(Project.name) private ProjectModel: Model<Project>,
  ) {}
  async createDeveloper(): Promise<{ dev1: Developer; dev2: Developer }> {
    const [projectA, projectB] = await Promise.all([
      this.ProjectModel.create({
        projectTitle: 'NestCRM',
      }),
      this.ProjectModel.create({
        projectTitle: 'MongoAnalytics',
      }),
    ]);
    const [dev1, dev2] = await Promise.all([
      this.developerModel.create({
        name: 'Komal',
        projects: [projectA._id, projectB._id],
      }),
      this.developerModel.create({
        name: 'Sapna',
        projects: [projectA._id],
      }),
    ]);

    await Promise.all([
      this.ProjectModel.findByIdAndUpdate(projectA._id, {
        $set: { developers: [dev1._id, dev2._id] },
      }),
      this.ProjectModel.findByIdAndUpdate(projectB._id, {
        $set: { developers: [dev1._id] },
      }),
    ]);
    return { dev1, dev2 };
  }
  async getDevelopers(): Promise<Developer[]> {
    return await this.developerModel.find().populate('projects');
  }
  async getProjects(): Promise<Project[]> {
    return await this.ProjectModel.find().populate('developers');
  }
}
