import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentMongoService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}
  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = new this.studentModel(data);
    return newStudent.save(); //mongo db method save to save in db
  }
  async getAllStudentsFromDB(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }
  async getStudentByIDFromDB(id: string): Promise<Student | null> {
    return this.studentModel.findById(id).exec();
  }
  async updateStudentInDB(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    // return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
    //complete update
    const updatedData = {
      name: data.name ?? null,
      age: data.age ?? null,
      email: data.email ?? null,
    };
    return this.studentModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      overwriteImmutable: true,
    });
  }
  async patchStudentInDB(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    // partial update
    return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
  async deleteStudentInDB(id: string): Promise<Student | null> {
    return this.studentModel.findByIdAndDelete(id, { new: true }).exec();
  }
}
