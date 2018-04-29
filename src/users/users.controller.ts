import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<UserEntity> {
    return await this.usersService.findOne({ id });
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() userDto: CreateUserDto): Promise<void> {
    await this.usersService.create(userDto);
  }
}
