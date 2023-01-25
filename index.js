import Bundlr from "@bundlr-network/client";
import fs from "fs";

const private_key =
  "2de51c96959633b400d5fab4ffbcf5c0e6bc88a81d9ce769ee97537f43f1e7f9";

const bundlr = new Bundlr.default(
  "https://devnet.bundlr.network",
  "matic",
  private_key,
  {
    providerUrl: "https://rpc-mumbai.matic.today",
  }
);

const pathToFile = "./upload.png";
const pathToFolder = "./folder";
const dataToUpload = "Hello World.";

async function main() {
  try {
    console.log(`wallet address = ${bundlr.address}`);

    const balance = await getBalance();
    const converted = await convert(balance);

    // const { size } = await fs.promises.stat(pathToFile);
    // const price = await getPrice(size);

    // await addBalance(30000000000000000);

    // const res = await uploadFile(pathToFile);
    // console.log(res);

    // const res = await uploadData(dataToUpload);
    // console.log(res);

    // const res = await uploadFolder(pathToFolder);
    // console.log(res);

    // await withdraw(price);
  } catch (err) {
    console.error(err);
  }
}

async function uploadFile(path) {
  const res = await bundlr.uploadFile(path);
  console.log(`${pathToFile} --> Uploaded to https://arweave.net/${res.id}`);
  return res;
}

async function uploadFolder(path) {
  const res = await bundlr.uploadFolder(path, {
    indexFile: "", // optional index file (file the user will load when accessing the manifest)
    batchSize: 50, //number of items to upload at once
    keepDeleted: false, // whether to keep now deleted items from previous uploads
  });
  console.log(`Files uploaded. Manifest Id ${response.id}`);
  return res;
}

async function uploadData(data) {
  const res = await bundlr.upload(data);
  console.log(`${pathToFile} --> Uploaded to https://arweave.net/${res.id}`);
  return res;
}

async function getBalance() {
  let atomicBalance = await bundlr.getLoadedBalance();
  console.log(`node balance (atomic units) = ${atomicBalance}`);

  return atomicBalance;
}

async function addBalance(amount) {
  const res = await bundlr.fund(amount);
  console.log(`Balance Added ${res}`);
}

async function getPrice(size) {
  const price = await bundlr.getPrice(size);
  console.log(`Price for size ${size} upload = ${price}`);
  return price;
}

async function convert(amount) {
  let convertedBalance = bundlr.utils.unitConverter(amount);
  console.log(`node balance (converted) = ${convertedBalance}`);

  return convertedBalance;
}

// async function convertRev(amount) {
//   let convertedBalance = bundlr.utils.unitConverter(amount);
//   console.log(`node balance (converted) = ${convertedBalance}`);

//   return convertedBalance;
// }

async function withdraw(amount) {
  let response = await bundlr.withdrawBalance(amount);
  console.log(
    `Funds withdrawn txID=${response.data.tx_id} amount requested=${response.data.requested}`
  );
}

main();
