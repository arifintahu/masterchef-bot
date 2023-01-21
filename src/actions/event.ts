import { DappeteerPage } from "@chainsafe/dappeteer";
import { Page } from "puppeteer";
import {
    clickOnButton,
} from "@chainsafe/dappeteer/dist/helpers";

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

export const goBirthdayPartyPuppeteer = async (eventPage: Page, username: string, password: string): Promise<null|string> => {
    const closeModal = await eventPage.waitForSelector("#pop_notify > div > a.closeModal");
    if (!closeModal) {
        return `${username}: Null close modal`;
    }
    await closeModal.click();

    await eventPage.waitForTimeout(500);

    const usernameInput = await eventPage.waitForSelector("input.username");
    if (!usernameInput) {
        return `${username}: Null username input`;
    }
    await usernameInput.type(username);

    const passwordInput = await eventPage.waitForSelector("input.password");
    if (!passwordInput) {
        return `${username}: Null password input`;
    }
    await passwordInput.type(password);

    const login = await eventPage.waitForSelector("button.btn_submit", {
        timeout: 20000,
        visible: true,
    });
    if (!login) {
        return `${username}: Null login`;
    }
    await login.click();

    await eventPage.waitForTimeout(2000);

    const notify = await eventPage.waitForSelector("h3.txt_notify");

    if (!notify) {
        return `${username}: Null notify`;
    }
    const textContent = await notify.getProperty("textContent");

    return textContent.jsonValue();
}
