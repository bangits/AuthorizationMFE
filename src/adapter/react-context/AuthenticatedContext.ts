import { ParseIdTokenResponseModel } from '@/domain/models';
import { createContext } from 'react';

export interface IAuthenticatedContext {
  user: ParseIdTokenResponseModel;
  updateUserInfo: (updatedInfo: Partial<ParseIdTokenResponseModel>) => void;
  userRefetch: (forceFetch?: boolean) => Promise<void>;
}

export const AuthenticatedContext = createContext<IAuthenticatedContext>(null);
