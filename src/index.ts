import * as dappeteer from '@chainsafe/dappeteer';
import { generateUsername } from "unique-username-generator";
import WalletService from "./services/wallet.service";
import {
    Network,
    addNetwork,
} from "./actions/network";
import {
    connectWallet,
    setupAccount,
} from "./actions/market";
import {
    getRndInteger,
    getRndChars,
} from "./utils";

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

    // Generate username
    const randomChars = getRndChars(2);
    const randomLength = getRndInteger(15, 20);
    const randomDigits = getRndInteger(2, 4);
    const username = generateUsername(randomChars, randomDigits, randomLength);
    const password = "Pass12345!"
    console.log("username:", username);

    // Setup account
    await setupAccount(daapPage, username, password);

    console.timeEnd();
}

main();
