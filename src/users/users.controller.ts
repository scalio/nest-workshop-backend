import {
  Get,
  Controller,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(+id);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() userDto: CreateUserDto): Promise<void> {
    await this.usersService.create(userDto);
  }
}
