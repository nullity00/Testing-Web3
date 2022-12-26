import { useState } from "react";
import useSnapshot from "../../Services/Snapshot/useSnapshot";

export default function SnapShot() {
  const [proposal, setProposal] = useState<string>("");
  const { createProposal, castVote, calculateScores } = useSnapshot();
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Snapshot</h1>
      <p>
        Snapshot is a protocol for creating and voting on proposals. It is a
        decentralized alternative to traditional governance systems.
      </p>
      <button
        onClick={async () => {
          const res: any = await createProposal();
          setProposal(res.id);
        }}
      >
        Create Proposal
      </button>
      {/* <button onClick={castVote}>Cast Vote</button>
      <button onClick={calculateScores}>Calculate Scores</button> */}
    </div>
  );
}
