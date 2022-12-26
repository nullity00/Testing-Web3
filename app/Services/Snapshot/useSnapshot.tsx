import snapshot from "@snapshot-labs/snapshot.js";
import { ethers } from "ethers";

export default function useSnapshot() {
  const hub = "https://testnet.snapshot.org";
  const client = new snapshot.Client712(hub);

  const space = "dumbo.eth";

  async function createProposal() {
    const window: any = globalThis;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();

    const receipt = await client.proposal(provider, account, {
      space,
      type: "single-choice",
      title: "Test proposal 5",
      body: "This is the content of the proposal",
      choices: ["Yes", "No"],
      start: Math.floor(new Date().getTime() / 1000),
      end: Math.floor((new Date().getTime() + 7200000) / 1000),
      snapshot: 16270668,
      network: "5",
      plugins: JSON.stringify({}),
      app: "testing-web3",
    } as any);

    console.log(receipt);
    return receipt;
  }

  async function castVote(proposal: string, choice: number, reason: string) {
    const window: any = globalThis;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const receipt = await client.vote(provider, account, {
      space,
      proposal: proposal,
      type: "single-choice",
      choice: choice,
      reason: reason,
      app: "testing-web3",
    });

    console.log(receipt);
    return receipt;
  }

  async function calculateScores(voters: string[], blockNumber: number) {
    const strategies = [
      {
        name: "erc20-balance-of",
        params: {
          address: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
          symbol: "LINK",
          decimals: 18,
        },
      },
    ] as any;
    const network = "5";

    snapshot.utils
      .getScores(space, strategies, network, voters, blockNumber)
      .then((scores) => {
        console.log("Scores", scores);
        return scores;
      });
  }

  return { createProposal, castVote, calculateScores };
}
