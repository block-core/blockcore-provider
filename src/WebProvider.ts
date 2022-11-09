import { RequestArguments, EIP1193Provider } from './types.js';
import { BlockcoreProvider } from './BlockcoreProvider.js';
import { IndexerProvider } from './IndexerProvider.js';
import { IdentityProvider } from './IdentityProvider.js';
import { VerifiableCredentialProvider } from './VerifiableCredentialProvider.js';

export class WebProvider implements EIP1193Provider {
	private constructor(
		public indexer: IndexerProvider = new IndexerProvider(),
		private provider: BlockcoreProvider = new BlockcoreProvider(),
		public did: IdentityProvider = new IdentityProvider(),
		public vc: VerifiableCredentialProvider = new VerifiableCredentialProvider()
	) {}

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

	public async request(args: RequestArguments): Promise<unknown> {
		return this.provider.request(args);
	}

	/** Returns network definition from local package, no external requests. */
	public getNetwork(network: string) {
		return this.provider.getNetwork(network);
	}
}
