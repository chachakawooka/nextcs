import React from "react";
import { Grommet } from "grommet";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graph",
  cache: new InMemoryCache(),
});

const theme = {
  global: {},
};

export const parameters = {
  controls: { expanded: true },
};
export const decorators = [
  (storyFn) => (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>{storyFn()}</Grommet>
    </ApolloProvider>
  ),
];
