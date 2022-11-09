export class IdentityProvider {
	// https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-did-supported-methods.md
	/** This method can be used by clients to become aware of the DID methods supported by a wallet. */
	async supportedMethods(): Promise<string[]> {
		return ['did:is', 'did:jwk', 'did:key'];
	}

	// https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-did-authn.md
	/** Initiates DID-based passwordless registration / login flows */
	async authn() {
		throw Error('Not implemented.');
	}

	// https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-did-request.md
	async request() {
		throw Error('Not implemented.');
	}
}
