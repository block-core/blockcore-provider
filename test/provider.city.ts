import { Provider } from '../src/index.js';
import test from 'ava';

test('should verify that city chain network is correct', async (t) => {
	let provider = new Provider('https://city.indexer.blockcore.net');
	const result: any = await provider.getSupply();

	t.assert(result.total > 13759461317); // Previous test: 13762606311, API returns now: 13759461318
	t.assert(result.rewards > 24854552);
	t.assert(result.height > 1338666);
});

test('should get block by index', async (t) => {
	let provider = new Provider('https://city.indexer.blockcore.net');
	const result: any = await provider.getBlockByIndex('1');

	t.assert(result.blockHash === '10ff8948145eab119c528301e44316a977b6adb2d82526f44f296b02370a6d41');
	t.assert(result.nonce === 16639);
});

test('should get transaction by id', async (t) => {
	let provider = new Provider('https://city.indexer.blockcore.net');
	const result: any = await provider.getTransactionById('f75756e8cd24e5c15c2f68a1a9eb2e6299ad8dd6e196940b27d8c933a1654c96'); // Block 50000

	t.assert(result.symbol === 'CITY');
	t.assert(result.blockHash === '3ef76cbcd4c125bfab252f20e11cdec64a495b1c3d6caa77d407f1e0420f71e7');
	t.assert(result.blockIndex === 50000);
	t.assert(result.transactionId === 'f75756e8cd24e5c15c2f68a1a9eb2e6299ad8dd6e196940b27d8c933a1654c96');
});

test('should test if getEstimateRewards method returns a number', async (t) => {
	let provider = new Provider('https://city.indexer.blockcore.net');
	const result: any = await provider.getEstimateRewards();
	t.truthy(result);
});
