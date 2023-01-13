export interface Output {
  data: { Name: string; Size: string; Hash: string };
}

export interface ShareFileResponse {
  data: { cid: string; shareTo: string };
}

export interface AccessControl {
  data: {
    cid: string;
    status: string;
  };
}

export interface EncryptionKey {
  data: {
    key: string;
  };
}

export interface RevokeResponse {
  data: {
    cid: string;
    revokeTo: string;
    status: string;
  };
}
