// import dappeteer from '@chainsafe/dappeteer';
import WalletService from "./services/wallet.service";

async function main() {
    // Generate wallet
    const walletService = new WalletService();
    const wallet = await walletService.generate("Pass29292");
    console.log(wallet.privateKey);
}

main();
