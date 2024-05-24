import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserAuthDto } from './dto/user-auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post()
  create(@Body() userAuthDto: UserAuthDto) {
    return this.authService.login(userAuthDto);
  }
}
