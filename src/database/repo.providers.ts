import User from './model/user.entity';

export const repoProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
