export class IdentityProvider {
    // https://github.com/TBD54566975/janky-wallet/blob/main/rfc/web5-did-supported-methods.md
    /** This method can be used by clients to become aware of the DID methods supported by a wallet. */
	async supportedMethods(): Promise<string[]> {
		return ['did:is', 'did:jwk', 'did:key'];
	}


}
