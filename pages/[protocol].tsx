import Head from "next/head";
import Lighthouse from "../app/Modules/Lighthouse";
import { useRouter } from "next/router";
import SnapShot from "../app/Modules/Snapshot";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Protocol } from "../app/types/types";

const client = new ApolloClient({
  uri: "https://testnet.snapshot.org/graphql",
  cache: new InMemoryCache(),
});

export const protocols: Protocol = {
  ["snapshot"]: {
    href: "/snapshot",
    title: "Snapshot",
    description: "Testing Web3 - Snapshot",
    component: (
      <ApolloProvider client={client}>
        <SnapShot />
      </ApolloProvider>
    ),
  },
  ["lighthouse"]: {
    href: "/lighthouse",
    title: "Lighthouse",
    description: "Testing Web3 - Lighthouse",
    component: <Lighthouse />,
  },
};

export default function ProtocolPage() {
  const router = useRouter();
  const protocol: any = router.query.protocol;

  if (Object.keys(protocols).includes(protocol)) {
    return (
      <>
        <Head>
          <title>{protocols?.[protocol].title}</title>
          <meta
            name="description"
            content={protocols?.[protocol].description}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>{protocols?.[protocol].component}</main>
      </>
    );
  }
}
