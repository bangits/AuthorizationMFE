import { ParseIdTokenResponseModel } from '@/domain/models';
import { ProjectsEnum } from '@atom/common';

export const isAdminUser = (user: ParseIdTokenResponseModel) => [ProjectsEnum.Bangits].includes(user.projectId);
