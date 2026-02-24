import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async registerNewAccount(dto: CreateUserDto) {
    const emailTaken = await this.repo.findOne({ where: { email: dto.email } });
    if (emailTaken) {
      throw new ConflictException('A user with this email already exists');
    }

    const hash = await bcrypt.hashSync(dto.password, 10);

    const userProfile = this.repo.create({
      name: dto.name,
      email: dto.email,
      password: hash,
      role: { id: dto.role } as any,
    });

    const savedUser = await this.repo.save(userProfile);

    const { password, ...result } = savedUser;
    return result;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const updateData = {
      ...updateUserDto,
      role: updateUserDto.role ? { id: updateUserDto.role } : undefined,
    };
    this.repo.update(id, updateData);
    return {
      message: 'User Updated successfully',
      status: 200,
      data: user,
    };
  }

  remove(id: number) {
    this.repo.delete(id);
    return {
      message: 'User deleted successfully',
      status: 200,
    };
  }
}
function findAll() {
  throw new Error('Function not implemented.');
}
