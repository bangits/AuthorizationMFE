import { LOCAL_STORAGE_CONSTANTS } from '@/configs';
import { containerInstance, DI_CONSTANTS } from '@/di';
import { AuthUseCase } from '@/domain/use-case';
import { ROUTES } from '@/view/constants';
import { HttpService, SocketService, StorageService, Subscribable } from '@atom/common';
import { ParseIdTokenResponseModel } from '@atom/user-management';
import { inject, injectable } from 'inversify';

@injectable()
export class UserService extends Subscribable<ParseIdTokenResponseModel> {
  @inject(DI_CONSTANTS.LocalStorageService)
  private readonly localStorageService: StorageService;

  public user: ParseIdTokenResponseModel = null;

  subscribeForUpdate = (cb: (msg: ParseIdTokenResponseModel) => void) => {
    this.subscribe(cb);

    if (this.user) cb(this.user);
  };

  getUser = async () => {
    if (this.user) {
      this.publish(this.user);

      return;
    }

    const idToken = this.localStorageService.getItem<string>(LOCAL_STORAGE_CONSTANTS.USER_ACCESS_TOKEN);

    const logOutCb = () => {
      this.localStorageService.removeItem(LOCAL_STORAGE_CONSTANTS.USER_ACCESS_TOKEN);
      this.localStorageService.removeItem(LOCAL_STORAGE_CONSTANTS.IS_CHANGE_PASSWORD_SKIPPED);

      window.location.replace(ROUTES.baseUrl + ROUTES.loginUrl);
    };

    if (!idToken) return logOutCb();

    HttpService.setAccessToken(idToken);
    SocketService.setAccessToken?.(idToken);

    HttpService.setLogoutCb(logOutCb);

    const authUseCase = containerInstance.diContainer.get<AuthUseCase>(DI_CONSTANTS.AuthUseCase);

    const user = await authUseCase.parseIdToken(idToken);

    HttpService.setProjectId(user.projectId);

    this.user = user;

    this.publish(user);
  };
}
