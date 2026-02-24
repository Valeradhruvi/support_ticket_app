import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/roles.guard';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('users')
@UseGuards(AccessTokenGuard, AccessLevelGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('MANAGER')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerNewAccount(createUserDto);
  }

  @Get()
  @Roles('MANAGER')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('MANAGER')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('MANAGER')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('MANAGER')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
