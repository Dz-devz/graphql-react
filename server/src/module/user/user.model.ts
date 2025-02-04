export type User = {
  id: string;
  name: string;
  age: number;
  isMarried: boolean;
};

export type GetUserByIdArgs = {
  id: string;
};

export type CreateUserArgs = {
  name: string;
  age: number;
  isMarried: boolean;
};

export type DeleteUserArgs = {
  id: string;
};

export type UpdateUserArgs = {
  id: string;
  name?: string;
  age?: number;
  isMarried?: boolean;
};
