import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

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

const typeDefs = `
  type Query {
    getUsers: [User]
    getUsersById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running in port: ${url}`);
