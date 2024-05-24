import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserAuthDto } from './dto/user-auth.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async login(userAuthDto: UserAuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: userAuthDto.username,
      }
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordMatch = await bcrypt.compare(userAuthDto.password, user.password);

    if (!isPasswordMatch) {
      throw new NotFoundException('User not found')
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
        username: user.username,
      })
    };

  }
}
