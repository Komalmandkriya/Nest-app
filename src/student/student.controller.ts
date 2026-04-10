import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import * as studentService from './student.service';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/role.enum';
import { HttpExecptionFilter } from 'src/filters/http-execption/http-execption.filter';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: studentService.StudentService) {}
  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Student)
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @UseFilters(HttpExecptionFilter)
  @Roles(Role.Student)
  @Get(':id')
  getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getStudentById(Number(id));
  }
  @Post()
  createStudent(@Body(UppercasePipe) body: studentService.StudentType) {
    return this.studentService.createStudent(body);
  }
  @Put(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() body: studentService.StudentType,
  ) {
    return this.studentService.updateStudent(Number(id), body);
  }
  @Patch(':id')
  patchStudent(
    @Param('id') id: string,
    @Body() body: Partial<studentService.StudentType>,
  ) {
    return this.studentService.patchStudent(Number(id), body);
  }
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(Number(id));
  }
}
