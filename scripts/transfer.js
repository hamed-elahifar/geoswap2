// -------------------- بسم الله الرحمن الرحيم -------------------- //
console.clear();
const path = require("path");
const configFile = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
require("dotenv").config({ path: configFile });

const { ethers } = require("hardhat");

const sleepDuration = 10000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const to = "0x2AA9EA82AD7aC507401c652086584aE729A24C6D";
const amount = 1_000;

const transfer = async (contractPath, address) => {
  const contract = await ethers.getContractAt(contractPath, address);
  const receipt = await contract.transfer(to, BigInt(amount * 10e18));
  await receipt.wait();
  console.log(
    `Transfer ${contractPath} (${amount}) successful: ${receipt.hash}`
  );
  console.log();
};

const main = async () => {
  await transfer("WETH", process.env.WETH);
  await transfer("A", process.env.A);
  await transfer("B", process.env.B);
  await transfer("C", process.env.C);
  await transfer("DAI", process.env.DAI);
  await transfer("USDC", process.env.USDC);
  await transfer("USDT", process.env.USDT);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
