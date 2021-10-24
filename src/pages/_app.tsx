import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { Grommet, Box, Anchor, Header, Footer, Text, Nav } from "grommet";
import { Money, UserManager } from "grommet-icons";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { theme } from "../styles/theme";

const client = new ApolloClient({
  uri: "api/graph",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <Header background="light-4" pad="medium" height="xsmall">
          <Anchor
            href="/"
            icon={<Money color="brand" />}
            label="NextCS - Credits Starter for Next JS"
          />
          <Nav direction="row">
            <Link href="/">Home</Link>
            <Link href="/transactions">Transactions</Link>
          </Nav>
        </Header>
        <Box pad="medium" background="dark-1">
          <Component {...pageProps} />
        </Box>
        <Footer background="light-4" pad="large">
          <Box direction="row-reverse" gap="xsmall" align="end">
            <Box align="center" gap="small">
              <UserManager color="brand" size="large" />
              <Text alignSelf="center" color="brand">
                Created by David Walsh
              </Text>
            </Box>
          </Box>
        </Footer>
      </Grommet>
    </ApolloProvider>
  );
}
export default MyApp;
