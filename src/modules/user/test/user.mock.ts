import { randomUUID } from 'crypto';

export const mockCreateUserParams = {
  email: 'topEmail@gmail.com',
  name: 'eae man',
  password: '2',
};
export const userMock = {
  ...mockCreateUserParams,
  id: randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
};

export const updateUser = () => {
  return {
    id: randomUUID(),
    email: 'topEmail@gmail.com',
    name: 'Opa man',
  };
};
