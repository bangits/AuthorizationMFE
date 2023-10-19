import { ChangePasswordAfterLoginViewModel } from '@/view/models';
import { regexLibrary, UseValidationTranslationReturnValue } from '@atom/common';
import { object, SchemaOf, ref, string } from 'yup';

export const changePasswordAfterLoginValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<ChangePasswordAfterLoginViewModel>> => {
  return object({
    newPassword: string()
      .min(8, t.min(8))
      .max(55, t.max(55))
      .required(t.required())
      .matches(regexLibrary.PASSWORD_INPUT, t.password()),
    confirmNewPassword: string()
      .min(8, t.min(8))
      .max(55, t.max(55))
      .required(t.required())
      .matches(regexLibrary.PASSWORD_INPUT, t.password())
      .oneOf([ref('newPassword'), null], t.passwordsDontMatch())
  });
};
