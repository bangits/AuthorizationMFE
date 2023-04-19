import { ProjectsEnum } from '@atom/common';
import { ParseIdTokenResponseModel } from '@atom/user-management';

export const isBetShopUser = (user: ParseIdTokenResponseModel) => [ProjectsEnum.Kingbet].includes(user.projectId);
