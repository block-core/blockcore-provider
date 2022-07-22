import { BlockcoreProvider } from '../src/index.js';
import test from 'ava';

test('get CITY network', async (t) => {
	let provider = new BlockcoreProvider();
	let network = provider.getNetwork('CITY');

	t.assert(network != null);
	t.assert(network.unit === 'CITY');
	t.assert(network.port === 4333);
	t.assert(network.versions.private === 237);
	t.assert(network.versions.public === 28);
	t.assert(network.isProofOfStake === true);
});
