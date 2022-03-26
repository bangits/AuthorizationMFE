import { containerInstance, DI_CONSTANTS } from '@/di';
import { UserService } from '@/services';
import { useLoading } from '@atom/common';
import { ParseIdTokenResponseModel } from '@atom/user-management';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedContext } from './AuthenticatedContext';

let wasCalledGetUserBefore = false;

export const AuthenticatedProvider: FC = ({ children }) => {
  const [user, setUser] = useState<ParseIdTokenResponseModel>(null);
  const [userService, setUserService] = useState<UserService>(null);

  const changeLoading = useLoading();

  useEffect(() => {
    containerInstance.configure();

    const userService = containerInstance.diContainer.get<UserService>(DI_CONSTANTS.UserService);

    setUserService(userService);

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
