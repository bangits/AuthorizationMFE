import { containerInstance, DI_CONSTANTS } from '@/di';
import { ParseIdTokenResponseModel } from '@/domain/models';
import { UserService } from '@/services';
import { useLoading } from '@atom/common';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedContext } from './AuthenticatedContext';

let wasCalledGetUserBefore = false;

containerInstance.configure();

const userService = containerInstance.diContainer.get<UserService>(DI_CONSTANTS.UserService);

export const AuthenticatedProvider: FC = ({ children }) => {
  const [user, setUser] = useState<ParseIdTokenResponseModel>(null);

  const changeLoading = useLoading();

  useEffect(() => {
    if (!wasCalledGetUserBefore) {
      changeLoading(true);

      userService.getUser();
    }

    userService.subscribeForUpdate((user) => {
      setUser(user);

      changeLoading(false);

      wasCalledGetUserBefore = true;
    });
  }, []);

  if (!user) return null;

  return (
    <AuthenticatedContext.Provider
      value={{
        user,
        updateUserInfo: (updatedInfo: Partial<ParseIdTokenResponseModel>) => {
          const updatedUser = { ...user, ...updatedInfo };

          userService.publish(updatedUser);

          userService.user = updatedUser;
        }
      }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};
