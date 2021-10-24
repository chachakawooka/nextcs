This is a [Next.js](https://nextjs.org/) starter for the [Credits Blockchain](https://www.credits.com)

## WHY

For technology to be widely adopted there needs to be a developer friendly eco system. Thrift is a remarkable technology but its not something widely used in the web dev community as they opt for GraphQL / Rest APIs so is a hurdle for adoption

This project aims to achieve adoption of the [Credits Blockchain](https://www.credits.com) by the creation of Graph APIs that transact with the blockchain and combine it with NextJS for ease of developers making great experiences and apps.

## Features

- GraphQL API for sending and recieving data onto the credits blockchain
  - checkout the [graphql playground](https://nextcs.vercel.app/api/graph)
- Prebuilt components
  - [transaction lists](/transactions)
- Prebuilt Page
  - view a transaction
- Storybook for testing components
- Grommet Components for UI/UX

### To Do

- Send Transaction
- Send Smart Contract Transaction
- Smart Contract Deployment

## Getting Started

### Create your project

```
yarn create next-app [project-name] -e https://github.com/chachakawooka/nextcs
```

### Configuring Nodes

You will need define what blockchain nodes are being called depending if you wish to use the test/live net.

You can configure what nodes you want the thrift API to speak to in _utils/thrift-endpoints/client.ts_ the client will connect on a random basis.

```
const clients = ["165.22.212.253", "167.86.117.212", "65.21.204.48"];
```

### Start Developing

run the next js app and api

```
yarn dev
```

checkout the stories

```
yarn storybook
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
