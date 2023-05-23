import { ApolloServer } from "@apollo/server";
import { CountryResolver } from "./resolvers/CountryResolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

const PORT = parseInt(process.env.PORT || "4000") || 4000;

const schema = await buildSchema({
  resolvers: [CountryResolver],
});

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);
