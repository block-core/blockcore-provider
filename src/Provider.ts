import fetch, { Response } from 'node-fetch';
import { Address, ChainListEntry, RichListEntry, Supply, WalletListEntry } from './types.js';

export class Provider {
	private baseUrl: string;

	public constructor(baseUrlOrNetwork?: string) {
		baseUrlOrNetwork = baseUrlOrNetwork || 'CITY';

		if (baseUrlOrNetwork.indexOf('http') > -1) {
			this.baseUrl = baseUrlOrNetwork;
		} else {
			this.baseUrl = this.getNetworkUrl(baseUrlOrNetwork);
		}
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

	//** Returns the result from the officially hosted list of Blockcore supported chains. */
	public getNetworks() {
		return this.fetchJson<ChainListEntry[]>('https://chains.blockcore.net/CHAINS.json');
	}

	public getSupply() {
		return this.fetchJson<Supply>(this.baseUrl + '/api/insight/supply');
	}

	public async getCirculatingSupply() {
		return this.fetchText(this.baseUrl + '/api/insight/supply/circulating');
	}

	public async getTotalSupply() {
		return this.fetchText(this.baseUrl + '/api/insight/supply/total');
	}

	public async getEstimateRewards() {
		return this.fetchText(this.baseUrl + '/api/insight/rewards');
	}
	public async getWallets() {
		return this.fetchJson<WalletListEntry[]>(this.baseUrl + '/api/insight/wallets');
	}

	public async getRichList() {
		return this.fetchJson<RichListEntry[]>(this.baseUrl + '/api/insight/richlist');
	}

	public async getAddress(address: string) {
		return this.fetchJson<Address>(`${this.baseUrl}/api/query/address/${address}`);
	}

	public async getAddressTransactions(address: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/address/${address}/transactions`);
	}

	public async getAddressUnconfirmedTransactions(address: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/address/${address}/transactions/unconfirmed`);
	}

	public async getAddressSpentTransactions(address: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/address/${address}/transactions/spent`);
	}

	public async getAddressUnspentTransactions(address: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/address/${address}/transactions/unspent`);
	}

	public async getMempoolTransactions() {
		return this.fetchJson(`${this.baseUrl}/api/query/mempool/transactions`);
	}

	public async getMempoolTransactionsCount() {
		return this.fetchText(`${this.baseUrl}/api/query/mempool/transactions/count`);
	}

	public async getTransactionById(id: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/transaction/${id}`);
	}

	public async getBlock() {
		return this.fetchJson(`${this.baseUrl}/api/query/block`);
	}

	public async getBlockTransactionsByHash(hash: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/block/${hash}/transactions`);
	}

	public async getBlockByHash(hash: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/block/${hash}`);
	}

	public async getBlockByIndex(index: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/block/index/${index}`);
	}

	public async getBlockTransactionsByIndex(index: string) {
		return this.fetchJson(`${this.baseUrl}/api/query/block/index/${index}/transactions`);
	}

	public async getLatestBlock() {
		return this.fetchJson(`${this.baseUrl}/api/query/block/latest`);
	}
}
