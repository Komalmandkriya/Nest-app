import { Injectable, NotFoundException } from '@nestjs/common';
import { STUDENTS } from './studentData';
export interface StudentType {
    name: string;
    age: number;
    gender: string;
    course: string;
    year: number;
}
@Injectable()
export class StudentService {
    private students = STUDENTS;
    // get all
    getAllStudents() {
        return this.students;
    }
    // getById
    getStudentById(id: number) {
        const student = this.students.find(item => item.id === id);
        if (!student) {
            throw new NotFoundException("Student not found");
        } else {
            return student
        }
    }
    // post
    createStudent(data: StudentType) {
        const newStudent = {
            id: Date.now(),
            ...data
        }
        this.students.push(newStudent);
        return newStudent;
    }
    // put
    updateStudent(id: number, data: StudentType) {
        const index = this.students.findIndex(s => s.id === id)
        if (index === -1) {
            throw new NotFoundException("Student not found")
        } else {
            this.students[index] = { id, ...data };
            return this.students[index]
        }
    }
    // patch
    patchStudent(id: number, data: Partial<StudentType>) {
        const student = this.getStudentById(id)
        Object.assign(student, data); // it only change the changed key unchange remains same
        return student;
    }
    // delete
    deleteStudent(id:number) {
        const index = this.students.findIndex(s => s.id === id)
        if (index === -1) throw new NotFoundException("Student not found");
        const deleted = this.students.splice(index, 1);
        return{message:"Student Deleted",student:deleted[0]}
    }

}
