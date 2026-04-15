import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './pg-user.entity';
import { PgUserController } from './pg-user.controller';
import { PgUserService } from './pg-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PgUserController],
  providers: [PgUserService],
})
export class PgUserModule {}
