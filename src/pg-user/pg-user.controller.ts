import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PgUserService } from './pg-user.service';
import { User } from './pg-user.entity';

@Controller('pg-user')
export class PgUserController {
  constructor(private readonly userService: PgUserService) {}

  @Post()
  createUser(@Body() body: Partial<User>) {
    return this.userService.addUser(body);
  }
  @Get()
  getUser(
    @Query('name') name?: string,
    @Query('age') age?: string,
  ): Promise<User[]> {
    return this.userService.getUsers({
      name,
      age: age ? Number(age) : undefined,
    });
  }
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.updateUser(id, data);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
