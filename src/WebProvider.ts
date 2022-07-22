import { RequestArguments, EIP1193Provider } from './types.js';
import { BlockcoreProvider } from './BlockcoreProvider.js';
import { IndexerProvider } from './IndexerProvider.js';

export class WebProvider implements EIP1193Provider {
	// private baseUrl: string;
	// private provider: BlockcoreProvider;
	// private indexer: IndexerProvider;

	private constructor(public indexer: IndexerProvider, private provider: BlockcoreProvider) {
		// baseUrlOrNetwork = baseUrlOrNetwork || 'CITY';
		// if (baseUrlOrNetwork.indexOf('http') > -1) {
		// 	this.baseUrl = baseUrlOrNetwork;
		// } else {
		// 	this.baseUrl = this.getNetworkUrl(baseUrlOrNetwork);
		// }
		// this.provider = new BlockcoreProvider(this.baseUrl);
		// this.indexer = new IndexerProvider();
	}

	static async Create(indexer?: IndexerProvider) {
		// Create and load all known services from all name servers.
		if (!indexer) {
			indexer = new IndexerProvider();
			await indexer.load();
		}

		const provider = new BlockcoreProvider();

		const webProvider = new WebProvider(indexer, provider);
		return webProvider;
	}

	setNetwork(network: string) {
		this.indexer.setNetwork(network);
	}

	on(event: string, callback: unknown) {
		console.log(event, callback);
		// "accountsChanged"
		// "chainChanged"
		// "networkChanged"
	}

	// eip-1193: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
	public async request(args: RequestArguments): Promise<unknown> {
		let param0 = null;

		if (Array.isArray(args.params)) {
			param0 = args.params[0];
		} else {
			param0 = args.params;
		}

		// params: [from, JSON.stringify(msgParams)]

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
			case 'signTypedData':
			case 'signTypedData_v4':
				return this.provider.signTypedData(args.params);
			case 'requestPermissions': //
				return null;
			case 'getTransactionByHash':
				return this.indexer.getBlockTransactionsByHash(param0.transactionHash);
			case 'getBlockByHash':
				return this.indexer.getBlockByHash(param0.blockHash); // TODO: Add support for "includeTransactions".
			case 'getBlockByNumber':
				return this.indexer.getBlockByIndex(param0.blockNumber); // TODO: Add support for "includeTransactions".
			default:
				return null;
		}
	}

	// public setNetwork(network: string): void {
	// 	this.baseUrl = this.getNetworkUrl(network);
	// }

	// public getNetworkUrl(network: string): string {
	// 	return `https://${network.toLowerCase()}.indexer.blockcore.net`;
	// }

	// public getBaseUrl(): string {
	// 	return this.baseUrl;
	// }

	/** Returns network definition from local package, no external requests. */
	public getNetwork(network: string) {
		return this.provider.getNetwork(network);
	}
}
