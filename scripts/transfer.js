// -------------------- بسم الله الرحمن الرحيم -------------------- //
console.clear();
const path = require("path");
const configFile = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
require("dotenv").config({ path: configFile });

const { ethers } = require("hardhat");

const sleepDuration = 10000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const to = "0x2AA9EA82AD7aC507401c652086584aE729A24C6D";

const transfer = async (contractPath, address, amount) => {
  const contract = await ethers.getContractAt(contractPath, address);
  const receipt = await contract.transfer(to, amount);
  await receipt.wait();
  console.log(`Transfer ${contractPath} successful: ${receipt.hash}`);
  console.log();
};

const main = async () => {
  await transfer("WETH", process.env.WETH, 1_000_000);
  await transfer("A", process.env.A, 1_000_000);
  await transfer("B", process.env.B, 1_000_000);
  await transfer("C", process.env.C, 1_000_000);
  await transfer("DAI", process.env.DAI, 1_000_000);
  await transfer("USDC", process.env.USDC, 1_000_000);
  await transfer("USDT", process.env.USDT, 1_000_000);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
