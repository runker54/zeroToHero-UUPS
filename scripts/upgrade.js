// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require('hardhat');
const proxyAddress = '0x64ea0eA7ed563594DB4463d70dd2CE561A2b894a';
async function main() {
    const Runkerv2 = await ethers.getContractFactory("Runker_V2");
    const proxy = await upgrades.upgradeProxy('0x64ea0eA7ed563594DB4463d70dd2CE561A2b894a', Runkerv2);
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(
        proxyAddress
    );

    console.log('Implementation contract address: ' + implementationAddress);
    console.log('Upgrade contract address: ' + proxy.address);
    console.log('Upgrade done!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
