import fetch, { Response } from 'node-fetch';
import { RequestArguments, Address, ChainListEntry, EIP1193Provider, RichListEntry, Supply, WalletListEntry } from './types.js';
// import { coininfo } from '@blockcore/coininfo';
import coininfo from '@blockcore/coininfo';

export class IndexerProvider {
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

	// eip-1193: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
	public async request(args: RequestArguments): Promise<unknown> {
		let param0 = null;

		if (Array.isArray(args.params)) {
			param0 = args.params[0];
		} else {
			param0 = args.params;
		}

		switch (args.method) {
			case 'wallet_requestPermissions': // eip-2255 - https://eips.ethereum.org/EIPS/eip-2255
				return [
					{
						invoker: 'ens://your-site.eth',
						parentCapability: 'eth_accounts',
						caveats: [
							{
								type: 'filterResponse',
								value: ['0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb'],
							},
						],
					},
				];
			case 'wallet_getPermissions': // eip-2255 - https://eips.ethereum.org/EIPS/eip-2255
				return [
					{
						invoker: 'ens://your-site.eth',
						parentCapability: 'eth_accounts',
						caveats: [
							{
								type: 'filterResponse',
								value: ['0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb'],
							},
						],
					},
				];
			case 'requestPermissions': //
				return null;
			case 'getTransactionByHash':
				return this.getBlockTransactionsByHash(param0.transactionHash);
			case 'getBlockByHash':
				return this.getBlockByHash(param0.blockHash); // TODO: Add support for "includeTransactions".
			case 'getBlockByNumber':
				return this.getBlockByIndex(param0.blockNumber); // TODO: Add support for "includeTransactions".
			default:
				return null;
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

	/** Returns network definition from local package, no external requests. */
	public getNetwork(network: string) {
		return coininfo(network);
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
