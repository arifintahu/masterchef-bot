import { DappeteerPage, Dappeteer } from '@chainsafe/dappeteer';
import {
    clickOnButton,
} from '@chainsafe/dappeteer/dist/helpers';

export const goBirthdayParty = async (eventPage: DappeteerPage, username: string, password: string): Promise<void> => {
    const closeModal = await eventPage.waitForSelector("#pop_notify > div > a.closeModal");
    await closeModal.click();
    await eventPage.waitForTimeout(500);

    const usernameInput = await eventPage.waitForSelector("input.username");
    await usernameInput.type(username);
    const passwordInput = await eventPage.waitForSelector("input.password");
    await passwordInput.type(password);
    await clickOnButton(eventPage, "Login");
}
