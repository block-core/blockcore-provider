import { Provider } from '../src/index.js';
import test from 'ava';

test('should get networks', async (t) => {
	let provider = new Provider();
	let result: any = await provider.getNetworks();
	t.assert(result[0].symbol === 'BTC');
});

test('should get correct network url', async (t) => {
	let provider = new Provider();

	let result = await provider.getNetworkUrl('CITY');
	t.assert(result === 'https://city.indexer.blockcore.net');

	result = await provider.getNetworkUrl('EXOS');
	t.assert(result === 'https://exos.indexer.blockcore.net');

	const provider2 = new Provider('https://custom.indexer.blockcore.net');
	t.assert(provider2.getBaseUrl() === 'https://custom.indexer.blockcore.net');
});

test('should test getSupply method', async (t) => {
	let provider = new Provider();
	const result: any = await provider.getSupply();

	t.assert(result.total > 303049697);
	t.assert(result.rewards > 2158270);
	t.assert(result.height > 1218270);
});

test('should test if getCirculatingSupply method returns a number', async (t) => {
	let provider = new Provider();
	const result: any = await provider.getCirculatingSupply();
	t.truthy(result);
});

test('should test if getTotalSupply method returns a number', async (t) => {
	let provider = new Provider();
	const result: any = await provider.getTotalSupply();
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
