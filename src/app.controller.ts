import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './shared/auth/guards/local-auth.guard';
import { AuthService } from './shared/auth/auth.service';
import { Request } from 'express';
import { Public } from './shared/decorator/PublicRoute.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() { user }: Request) {
    return this.authService.login(user as any);
  }

}
