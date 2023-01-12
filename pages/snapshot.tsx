import Head from "next/head";
import SnapShot from "../app/Modules/Snapshot";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function Snapshot() {
  const client = new ApolloClient({
    uri: "https://testnet.snapshot.org/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Head>
        <title>Dumbo Tests Web3 - Snapshot</title>
        <meta name="description" content="Testing Web3 - Snapshot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ApolloProvider client={client}>
          <SnapShot />
        </ApolloProvider>
      </main>
    </>
  );
}
