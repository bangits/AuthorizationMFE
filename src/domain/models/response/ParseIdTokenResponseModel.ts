import { PrimaryKey } from '@atom/common';

export class ParseIdTokenResponseModel {
  userId: PrimaryKey;
  currencyId: PrimaryKey;
  currencyName: string;
  currencyCode: PrimaryKey;
  email: string;
  languageName: string;
  projectId: number;
  lastName: string;
  firstName: string;
}
