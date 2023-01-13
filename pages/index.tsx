import { matchSorter } from "match-sorter";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { protocols } from "./[protocol]";

export default function Home() {
  const [protocolsArray, setProtocolsArray] = useState<any[]>(
    Object.values(protocols)
  );
  return (
    <>
      <Head>
        <title>Dumbo Tests Web3</title>
        <meta name="description" content="Testing Web3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div id="homepage">
          <h1 className="heading">Testing Web3</h1>
          <input
            placeholder="Search"
            onChange={(e) => {
              setProtocolsArray(
                matchSorter(protocolsArray, e.target.value, {
                  keys: ["title"],
                })
              );
              if (e.target.value === "")
                setProtocolsArray(Object.values(protocols));
            }}
            style={{
              width: "60%",
              fontSize: "1.2rem",
              padding: "0.5rem",
              textAlign: "center",
            }}
          />
          {protocolsArray?.map((protocol) => {
            return (
              <Link href={protocol.href} key={protocol.href}>
                {protocol.title}
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
