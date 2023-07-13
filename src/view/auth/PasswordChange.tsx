import { CustomForm, useAsync, useValidationTranslation } from '@atom/common';
import { PasswordChangeAfterLogin } from '@atom/design-system';
import { PasswordField } from '@atom/user-management';
import { Form, FormikHelpers } from 'formik';
import { FC, useMemo } from 'react';
import { ChangePasswordAfterLoginViewModel } from '../models';
import { changePasswordAfterLogicValidationSchema } from '@/validators';

export type PasswordChangeProps = {
  onSubmit: (
    changePasswordAfterLoginViewModel: ChangePasswordAfterLoginViewModel,
    formikHelper: FormikHelpers<ChangePasswordAfterLoginViewModel>
  ) => void;
  onSkip?: () => void;
  isLoading: boolean;
  canSkip: boolean;
};

export const PasswordChange: FC<PasswordChangeProps> = ({ onSubmit, canSkip, onSkip, isLoading }) => {
  const validationT = useValidationTranslation();
  const validationSchema = useAsync(() => changePasswordAfterLogicValidationSchema(validationT), []);

  const initialVallues: ChangePasswordAfterLoginViewModel = useMemo(
    () => ({
      newPassword: '',
      confirmNewPassword: ''
    }),
    []
  );

  return (
    <>
      <CustomForm
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={initialVallues}>
        {() => {
          return (
            <Form noValidate>
              <PasswordChangeAfterLogin
                canSkip={canSkip}
                isLoading={isLoading}
                onSkip={() => onSkip?.()}
                passwordInput={<PasswordField fullWidth label={'newPassword'} name={'newPassword'} />}
                confirmPasswordInput={<PasswordField fullWidth label={'confirmPassword'} name={'confirmNewPassword'} />}
              />
            </Form>
          );
        }}
      </CustomForm>
    </>
  );
};
