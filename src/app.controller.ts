import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './shared/auth/guards/local-auth.guard';
import { UsersService } from './admin/users/users.service';
import { AuthService } from './shared/auth/auth.service';
import { Request } from 'express';
import { Public } from './shared/decorator/PublicRoute.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  @Public()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() { user }: Request) {
    return this.authService.login(user as any);
  }

  @Get('info/current-user')
  async getUserInfo(@Req() { user }: Request) {
     const { firstName, lastName, username } = await this.userService.getOneById((user as any).userId);

     return { firstName, lastName, username }
  }
}
