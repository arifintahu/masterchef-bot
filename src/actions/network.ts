import { DappeteerPage } from '@chainsafe/dappeteer';
import {
    openNetworkDropdown,
    clickOnButton,
    clickOnElement,
    typeOnInputField,
} from '@chainsafe/dappeteer/dist/helpers';

export interface Network {
    networkName: string;
    rpc: string;
    chainId: string;
    symbol: string;
}

export const addNetwork = async (page: DappeteerPage, network: Network): Promise<void> => {
    await page.bringToFront();
    await openNetworkDropdown(page);

    await clickOnButton(page, "Add network");
    await page.waitForTimeout(500);

    await clickOnElement(page, "Add a network manually");
    await page.waitForTimeout(500);

    await typeOnInputField(page, "Network name", network.networkName);
    await typeOnInputField(page, "New RPC URL", network.rpc);
    await typeOnInputField(page, "Chain ID", String(network.chainId));
    await typeOnInputField(page, "Currency symbol", network.symbol);

    await clickOnButton(page, "Save");

    await page.bringToFront();
    await page.waitForXPath(`//*[text() = '${network.networkName}']`);
    await clickOnButton(page, "Got it");
}
