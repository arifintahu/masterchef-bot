import { DappeteerPage, Dappeteer } from '@chainsafe/dappeteer';
import {
    openNetworkDropdown,
    clickOnButton,
    clickOnElement,
    typeOnInputField,
} from '@chainsafe/dappeteer/dist/helpers';

export const connectWallet = async (daapPage: DappeteerPage, metaMask: Dappeteer): Promise<void> => {
    await daapPage.bringToFront();
    await clickOnButton(daapPage, "Connect Wallet");
    await daapPage.waitForTimeout(500);

    await clickOnButton(daapPage, "MetaMask");
    await daapPage.waitForTimeout(500);

    await metaMask.approve();
    await metaMask.sign();
    await daapPage.waitForTimeout(500);
}
