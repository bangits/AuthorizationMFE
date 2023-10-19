import { LoginRequestModel, LoginResponseModel, ParseIdTokenResponseModel } from '../models';
export interface IAuthRepository {
  login(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel>;
  parseIdToken(idToken: string): Promise<ParseIdTokenResponseModel>;
  logout(): Promise<boolean>;
}
