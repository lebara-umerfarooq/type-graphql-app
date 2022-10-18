import { makeExecutableSchema } from "@graphql-tools/schema";
import { stitchSchemas } from "@graphql-tools/stitch";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import "reflect-metadata";
import { createSchema } from "./utils/createSchema";
import express = require("express");

async function main() {
  const schema = await createSchema();

  // Construct a schema, using GraphQL schema language
  const helloSchema = buildSchema(`
      type Query {
        hello(name: String): String
      }
    `);

  const resolvers = {
    Query: {
      hello: (_, { name }, req) => {
        console.log(name, req.headers);
        return "Hello " + name;
      },
    },
  };

  const execSchema = makeExecutableSchema({
    typeDefs: helloSchema,
    resolvers,
  });

  const app = express();
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: stitchSchemas({ subschemas: [schema, execSchema] }),
      graphiql: true,
    }),
  );
  app.listen(4000);
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
}
main().catch((err) => console.error(err));
