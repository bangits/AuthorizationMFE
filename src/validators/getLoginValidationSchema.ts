import { LoginViewModel } from '@/view/models';
import { regexLibrary, UseValidationTranslationReturnValue } from '@atom/common';
import { object, SchemaOf, string } from 'yup';

export const getLoginValidationSchema = async (
  t: UseValidationTranslationReturnValue
): Promise<SchemaOf<Omit<LoginViewModel, 'returnUrl'>>> => {
  return object({
    email: string().email(t.email()).min(3, t.max(6)).max(300, t.max(300)).required(t.required()),
    password: string()
      .min(8, t.min(8))
      .max(55, t.max(55))
      .required(t.required())
      .matches(regexLibrary.PASSWORD_INPUT, t.password())
  });
};
