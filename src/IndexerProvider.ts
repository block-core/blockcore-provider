import { Address, ChainListEntry, RichListEntry, Supply, WalletListEntry } from './types.js';
import { WebRequest, BlockcoreDns, ServiceListEntry } from '@blockcore/dns';

export class IndexerProvider {
	private dns: BlockcoreDns;
	#network = 'STRAX'; // Should we default to BTC?

	public get network(): string {
		return this.#network;
	}

	private currentServices: ServiceListEntry[] = [];

	public constructor() {
		this.dns = new BlockcoreDns();
	}

	setNetwork(network: string) {
		this.#network = network;
		this.filterServices();
	}

	private filterServices() {
		this.currentServices = this.dns.getOnlineServicesByNetwork(this.network);
	}

	/** Attempts to load the latest status of all services from all known nameservers. */
	async load() {
		await this.dns.load();
		this.filterServices();
	}

	on(event: string, callback: unknown) {
		console.log(event, callback);
		// "accountsChanged"
		// "chainChanged"
		// "networkChanged"
	}

	private getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	private getUrl(): string | undefined {
		// TODO: This can be simplified, I'm just too tired to refactor right now.
		if (this.currentServices.length > 1) {
			const serviceIndex = this.getRandomInt(this.currentServices.length);
			return `https://${this.currentServices[serviceIndex]?.domain}`;
		} else if (this.currentServices.length == 1) {
			return `https://${this.currentServices[0]?.domain}`;
		} else {
			return undefined;
		}
	}

	//** Returns the result from the officially hosted list of Blockcore supported chains. */
	public getNetworks() {
		return WebRequest.fetchJson<ChainListEntry[]>('https://chains.blockcore.net/CHAINS.json');
	}

	public getSupply() {
		return WebRequest.fetchJson<Supply>(this.getUrl() + '/api/insight/supply');
	}

	public async getCirculatingSupply() {
		return WebRequest.fetchText(this.getUrl() + '/api/insight/supply/circulating');
	}

	public async getTotalSupply() {
		return WebRequest.fetchText(this.getUrl() + '/api/insight/supply/total');
	}

	public async getEstimateRewards() {
		return WebRequest.fetchText(this.getUrl() + '/api/insight/rewards');
	}
	public async getWallets() {
		return WebRequest.fetchJson<WalletListEntry[]>(this.getUrl() + '/api/insight/wallets');
	}

	public async getRichList() {
		return WebRequest.fetchJson<RichListEntry[]>(this.getUrl() + '/api/insight/richlist');
	}

	public async getAddress(address: string) {
		return WebRequest.fetchJson<Address>(`${this.getUrl()}/api/query/address/${address}`);
	}

	public async getAddressTransactions(address: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/address/${address}/transactions`);
	}

	public async getAddressUnconfirmedTransactions(address: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/address/${address}/transactions/unconfirmed`);
	}

	public async getAddressSpentTransactions(address: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/address/${address}/transactions/spent`);
	}

	public async getAddressUnspentTransactions(address: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/address/${address}/transactions/unspent`);
	}

	public async getMempoolTransactions() {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/mempool/transactions`);
	}

	public async getMempoolTransactionsCount() {
		return WebRequest.fetchText(`${this.getUrl()}/api/query/mempool/transactions/count`);
	}

	public async getTransactionById(id: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/transaction/${id}`);
	}

	public async getBlock() {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/block`);
	}

	public async getBlockTransactionsByHash(hash: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/block/${hash}/transactions`);
	}

	public async getBlockByHash(hash: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/block/${hash}`);
	}

	public async getBlockByIndex(index: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/block/index/${index}`);
	}

	public async getBlockTransactionsByIndex(index: string) {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/block/index/${index}/transactions`);
	}

	public async getLatestBlock() {
		return WebRequest.fetchJson(`${this.getUrl()}/api/query/block/latest`);
	}
}
