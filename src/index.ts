const cron = require('node-cron');
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
const inviteLink2 = "https://ninneko.com/1stbirthdayparty?shareCode=a9d13db3317e1eee1a5f04f8fc111321f80698cb";

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

    const eventPage2 = await browser.newPage();
    await eventPage2.goto(inviteLink2);
    await eventPage2.waitForTimeout(1000);

    console.timeEnd();
    browser.close();
}

let i = 0;
cron.schedule("* * * * *", () => {
    i++;
    console.log(`========== RUN #${i} ============`);
    main();
});
