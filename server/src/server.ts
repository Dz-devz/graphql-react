import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type User = {
  id: string;
  name: string;
  age: number;
  isMarried: boolean;
};

const users = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    isMarried: true,
  },
  {
    id: "2",
    name: "Jane Reyes",
    age: 29,
    isMarried: false,
  },
  {
    id: "3",
    name: "Alice Wonderland",
    age: 25,
    isMarried: false,
  },
];

type GetUserByIdArgs = {
  id: string;
};

type CreateUserArgs = {
  name: string;
  age: number;
  isMarried: boolean;
};

type DeleteUserArgs = {
  id: string;
};

type UpdateUserArgs = {
  id: string;
  name?: string;
  age?: number;
  isMarried?: boolean;
};

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
    updateUser(id: ID!, name: String!, age: Int!, isMarried: Boolean!): User
    deleteUser(id: ID!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (
      _parent: unknown,
      args: GetUserByIdArgs
    ): User | undefined => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (_parent: unknown, args: CreateUserArgs): User => {
      const newUser: User = {
        id: (users.length + 1).toString(),
        ...args,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_parent: unknown, args: UpdateUserArgs): User => {
      // let updatedUser: User | undefined = undefined;
      const { id, name, age, isMarried } = args;
      let userUpdate: User | undefined;

      users.forEach((user) => {
        if (user.id === id) {
          if (name !== undefined) user.name = name;
          if (age !== undefined) user.age = age;
          if (isMarried !== undefined) user.isMarried = isMarried;
          userUpdate = user;
        }
      });

      if (!userUpdate) {
        throw new Error(`User with id ${id} not found`);
      }
      return userUpdate;
    },
    deleteUser: (_parent: unknown, args: DeleteUserArgs): User => {
      const { id } = args;

      const index = users.findIndex((user) => user.id === id);
      console.log();

      const userDeleted = users.splice(index, 1)[0];

      return userDeleted;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running in port: ${url}`);
