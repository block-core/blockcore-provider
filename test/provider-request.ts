import { Provider } from '../src/index.js';
import test from 'ava';

test('request: should get permissions', async (t) => {
	let provider = new Provider();

	const response = await provider.request({
		method: 'wallet_getPermissions',
	});

	t.assert(response != null);
});

test('request: should request permissions', async (t) => {
	let provider = new Provider();

	const response = await provider.request({
		method: 'wallet_requestPermissions',
		params: [
			{
				eth_accounts: {},
			},
		],
	});

	t.assert(response != null);
});
