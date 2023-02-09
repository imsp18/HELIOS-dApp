import { Web3Storage } from "web3.storage";

const web3storage_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc4YTdGNDA2MjY2MjBCNWM5ZjU3NzBDNEMwQ0ZDZDM2ZTZGMmFkNkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ2NTIyMTYwODEsIm5hbWUiOiJzdG9yYWdlLWRhcHAifQ.xmNitDU3CKE9SN0lEpdgFl5R82v8P0-sool61DULXFI";

function GetAccessToken() {
  return web3storage_key;
}

function MakeStorageClient() {
  return new Web3Storage({ token: GetAccessToken() });
}

export const StoreContent = async (files) => {
  console.log("Uploading files to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put([files]);
  console.log("Stored files with cid:", cid);
  return cid;
};
