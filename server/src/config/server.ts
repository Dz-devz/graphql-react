import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolversProduct } from "../module/product/product.resolver";
import { productTypeDefs } from "../module/product/product.schema";
import { resolvers } from "../module/user/user.resolver";
import { typeDefs } from "../module/user/user.schema";

const server = new ApolloServer({
  typeDefs: [typeDefs, productTypeDefs],
  resolvers: [resolvers, resolversProduct],
});

export const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server running at: ${url}`);
};

startServer().catch((error) => {
  console.error("Error starting server", error);
});
