const {ethers } = require("hardhat");
require ("dotenv").config({path: ".env"})

async function main() {
    const NewFeedback = await hre.ethers.deployContract("Feedback");
    await NewFeedback.waitForDeployment();

    console.log(`Verify address contract is deployed at ${NewFeedback.target}`);

    //await hre.run("verify:verify", { address: NewFeedback.target});
}

main().catch((error) => {console.error(error);
process.exitCode =1;
});