import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../student-mongo/student.schema';
import { StudentMongoController } from './student-mongo.controller';
import { StudentMongoService } from './student-mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentMongoController],
  providers: [StudentMongoService],
})
export class StudentMongoModule {}
