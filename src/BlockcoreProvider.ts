import fetch, { Response } from 'node-fetch';
import { RequestArguments, Address, ChainListEntry, RichListEntry, Supply, WalletListEntry } from './types.js';
import coininfo from '@blockcore/coininfo';

export class BlockcoreProvider {
	private baseUrl: string;

	public constructor(baseUrlOrNetwork?: string) {
		baseUrlOrNetwork = baseUrlOrNetwork || 'CITY';

		if (baseUrlOrNetwork.indexOf('http') > -1) {
			this.baseUrl = baseUrlOrNetwork;
		} else {
			this.baseUrl = this.getNetworkUrl(baseUrlOrNetwork);
		}
	}

	setProvider(provider: string) {
		this.baseUrl = provider;
	}

	on(event: string, callback: any) {
		console.log(event, callback);
		// "accountsChanged"
		// "chainChanged"
		// "networkChanged"
	}

	getAccounts() {
		return null;
	}

	chainId() {
		return null;
	}

	sendTransaction() {
		return null;
	}

	signTransaction() {
		return null;
	}

	sign() {
		return null;
	}

	signTypedData() {
		return null;
	}

	private async fetchText(url: string): Promise<string> {
		const response = await this.fetchUrl(url);
		return response.text();
	}

	private async fetchJson<T>(url: string): Promise<T> {
		const response = await this.fetchUrl(url);
		return response.json() as Promise<T>;
	}

	private async fetchUrl(url: string): Promise<Response> {
		return await fetch(url, {
			method: 'GET',
			// mode: 'cors',
			// cache: 'no-cache',
			// credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		});
	}

	public setNetwork(network: string): void {
		this.baseUrl = this.getNetworkUrl(network);
	}

	public getNetworkUrl(network: string): string {
		return `https://${network.toLowerCase()}.indexer.blockcore.net`;
	}

	public getBaseUrl(): string {
		return this.baseUrl;
	}

	/** Returns network definition from local package, no external requests. */
	public getNetwork(network: string) {
		return coininfo(network);
	}
}
