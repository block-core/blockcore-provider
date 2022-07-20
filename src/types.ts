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
