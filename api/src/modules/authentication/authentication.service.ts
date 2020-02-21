import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../shared/services/firebase.service';
import IUser from './authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createUser(user: IUser): Promise<firebase.auth.UserCredential> {
    return this.firebaseService.auth.createUserWithEmailAndPassword(
      user.email,
      user.password,
    );
  }

  async loginWithCredentials(
    user: IUser,
  ): Promise<firebase.auth.UserCredential> {
    return this.firebaseService.auth.signInWithEmailAndPassword(
      user.email,
      user.password,
    );
  }

  async logout(): Promise<void> {
    return this.firebaseService.auth.signOut();
  }

  getCurrentUser(): firebase.User {
    return this.firebaseService.auth.currentUser;
  }
}
