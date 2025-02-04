import { UserController } from "./user.controller";
import type {
  CreateUserArgs,
  DeleteUserArgs,
  GetUserByIdArgs,
  UpdateUserArgs,
} from "./user.model";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return UserController.getUsers();
    },
    getUserById: async (_parent: unknown, args: GetUserByIdArgs) => {
      const id = args.id;
      return UserController.getUserById(id);
    },
  },
  Mutation: {
    createUser: async (_parent: unknown, args: CreateUserArgs) => {
      const { name, age, isMarried } = args;
      return UserController.createUser(name, age, isMarried);
    },
    updateUser: (_parent: unknown, args: UpdateUserArgs) => {
      // let updatedUser: User | undefined = undefined;
      const { id, name, age, isMarried } = args;
      return UserController.updateUser(id, name, age, isMarried);
    },
    deleteUser: (_parent: unknown, args: DeleteUserArgs) => {
      const { id } = args;
      return UserController.deleteUser(id);
    },
  },
};
