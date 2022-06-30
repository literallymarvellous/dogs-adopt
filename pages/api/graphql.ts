import { ApolloServer } from "apollo-server-micro";
import "reflect-metadata";
import {
  buildSchema,
  Resolver,
  Query,
  Arg,
  ObjectType,
  Field,
  ID,
} from "type-graphql";
import Cors from "micro-cors";
import { DogResolver } from "../../src/schema/dogs.resolver";

const cors = Cors({
  origin: "*",
});

const schema = await buildSchema({
  resolvers: [DogResolver],
});

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
