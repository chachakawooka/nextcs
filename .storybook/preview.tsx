import React from "react";
import { Grommet, Box } from "grommet";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { theme } from "../src/styles/theme";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graph",
  cache: new InMemoryCache(),
});

export const parameters = {
  controls: { expanded: true },
};
export const decorators = [
  (storyFn) => (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <Box pad="xlarge" background="dark-1">
          {storyFn()}
        </Box>
      </Grommet>
    </ApolloProvider>
  ),
];
