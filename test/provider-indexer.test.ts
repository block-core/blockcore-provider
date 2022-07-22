import { IndexerProvider } from '../src/index.js';
import test from 'ava';

let indexerProvider;

// Reuse the same instance for all tests.
const createInstance = async (): Promise<IndexerProvider> => {
	if (!indexerProvider) {
		indexerProvider = new IndexerProvider();
		await indexerProvider.load();
	}

	return indexerProvider;
};

test.serial('should get networks', async (t) => {
	let provider = await createInstance();
	let result: any = await provider.getNetworks();
	t.assert(result[0].symbol === 'BTC');
});

// test('should get correct network url', async (t) => {
// 	let provider = new IndexerProvider();

// 	let result = await provider.getNetworkUrl('CITY');
// 	t.assert(result === 'https://city.indexer.blockcore.net');

// 	result = await provider.getNetworkUrl('EXOS');
// 	t.assert(result === 'https://exos.indexer.blockcore.net');

// 	const provider2 = new IndexerProvider('https://custom.indexer.blockcore.net');
// 	t.assert(provider2.getBaseUrl() === 'https://custom.indexer.blockcore.net');
// });

test.serial('should test getSupply method', async (t) => {
	let provider = await createInstance();
	provider.setNetwork('CITY');
	const result: any = await provider.getSupply();

	t.assert(result.total > 303049697);
	t.assert(result.rewards > 2158270);
	t.assert(result.height > 1218270);
});

test.serial('should test if getCirculatingSupply method returns a number', async (t) => {
	let provider = await createInstance();
    provider.setNetwork('CITY');
	const result: any = await provider.getCirculatingSupply();
	t.truthy(result);
});

test.serial('should test if getTotalSupply method returns a number', async (t) => {
	let provider = await createInstance();
    provider.setNetwork('CITY');
	const result: any = await provider.getTotalSupply();
	t.truthy(result);
});

test('should verify that city chain network is correct', async (t) => {
	let provider = await createInstance();
    provider.setNetwork('CITY');
	const result: any = await provider.getSupply();

	t.assert(result.total > 13759461317); // Previous test: 13762606311, API returns now: 13759461318
	t.assert(result.rewards > 24854552);
	t.assert(result.height > 1338666);
});

test('should get block by index', async (t) => {
	let provider = await createInstance();
    provider.setNetwork('CITY');
	const result: any = await provider.getBlockByIndex('1');

	t.assert(result.blockHash === '10ff8948145eab119c528301e44316a977b6adb2d82526f44f296b02370a6d41');
	t.assert(result.nonce === 16639);
});

test('should get transaction by id', async (t) => {
	let provider = await createInstance();
    provider.setNetwork('CITY');
	const result: any = await provider.getTransactionById('f75756e8cd24e5c15c2f68a1a9eb2e6299ad8dd6e196940b27d8c933a1654c96'); // Block 50000

	t.assert(result.symbol === 'CITY');
	t.assert(result.blockHash === '3ef76cbcd4c125bfab252f20e11cdec64a495b1c3d6caa77d407f1e0420f71e7');
	t.assert(result.blockIndex === 50000);
	t.assert(result.transactionId === 'f75756e8cd24e5c15c2f68a1a9eb2e6299ad8dd6e196940b27d8c933a1654c96');
});

test('should test if getEstimateRewards method returns a number', async (t) => {
	let provider = await createInstance();
    provider.setNetwork('CITY');
	const result: any = await provider.getEstimateRewards();
	t.truthy(result);
});


// test('should test if getWallets method returns an object containing Burnt account', async (t) => {
// 	let provider = new Provider();
// 	const result: any = await provider.getWallets();

// 		expect(result).toMatchObject(someResponse);
// 		expect(result.data).toEqual(
// 			expect.arrayContaining([
// 				expect.objectContaining({
// 					name: 'Burnt',
// 					type: 'Burn',
// 					initialAmount: 0.0,
// 				}),
// 			])
// 		);
// });

// test('should call getRichList and contain a handpicked random account', async (t) => {
// 	let provider = new Provider();
// 	const someAddress = {
// 		address: 'CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV',
// 	};
// 	const result: any = await provider.getRichList();

// 	expect(result).toMatchObject(someResponse);
// 	expect(result.data).toEqual(expect.arrayContaining([expect.objectContaining(someAddress)]));
// });

// test('should test if getAddress method returns the address passed as argument', async (t) => {
// 	let provider = new Provider();
// 	const result: any = await provider.getAddress('CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV');
// 	const someAddress = {
// 		address: 'CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV',
// 	};

// 	expect(result).toMatchObject(someResponse);
// 	expect(result.data).toEqual(expect.objectContaining(someAddress));
// });

// test('should test if getAddressTransactions method returns the address transactions passed as argument', async (t) => {
// 	let provider = new Provider();
// 	const result: any = await provider.getAddressTransactions('CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV');

// 		expect(result).toMatchObject(someResponse);
// 		expect(result.data).toEqual(
// 			expect.arrayContaining([
// 				expect.objectContaining({
// 					symbol: 'CITY',
// 					blockHash: 'ecb1aca33af0bb4885b3fc898efbabe5cbcf58e77d7d20bde5cc51ced75bbbb9',
// 					blockIndex: 1339023,
// 					timestamp: 1631468016,
// 					transactionId: '6ea66e4ae9c3f19b9e410de16f71ed6ec4b0e7111d8ed3083f0b6c5c43093510',
// 				}),
// 			])
// 		);
// });

// test('should test if getAddressUnconfirmedTransactions method returns the address unconfirmed transactions passed as argument', async (t) => {
// 	let provider = new Provider();
// 	const result: any = await provider.getAddressUnconfirmedTransactions('CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV');

// 	expect(result).toMatchObject(someResponse);
// 	expect(result.data).toEqual(
// 		expect.arrayContaining([
// 			expect.objectContaining({
// 				symbol: 'CITY',
// 				blockHash: 'ecb1aca33af0bb4885b3fc898efbabe5cbcf58e77d7d20bde5cc51ced75bbbb9',
// 				blockIndex: 1339023,
// 				timestamp: 1631468016,
// 				transactionId: '6ea66e4ae9c3f19b9e410de16f71ed6ec4b0e7111d8ed3083f0b6c5c43093510',
// 			}),
// 		])
// 	);
// });

// test('should test if getAddressSpentTransactions method returns the address spent transactions passed as argument', async (t) => {
// 	let provider = new Provider();
// 	const result: any = await provider.getAddressSpentTransactions('CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV');

// 	expect(result).toMatchObject(someResponse);
// 	expect(result.data).toEqual(
// 		expect.arrayContaining([
// 			expect.objectContaining({
// 				symbol: 'CITY',
// 				blockHash: 'f1cda3861b642fa6ee188655f53c8f209c0a2033f5105aa350e73f92da3b74fe',
// 				blockIndex: 1333716,
// 				timestamp: 1631112128,
// 				transactionId: '8de7841ac0944e00fcc03436b4d08c17218bcb21f71b3bcb2a0f99ba3185ff6f',
// 			}),
// 		])
// 	);
// });

// test('should test if getAddressUnspentTransactions method returns the address unspent transactions passed as argument', async (t) => {
// 	let provider = new Provider();
// 	const result: any = await provider.getAddressUnspentTransactions('CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV');

// 	expect(result).toMatchObject(someResponse);
// 	expect(result.data).toEqual(
// 		expect.arrayContaining([
// 			expect.objectContaining({
// 				symbol: 'CITY',
// 				blockHash: 'ecb1aca33af0bb4885b3fc898efbabe5cbcf58e77d7d20bde5cc51ced75bbbb9',
// 				blockIndex: 1339023,
// 				timestamp: 1631468016,
// 				transactionId: '6ea66e4ae9c3f19b9e410de16f71ed6ec4b0e7111d8ed3083f0b6c5c43093510',
// 			}),
// 		])
// 	);
// });
