import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { StudentMongoService } from './student-mongo.service';
import { Student } from './student.schema';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('student-mongo')
export class StudentMongoController {
  constructor(private readonly studentService: StudentMongoService) {}
  @UsePipes(UppercasePipe)
  @Post()
  async addStudent(@Body() data: Partial<Student>) {
    return this.studentService.createStudent(data);
  }
  @Get()
  async getStudentsFromDB() {
    return this.studentService.getAllStudentsFromDB();
  }
  @Get(':id')
  async getStudentByIdFromDB(@Param('id') id: string) {
    return this.studentService.getStudentByIDFromDB(id);
  }
  @Put(':id')
  async updateStudentInDB(
    @Param('id') id: string,
    @Body() body: Partial<Student>,
  ) {
    return this.studentService.updateStudentInDB(id, body);
  }
  @Patch(':id')
  async patchStudentInDB(
    @Param('id') id: string,
    @Body() body: Partial<Student>,
  ) {
    return this.studentService.patchStudentInDB(id, body);
  }
  @Delete(':id')
  async deleteStudentInDB(@Param('id') id: string) {
    return this.studentService.deleteStudentInDB(id);
  }
}
