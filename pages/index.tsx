import Head from "next/head";
import Link from "next/link";
import { protocols } from "./[protocol]";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dumbo Tests Web3</title>
        <meta name="description" content="Testing Web3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {Object.values(protocols).map((protocol) => {
          return (
            <Link href={protocol.href} key={protocol.href}>
              {protocol.title}
            </Link>
          );
        })}
      </main>
    </>
  );
}
