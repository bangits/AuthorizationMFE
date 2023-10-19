import { ParseIdTokenResponseModel } from '@/domain/models';
import { ProjectsEnum } from '@atom/common';

export const isBetShopUser = (user: ParseIdTokenResponseModel) => [ProjectsEnum.Kingbet].includes(user.projectId);
