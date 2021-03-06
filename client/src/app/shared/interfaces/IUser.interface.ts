interface IUser {
  email: string;
}

export interface IUserLogin extends IUser {
  password: string;
}

export interface IUserProfile extends IUser {
  name?: string;
}
