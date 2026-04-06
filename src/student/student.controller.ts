import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import * as studentService from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: studentService.StudentService) { };
    @Get()
    getAllStudents() {
        return this.studentService.getAllStudents();
    }
    @Get(":id")
    getStudentById(@Param("id") id: string) {
        return this.studentService.getStudentById(Number(id));
    }
    @Post()
    createStudent(@Body() body:studentService.StudentType){
        return this.studentService.createStudent(body);
    }
    @Put(":id")
    updateStudent(@Param("id") id:string, @Body() body:studentService.StudentType){
        return this.studentService.updateStudent(Number(id),body);
    }
    @Patch(":id")
    patchStudent(@Param("id") id:string,@Body() body:Partial<studentService.StudentType>){
        return this.studentService.patchStudent(Number(id),body);
    }
    @Delete(":id")
    deleteStudent(@Param("id") id:string){
        return this.studentService.deleteStudent(Number(id));
    }
}
