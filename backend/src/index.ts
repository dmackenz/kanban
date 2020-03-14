import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BoardResolver } from "./resolvers/BoardResolver";
import { SwimlaneResolver } from "./resolvers/SwimlaneResolver";
import { TaskResolver } from "./resolvers/TaskResolver";

(async () => {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [BoardResolver, SwimlaneResolver, TaskResolver]
  });
  const server = new ApolloServer({ schema });
  const port = 4000;
  await server.listen(port);
  console.log(`Server has started on port ${port}!`);
})();
