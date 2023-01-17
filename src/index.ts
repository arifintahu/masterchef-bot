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
import {
    goBirthdayParty,
} from "./actions/event"

const network: Network = { 
    networkName: "BSC",
    rpc: "https://bsc-dataseed1.defibit.io/",
    chainId: "56",
    symbol: "BNB"
};

const inviteLink = "https://ninneko.com/1stbirthdayparty?shareCode=48ff604f87b9806c94e96a48d6d8440e26cfcf5b";

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
        password: password,
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

    // Go to event
    const eventPage = await browser.newPage();
    await eventPage.goto(inviteLink);

    // Event: Birthday party
    await goBirthdayParty(eventPage, username, password);
    await eventPage.waitForTimeout(5000);

    console.timeEnd();
    process.exit();
}

main();
