import { LoginViewModel } from '@/models/LoginViewModel';
import { loginValidationSchema } from '@/validators/loginValidations';
// @ts-ignore
import { useTranslation } from '@atom/common';
import { SignIn as SignInComponent } from '@atom/design-system';
import { Field, Form, Formik } from 'formik';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { Spinner } from '../spiner';

export type SignInActions = {
  onSubmit: (loginViewModel: LoginViewModel) => void;
  clearErrorMessage: () => void;
};

export type SignInState = {
  isLoading: boolean;
  loginErrorMessage: string;
};

export type SignInProps = SignInActions & SignInState;

const SignIn: FC<SignInProps> = ({ onSubmit, isLoading, loginErrorMessage, clearErrorMessage }) => {
  console.log(useTranslation);
  const translation = useTranslation();

  const inputRenderer = useCallback((InputComponent, name) => {
    return (
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <InputComponent
              {...field}
              onFocus={clearErrorMessage}
              name={name}
              explanation={meta.touched && meta.error}
              color={meta.error && meta.touched ? 'danger' : ''}
            />
          );
        }}
      </Field>
    );
  }, []);

  const signInFormInitialValues = useMemo(
    () => ({
      username: '',
      password: ''
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      translation.changeLanguage('en');
    }, 5000);
  }, []);

  translation.init('ru');

  return (
    <>
      {isLoading && <Spinner />}

      <Formik initialValues={signInFormInitialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
        {() => (
          <Form noValidate>
            <SignInComponent
              usernameInputLabel={translation.get('save')}
              passwordInputLabel='password'
              title={translation.get('save')}
              subtitle='Login to manage your account'
              buttonText='Login'
              // @ts-ignore
              loginErrorMessage={loginErrorMessage}
              renderInputs={inputRenderer}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
