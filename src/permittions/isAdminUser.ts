import { ProjectsEnum } from '@atom/common';
import { ParseIdTokenResponseModel } from '@atom/user-management';

export const isAdminUser = (user: ParseIdTokenResponseModel) => [ProjectsEnum.Bangits].includes(user.projectId);
