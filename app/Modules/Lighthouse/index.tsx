import { useState } from "react";
import useLighthouse from "../../Services/Lighthouse/useLighthouse";
import { Output } from "../../types/lighthouse";

function Lighthouse() {
  const [apikey, setApiKey] = useState<string>("");
  const [encryptedFile, setEncryptedFile] = useState<Output>();
  const [cid, setcid] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const { deployEncrypted, deploy, decrypt, shareFile } = useLighthouse();
  /*Visit: 
        https://files.lighthouse.storage/viewFile/<cid>  
      To view encrypted file
    */

  return (
    <div
      style={{
        margin: "3rem",
      }}
    >
      <h1>Lighthouse</h1>
      <p>
        Lighthouse is a perpetual file storage protocol that allows the ability
        to pay once for your files and store them forever.
      </p>
      <a
        href="https://docs.lighthouse.storage/lighthouse-1/"
        target={"_blank"}
        rel="noreferrer"
      >
        https://docs.lighthouse.storage/lighthouse-1/
      </a>
      <div
        className="vertical"
        style={{
          marginTop: "2rem",
        }}
      >
        <label>Lighthouse API Key</label>
        <input onChange={(e) => setApiKey(e.target.value)} type="text" />
        <label>Upload encrypted file</label>
        <input
          onChange={async (e) => {
            if (e.target.files?.length === 0) return;
            const res = await deployEncrypted(e, apikey);
            console.log(res);
            setEncryptedFile(res);
          }}
          type="file"
        />
        {encryptedFile?.data.Hash && (
          <div className="vertical">
            <p>Hash - {encryptedFile.data.Hash} </p>
            <p>Name - {encryptedFile.data.Name} </p>
            <p>Size - {encryptedFile.data.Size} </p>
          </div>
        )}
        <input
          placeholder="Enter CID"
          onChange={async (e) => {
            setcid(e.target.value);
          }}
          type="text"
        />
        <button
          onClick={async () => {
            await decrypt(cid);
          }}
        >
          Decrypt file
        </button>
        <div className="horizontal">
          <input
            placeholder="Enter CID"
            onChange={async (e) => {
              setcid(e.target.value);
            }}
            type="text"
          />
          <input
            placeholder="Enter Address to share with"
            onChange={async (e) => {
              setUserAddress(e.target.value);
            }}
            type="text"
          />
        </div>

        <button
          onClick={async () => {
            await shareFile(cid, [userAddress]);
          }}
        >
          Share file
        </button>
        <label>Upload file</label>
        <input
          onChange={async (e) => {
            if (e.target.files?.length === 0) return;
            await deploy(e, apikey);
          }}
          type="file"
        />
      </div>
    </div>
  );
}

export default Lighthouse;
