import Head from "next/head";
import Lighthouse from "../app/Modules/Lighthouse";

export default function Snapshot() {
  return (
    <>
      <Head>
        <title>Dumbo Tests Web3 - Lighthouse</title>
        <meta name="description" content="Testing Web3 - Snapshot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Lighthouse />
      </main>
    </>
  );
}
