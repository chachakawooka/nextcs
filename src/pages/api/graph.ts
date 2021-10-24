import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import {
  TransactionListTypeDefs,
  TransactionTypeDefs,
  TransactionListResolvers,
  TransactionResolvers,
} from "../../../utils/thrift-endpoints";

const schema = makeExecutableSchema({
  typeDefs: [TransactionListTypeDefs, TransactionTypeDefs],
  resolvers: merge(TransactionListResolvers, TransactionResolvers),
});

const apolloServer: ApolloServer = new ApolloServer({
  introspection: true,
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graph",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
