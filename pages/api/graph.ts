import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  TransactionListTypeDefs,
  TransactionListResolvers,
} from "../../utils/thrift-endpoints";

const schema = makeExecutableSchema({
  typeDefs: [TransactionListTypeDefs],
  resolvers: merge(TransactionListResolvers),
});

const apolloServer: ApolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
