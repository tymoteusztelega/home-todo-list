import { Controller, Post, Body, Get } from '@nestjs/common';
import IUser from './authentication.interface';
import { AuthenticationService } from './authentication.service';

@Controller('/api/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/create')
  async createUser(@Body() user: IUser): Promise<firebase.auth.UserCredential> {
    return this.authenticationService.createUser(user);
  }

  @Post('/login')
  async login(@Body() user: IUser): Promise<firebase.auth.UserCredential> {
    return await this.authenticationService.loginWithCredentials(user);
  }

  @Get('/logout')
  async logout(): Promise<void> {
    return this.authenticationService.logout();
  }

  @Get('/current-user')
  getCurrentUser(): firebase.User {
    return this.authenticationService.getCurrentUser();
  }
}
