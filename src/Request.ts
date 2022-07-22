import fetch, { Response } from 'node-fetch';

export class WebRequest {
	public static async fetchText(url: string): Promise<string> {
		const response = await WebRequest.fetchUrl(url);
		return response.text();
	}

	public static async fetchJson<T>(url: string): Promise<T> {
		const response = await WebRequest.fetchUrl(url);
		return response.json() as Promise<T>;
	}

	public static async fetchUrl(url: string): Promise<Response> {
		return await fetch(url, {
			method: 'GET',
			// mode: 'cors',
			// cache: 'no-cache',
			// credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		});
	}
}
