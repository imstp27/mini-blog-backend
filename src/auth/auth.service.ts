import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/models/users.model';
import { UserAuth, UserRO } from 'src/users/dto/users.reponse';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<UserAuth | null> {
    const user = await this.usersService.login(username, password);
    if (user) return { ...user, ...this.createToken(user) };
    return null;
  }

  createToken(user: UserRO) {
    const expiresIn = 3600;

    const accessToken = this.jwtService.sign(
      {
        id: user._id,
        username: user.username,
      },
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }
}