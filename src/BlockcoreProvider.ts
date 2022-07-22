import coininfo from '@blockcore/coininfo';

/** Provider that interacts with the wallet. */
export class BlockcoreProvider {
	// private baseUrl: string;

	public constructor() {
		// baseUrlOrNetwork = baseUrlOrNetwork || 'CITY';
		// if (baseUrlOrNetwork.indexOf('http') > -1) {
		// 	this.baseUrl = baseUrlOrNetwork;
		// } else {
		// 	this.baseUrl = this.getNetworkUrl(baseUrlOrNetwork);
		// }
	}

	// setProvider(provider: string) {
	// 	this.baseUrl = provider;
	// }

	on(event: string, callback: unknown) {
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
		return coininfo(network);
	}
}
