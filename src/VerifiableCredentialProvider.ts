export class VerifiableCredentialProvider {
	// https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-vc-apply.md
	/** Initiates a credential application flow in the wallet using a Credential Manifest */
	async apply() {
		throw Error('Not implemented.');
	}

	// https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-vc-deliver.md
	/** Delivers Verifiable Credentials to a wallet */
	async deliver() {
		throw Error('Not implemented.');
	}

    // https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-vc-request.md
    /** Requests Verifiable Credentials from the wallet using Presentation Exchange */
	async request() {
		throw Error('Not implemented.');
	}
}
