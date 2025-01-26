export enum UserRoleEnum {
  user = 'user',
  driver = 'driver',
}

export type UserRoleUnion = keyof typeof UserRoleEnum;
