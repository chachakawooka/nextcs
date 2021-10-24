import type { NextPage } from "next";
import { Markdown, Box } from "grommet";
import styled from "styled-components";

import { Main } from "grommet";
/*@ts-ignore*/
import README from "../../README.md";

const P = styled.p``;
const Pre = styled.pre`
  code {
    background-color: #7d4cdb;
    padding: 1rem;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Main>
        <Box align="center" pad="large">
          <Markdown components={{ p: P, pre: Pre }}>{README}</Markdown>
        </Box>
      </Main>
    </>
  );
};

export default Home;
