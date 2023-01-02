import * as dappeteer from "@chainsafe/dappeteer";
import WalletService from "./services/wallet";
import UsernameService from "./services/username";
import {
    Network,
    addNetwork,
} from "./actions/network";
import {
    connectWallet,
    setupAccount,
} from "./actions/market";

const network: Network = { 
    networkName: "BSC",
    rpc: "https://bsc-dataseed1.defibit.io/",
    chainId: "56",
    symbol: "BNB"
};

async function main() {
    console.time();

    // Generate username
    const username = UsernameService.generate();
    const password = "Pass12345!"
    console.log("username:", username);

    // Generate wallet
    const wallet = await WalletService.generate(password);

    // Run browser
    const { metaMask, browser } = await dappeteer.bootstrap({
        seed: wallet.seedPhrase,
        password: "Pass29292",
        showTestNets: false,
        browser: "chrome",
    });

    // Add BSC network
    await addNetwork(metaMask.page, network);

    // Connect wallet
    const daapPage = await browser.newPage();
    await daapPage.goto("https://market.ninneko.com/");
    await connectWallet(daapPage, metaMask);

    // Setup account
    await setupAccount(daapPage, username, password);

    console.timeEnd();
}

main();
