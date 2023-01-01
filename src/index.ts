import * as dappeteer from '@chainsafe/dappeteer';
import WalletService from "./services/wallet.service";
import {
    Network,
    addNetwork,
} from "./actions/network";

const network: Network = { 
    networkName: "BSC",
    rpc: "https://bsc-dataseed1.defibit.io/",
    chainId: "56",
    symbol: "BNB"
};

async function main() {
    console.time();

    // Generate wallet
    const walletService = new WalletService();
    const wallet = await walletService.generate("Pass29292");

    const { metaMask, browser } = await dappeteer.bootstrap({
        seed: wallet.seedPhrase,
        password: "Pass29292",
        showTestNets: false,
        browser: "chrome",
    });

    await addNetwork(metaMask.page, network);

    console.timeEnd();
}

main();
