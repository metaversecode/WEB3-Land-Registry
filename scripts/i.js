const { ethers } = require("hardhat");
const crypto = require("crypto");

// Function to generate hash from land details
function generateLandHash(owner, length, width, insurance, add) {
  const landData = JSON.stringify({ owner, length, width, insurance , add});
  return crypto.createHash("sha256").update(landData).digest("hex");
}

async function main() {
  // Replace with your deployed contract address from deploy.js output
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Attach to the deployed LandRegistry contract
  const LandRegistry = await ethers.getContractFactory("LandRegistry");
  const landRegistry = LandRegistry.attach(contractAddress);

  // Define your land details
  const ownerName = "John Doe";
  const length = 100;
  const width = 50;
  const insurance = "Active";
  const add = "patna"

  // Generate the land hash
  const landHash = generateLandHash(ownerName, length, width, insurance,add);
  console.log("Generated Land Hash:", landHash);

  // Register the land hash on the blockchain
  console.log("Registering land...");
  const tx = await landRegistry.registerLand(landHash);
  await tx.wait();
  console.log("Land registered successfully!");

  // Retrieve the registered owner's address using the land hash
  const registeredOwner = await landRegistry.verifyLand(landHash);
  console.log("Registered Owner Address:", registeredOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
