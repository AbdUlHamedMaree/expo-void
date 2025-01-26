import type { ListItem } from '$components/inputs/dropdown/types';
import { UserRoleEnum } from '$models/user-role';

export const userRoles: ListItem[] = [
  {
    label: 'User',
    value: UserRoleEnum.user,
  },
  {
    label: 'Driver',
    value: UserRoleEnum.driver,
  },
];
