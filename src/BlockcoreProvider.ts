import coininfo from '@blockcore/coininfo';
import { RequestArguments } from './types.js';

/** Provider that interacts with the wallet. */
export class BlockcoreProvider {
	/** Returns network definition from local package, no external requests. */
	public getNetwork(network: string) {
		return coininfo(network);
	}

	// eip-1193: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
	/** Use this method to send a request directly to the wallet extension. */
	public async request(args: RequestArguments): Promise<unknown> {
		const gthis = globalThis as any;
		const blockcore = gthis.blockcore;

		if (!blockcore) {
			throw Error('The Blockcore provider is not available. Unable to continue.');
		}

		let result;

		try {
			result = await blockcore.request(args);
		} catch (err: any) {
			console.error(err);
			result = 'Error: ' + err.message;
		}

		return result;
	}
}
