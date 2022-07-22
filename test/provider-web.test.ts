import { WebProvider } from '../src/index.js';
import test from 'ava';

let webProvider;

// Reuse the same instance for all tests.
const createInstance = async () => {
	if (!webProvider) {
		webProvider = await WebProvider.Create();
	}

	return webProvider;
};

test.serial('request: should get permissions', async (t) => {
	let webProvider = await createInstance();

	const response = await webProvider.request({
		method: 'wallet_getPermissions',
	});

	t.assert(response != null);
});

test.serial('request: should request permissions', async (t) => {
	let webProvider = await createInstance();

	const response = await webProvider.request({
		method: 'wallet_requestPermissions',
		params: [
			{
				eth_accounts: {},
			},
		],
	});

	t.assert(response != null);
});
