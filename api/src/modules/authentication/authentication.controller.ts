import { Controller, Post, Body, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import IUser, { IUserProfile, IError } from './authentication.interface';
import { AuthenticationService } from './authentication.service';

@Controller('/api/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/create')
  async createUser(@Body() user: IUser): Promise<firebase.auth.UserCredential> {
    return this.authenticationService.createUser(user);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() user: IUser): Promise<IUserProfile | IError> {
    try {
      const userCredential = await this.authenticationService.loginWithCredentials(user);
      const {
        user: { email, displayName },
      } = userCredential;
      return { email, name: displayName };
    } catch (err) {
      const { message } = err;
      const errorMessage = { message: message || 'Unexpected error occured', stackTrace: err };
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
      // return;
    }
  }

  @Get('/logout')
  async logout(): Promise<void> {
    return this.authenticationService.logout();
  }

  @Get('/current-user')
  getCurrentUser(): IUserProfile {
    const firebaseUser = this.authenticationService.getCurrentUser();
    if (Boolean(firebaseUser)) {
      const { email, displayName } = firebaseUser;
      return { email, name: displayName };
    }
    return null;
  }
}
