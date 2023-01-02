import { DappeteerPage, Dappeteer } from '@chainsafe/dappeteer';
import {
    clickOnButton,
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

export const setupAccount = async (daapPage: DappeteerPage, username: string, password: string): Promise<void> => {
    await daapPage.bringToFront();
    await clickOnButton(daapPage, "Account");
    await daapPage.waitForTimeout(500);

    await clickOnButton(daapPage, "Set up");
    await daapPage.waitForTimeout(500);

    await typeOnInputField(daapPage, "User name", username);
    await typeOnInputField(daapPage, "Password", password);
    await typeOnInputField(daapPage, "Retype password", password);

    await clickOnButton(daapPage, "Update");
    await daapPage.waitForTimeout(500);

    await clickOnButton(daapPage, "Ninnekos");
    await daapPage.waitForTimeout(500);
}
