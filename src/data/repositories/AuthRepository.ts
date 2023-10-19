import { DI_CONSTANTS } from '@/di';
import { IAuthRepository } from '@/domain/boundaries';
import { LoginRequestModel, LoginResponseModel, ParseIdTokenResponseModel } from '@/domain/models';
import { IHttpService } from '@atom/common';
import { inject, injectable } from 'inversify';
import { API_ROUTES } from '../constants';

@injectable()
export class AuthRepository implements IAuthRepository {
  @inject('IHttpService')
  private readonly httpService: IHttpService;

  @inject(DI_CONSTANTS.UserHttpService)
  private readonly userHttpService: IHttpService;

  login = async (loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> => {
    const response = await this.httpService.post<LoginResponseModel, {}, {}>({
      url: API_ROUTES.AUTH.LOGIIN,
      body: {
        email: loginRequestModel.email,
        password: loginRequestModel.password,
        returnUrl: loginRequestModel.returnUrl
      }
    });

    return response;
  };

  logout = async (): Promise<boolean> => {
    await this.httpService.get({
      url: API_ROUTES.AUTH.LOGOUT
    });

    return true;
  };

  parseIdToken = async (idToken: string): Promise<ParseIdTokenResponseModel> => {
    return await this.userHttpService.get<ParseIdTokenResponseModel, {}>({
      url: API_ROUTES.AUTH.ID_TOKEN_PARSER
    });
  };
}
