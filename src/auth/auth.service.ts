import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserAuth, UserRO } from '../users/dto/users.reponse';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<UserAuth | null> {
    const user = await this.usersService.login(username, password);
    if (user) {
      const confidential = this.createToken(user)
      return { ...user, ...confidential } as UserAuth;
    }
    return null;
  }

  createToken(user: UserRO): { expiresIn: number; accessToken: string; } {
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