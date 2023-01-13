const lighthouse = require("@lighthouse-web3/sdk");
import { ethers } from "ethers";
import {
  AccessControl,
  EncryptionKey,
  Output,
  ShareFileResponse,
} from "../../types/lighthouse";

export default function useLighthouse() {
  const encryptionSignature = async () => {
    const window: any = globalThis;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const progressCallback = (progressData: any) => {
    console.log(progressData);
  };

  const deployEncrypted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    apikey?: string
  ) => {
    const sig = await encryptionSignature();
    const response: Output = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      apikey || process.env.LIGHTHOUSE_API_KEY,
      sig.signedMessage,
      progressCallback
    );
    return response;
  };

  const deploy = async (
    e: React.ChangeEvent<HTMLInputElement>,
    apikey?: string
  ) => {
    const output: Output = await lighthouse.upload(
      e,
      apikey || process.env.LIGHTHOUSE_API_KEY,
      progressCallback
    );
    return output;
  };

  const decrypt = async (cid: string) => {
    // Fetch file encryption key
    const { publicKey, signedMessage } = await encryptionSignature();
    console.log(signedMessage);
    const keyObject: EncryptionKey = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of file to decrypt
          key: key to decrypt file
          mimeType: default null, mime type of file
    */
    const fileType = "image/jpeg";
    const decrypted: Blob = await lighthouse.decryptFile(
      cid,
      keyObject.data.key,
      fileType
    );

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    return url;
  };

  const shareFile = async (cid: string, publicKeyUserB: string[]) => {
    // Note: message should be signed by owner of file.
    const { publicKey, signedMessage } = await encryptionSignature();

    const res: ShareFileResponse = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );
    return res;
  };

  const accessControl = async (cid: string) => {
    try {
      // Conditions to add
      const conditions = [
        {
          id: 1,
          chain: "Optimism",
          method: "getBlockNumber",
          standardContractType: "",
          returnValueTest: {
            comparator: ">=",
            value: "13349",
          },
        },
      ];

      const aggregator = "([1])";

      const { signedMessage, publicKey } = await encryptionSignature();
      /*
        accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
          Parameters:
            publicKey: owners public key
            CID: CID of file to decrypt
            signedMessage: message signed by owner of publicKey
            conditions: should be in format like above
            aggregator: aggregator to apply on conditions, in this example we used and
      */
      const response: AccessControl = await lighthouse.accessCondition(
        publicKey,
        cid,
        signedMessage,
        conditions,
        aggregator
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getfileEncryptionKey = async (cid: string) => {
    try {
      // Get key back after passing access control condition
      const { signedMessage, publicKey } = await encryptionSignature();
      const key: EncryptionKey = await lighthouse.fetchEncryptionKey(
        cid,
        publicKey,
        signedMessage
      );
      return key;
    } catch (error) {
      console.log(error);
    }
  };

  const revokeAccess = async (cid: string, publicKeyUserB: string) => {
    try {
      const { signedMessage, publicKey } = await encryptionSignature();

      const revokeResponse = await lighthouse.revokeFileAccess(
        publicKey,
        publicKeyUserB,
        cid,
        signedMessage
      );
      return revokeResponse;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    deployEncrypted,
    deploy,
    decrypt,
    shareFile,
    accessControl,
    getfileEncryptionKey,
    revokeAccess,
  };
}
