/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../../config/firebase.config';

const APP_NAME = 'HOME_TODO_LIST';

@Injectable()
export class FirebaseService {
  private _app: firebase.app.App;

  constructor() {
    this._app = firebase.initializeApp(firebaseConfig, APP_NAME);
  }

  public get database(): firebase.database.Database {
    return this._app.database();
  }

  public get auth(): firebase.auth.Auth {
    return this._app.auth();
  }
}
