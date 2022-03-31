const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners(); // grabbed owner and random wallet address
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal'); // compiles our contract and generates the files we need to work with our contract under the artifacts directory
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    }); // deploy our own local eth network w/ hardhat. but out script will destroy the old network and create a new one each time // we also fund with .1 eth
    await waveContract.deployed(); // wait for contract to be deployed

    console.log('Contract deployed to:', waveContract.address); // print address of deployed address
    console.log('Contract deployed by:', owner.address); // print address of owner address

    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    let waveCount;
    waveCount = await waveContract.getTotalWaves(); // get total number of waves

    const waveTxn = await waveContract.wave('This is wave #1');
    await waveTxn.wait(); // Wait for the transaction to be mined

    // const waveTxn2 = await waveContract.wave('This is wave #2');
    // await waveTxn2.wait(); // Wait for the transaction to be mined

    /*
     * Get Contract balance to see what happened!
     */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
