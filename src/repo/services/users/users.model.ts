import { Record } from 'immutable';

interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const ValidateCreateUserDTO = Record<CreateUserDTO>({
  firstName: 'unknown',
  lastName: 'unknown',
  username: 'unknown',
  password: 'unknown',
});

interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
}

export { CreateUserDTO, UpdateUserDTO, ValidateCreateUserDTO };
