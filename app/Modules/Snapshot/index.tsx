import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import useSnapshot from "../../Services/Snapshot/useSnapshot";

const Space = gql`
  query Space($id: String!) {
    space(id: $id) {
      id
      name
      about
      network
      symbol
      members
    }
  }
`;

const Proposal = gql`
  query Proposal($proposal: String!) {
    proposal(id: $proposal) {
      id
      title
      end
      snapshot
      state
      scores
      scores_by_strategy
      scores_total
    }
  }
`;

export default function SnapShot() {
  const [proposal, setProposal] = useState<string>("");
  const [prop, setProp] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [snapshotSpace, setSnapshotSpace] = useState<string>("");
  const { createProposal, castVote, calculateScores } = useSnapshot();

  const { loading: isLoading, data } = useQuery(Space, {
    variables: { id: snapshotSpace },
  });

  const { data: proposalData } = useQuery(Proposal, {
    variables: { proposal: prop },
  });

  return (
    <div style={{ margin: "2rem" }}>
      <h1>Snapshot</h1>
      <p>
        Snapshot is a protocol for creating and voting on proposals. It is a
        decentralized alternative to traditional governance systems.
      </p>
      <a href="https://demo.snapshot.org" target={"_blank"} rel="noreferrer">
        https://demo.snapshot.org
      </a>
      <div
        className="horizontal"
        style={{
          marginTop: "2rem",
          justifyContent: "space-between",
        }}
      >
        <div className="horizontal">
          <div className="vertical">
            <label>Snapshot Space</label>
            <input
              width={"fit-content"}
              type="text"
              value={snapshotSpace}
              placeholder="dumbo.eth"
              prefix="https://demo.snapshot.org/#/"
              onChange={(e) => {
                setSnapshotSpace(e.target.value);
              }}
            />
            {snapshotSpace &&
              !isLoading &&
              (data?.space?.id ? (
                <p style={{ color: "palegreen" }}>
                  Snapshot Space - {data?.space?.name}
                </p>
              ) : (
                <p style={{ color: "red" }}>Incorrect URL</p>
              ))}
          </div>

          <div className="vertical">
            <label>Proposal Title</label>
            <input
              width={"fit-content"}
              type="text"
              value={title}
              placeholder="Proposal 1"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Snapshot proposal </label>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                const res: any = await createProposal(
                  snapshotSpace,
                  title,
                  content,
                  data?.space?.network
                );
                setProposal(res.id);
              }}
              disabled={!snapshotSpace || !title || !content}
              style={{
                padding: "0.7rem",
                cursor: "pointer",
              }}
            >
              Create Proposal
            </button>
          </div>
        </div>

        {proposal && (
          <div className="vertical">
            <p>Proposal Created </p>
            <a
              href={`https://demo.snapshot.org/#/${snapshotSpace}/proposal/${proposal}`}
              style={{
                textDecoration: "underline",
                color: "palegreen",
              }}
            >
              Go to snapshot
            </a>
            <div className="horizontal">
              <button
                onClick={() => {
                  castVote(snapshotSpace, proposal, 1);
                }}
              >
                YES
              </button>
              <button
                onClick={() => {
                  castVote(snapshotSpace, proposal, 2);
                }}
              >
                NO
              </button>
            </div>
          </div>
        )}
        <div className="vertical">
          <label>Load any Proposal</label>
          <input
            onChange={(e) => {
              setProp(e.target.value);
            }}
          />
          {proposalData?.proposal?.id && (
            <div>
              <p>Title - {proposalData.proposal.title} </p>
              <p>State - {proposalData.proposal.state} </p>
              <p>Snapshot - {proposalData.proposal.snapshot} </p>
              <p>
                Scores by strategy -{" "}
                {proposalData.proposal.scores_by_strategy.map(
                  (strategy: string) => {
                    return <p key={strategy}>{strategy}</p>;
                  }
                )}{" "}
              </p>
              <p>Scores total - {proposalData.proposal.scores_total} </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
