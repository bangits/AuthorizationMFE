import { AuthenticatedContext } from '@/atom-authorization';
import { historyService, useTranslation } from '@atom/common';
import { alert } from '@atom/design-system';
import { useCallback, useContext, useEffect } from 'react';
import { PasswordChange } from './PasswordChange';
import { PasswordChangeTypes, userApi } from '@atom/user-management';
import { LOCAL_STORAGE_CONSTANTS } from '@/configs/constants';

export const PasswordChangeContainer = () => {
  const t = useTranslation();
  const { user, userRefetch } = useContext(AuthenticatedContext);
  const [passwordChange, { isLoading }] = userApi.useChangePasswordAfterLogicMutation();

  const onSubmit = useCallback(
    ({ newPassword, confirmNewPassword }) => {
      passwordChange({
        id: user.userId,
        newPassword,
        confirmNewPassword
      })
        .unwrap()
        .then(() => {
          alert.success({
            alertLabel: t.get('passwordChangedSuccess')
          });
          userRefetch(true).then(() => {
            return historyService.redirectToURL('/');
          });
        })
        .catch(() =>
          alert.error({
            alertLabel: t.get('errorAlertMessage')
          })
        );
    },
    [user.userId]
  );

  const onSkip = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_CONSTANTS.IS_CHANGE_PASSWORD_SKIPPED, String(true));
    historyService.redirectToURL('/');
  }, []);

  return (
    <PasswordChange
      canSkip={user.passwordChangeTypeId === PasswordChangeTypes.RECOMENDED}
      onSkip={onSkip}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
