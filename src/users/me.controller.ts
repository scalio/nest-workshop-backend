import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './utils/user.decorator';
import { UserEntity } from './entities/user.entity';
import { BuildByIdDto } from './dto/build-by-id.dto';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  findMe(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Post('buildings')
  async buildById(@User() user: UserEntity, @Body() { id }: BuildByIdDto) {
    await this.meService.buildById(user, id);
  }
}
