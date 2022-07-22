export interface ChainListEntry {
	name: string;
	symbol: string;
	icon: string;
}

export interface Supply {
	circulating: number;
	total: number;
	max: number;
	rewards: number;
	height: number;
}

export interface WalletListEntry {
	name: string;
	address?: string[];
	type: string;
	url?: string;
	logo?: string;
	initialAmount: number;
	balance: number;
	circulating: boolean;
}

export interface RichListEntry {
	address: string;
	balance: number;
}

export interface Address {
	address: string;
	balance: number;
	totalReceived: number;
	totalStake: number;
	totalMine: number;
	totalSent: number;
	totalReceivedCount: number;
	totalSentCount: number;
	totalStakeCount: number;
	totalMineCount: number;
	pendingSent: number;
	pendingReceived: number;
}

export interface ProviderRequest {
	method: string;
	params?: any[];
}

export interface RequestArguments {
	readonly method: string;
	readonly params?: readonly unknown[] | object;
}

export interface ProviderRpcError extends Error {
	code: number;
	data?: unknown;
}

export interface ProviderMessage {
	readonly type: string;
	readonly data: unknown;
}

export interface ProviderConnectInfo {
	readonly chainId: string;
}

export interface EthSubscription extends ProviderMessage {
	readonly type: 'eth_subscription';
	readonly data: {
		readonly subscription: string;
		readonly result: unknown;
	};
}

export interface JsonRpcRequest {
	jsonrpc: string;
	method: string;
	params: any[];
	id: number;
}

export interface JsonRpcResponse {
	jsonrpc: string;
	id: number;
	result?: any;
	error?: {
		code: number;
		message: string;
		data?: any;
	};
}

export interface Account {
	name: string;
}

export interface EIP1193Provider {
	request(args: RequestArguments): Promise<unknown>;
}

export interface Web3Provider {
	sign(value: string): Promise<string>;
	encrypt(value: string): Promise<string>;
	decrypt(value: string): Promise<string>;
	getAccounts(): Promise<Account[]>;
}
