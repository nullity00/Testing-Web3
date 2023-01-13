import Head from "next/head";
import Link from "next/link";

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
        <Link href={"/snapshot"}>Snapshot</Link>
        <Link href={"/lighthouse"}>Lighthouse</Link>
      </main>
    </>
  );
}
