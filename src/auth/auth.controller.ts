import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { InputUserAuth } from 'src/users/dto/users.input';
import { UserAuth } from 'src/users/dto/users.reponse';

@ApiTags('Authentication')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: "Locally Login." })
  @ApiBody({ type: InputUserAuth, description: 'Username & Password for logging in.' })
  @Post('login')
  @ApiResponse({ status: 201, description: 'Successfully logged in.', type: [UserAuth] })
  async login(@Body() login: InputUserAuth) {
    return this.authService.validateUser(login.username, login.password);
  }
}