export default interface IUser {
  email: string;
  password: string;
}

export interface IUserProfile {
  email: string;
  name: string;
}

export interface IError {
  message?: string;
  stackTrace?: string;
}
