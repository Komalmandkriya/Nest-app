import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './pg-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PgUserService {
  // reposotory in typeorm and model in mongoos
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async addUser(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }
  async getUsers(filters: { name?: string; age?: number }): Promise<User[]> {
    const query = this.userRepo.createQueryBuilder('user');

    if (filters.name) {
      query.andWhere('user.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.age !== undefined) {
      query.andWhere('user.age = :age', {
        age: filters.age,
      });
    }

    return query.getMany();
  }
  async getUserById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updated = Object.assign(user, data);
    return this.userRepo.save(updated);
  }
  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
