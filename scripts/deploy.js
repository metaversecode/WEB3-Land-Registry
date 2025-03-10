async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    const landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();
  
    console.log("LandRegistry deployed to:", landRegistry.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  