const main = async () => {
    const [deployer] = await hre.ethers.getSigners(); // grab deployer address
    const accountBalance = await deployer.getBalance(); // get account balance

    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal'); // get our main sol contract
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.001'),
    }); // wait for contract to be deployed
    await waveContract.deployed(); // wait for contract to be deployed

    console.log('WavePortal address: ', waveContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
