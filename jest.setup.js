// Jest setup: provide TextEncoder/TextDecoder for packages that expect them
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill WHATWG fetch Request/Response/Headers used by Next server runtime
try {
	// prefer undici which provides web-compatible globals
	const { Request, Response, Headers } = require('undici');
	if (!global.Request) global.Request = Request;
	if (!global.Response) global.Response = Response;
	if (!global.Headers) global.Headers = Headers;
} catch (e) {
	try {
		// fallback to node-fetch v3
		const fetch = require('node-fetch');
		if (fetch && fetch.Request && !global.Request) global.Request = fetch.Request;
		if (fetch && fetch.Response && !global.Response) global.Response = fetch.Response;
		if (fetch && fetch.Headers && !global.Headers) global.Headers = fetch.Headers;
	} catch (err) {
		// Ignore: install undici or node-fetch for better compatibility. Provide minimal polyfills below.
		if (!global.Headers) {
			class SimpleHeaders {
				constructor(init = {}) {
					this.map = new Map();
					if (init instanceof SimpleHeaders) {
						init.map.forEach((v, k) => this.map.set(k, v));
					} else if (typeof init === 'object') {
						Object.keys(init).forEach(k => this.map.set(k.toLowerCase(), String(init[k])));
					}
				}
				get(key) { return this.map.get(String(key).toLowerCase()) ?? null; }
				set(key, value) { this.map.set(String(key).toLowerCase(), String(value)); }
			}
			global.Headers = SimpleHeaders;
		}

		if (!global.Request) {
			class SimpleRequest {
				constructor(url, opts = {}) {
					this.url = String(url);
					this.method = opts.method || 'GET';
					this._body = opts.body;
					this.headers = opts.headers instanceof global.Headers ? opts.headers : new global.Headers(opts.headers || {});
				}
				async json() {
					if (!this._body) return null;
					if (typeof this._body === 'string') return JSON.parse(this._body);
					// if body is already an object
					return this._body;
				}
				async text() { return this._body ? String(this._body) : ''; }
			}
			global.Request = SimpleRequest;
		}

		if (!global.Response) {
			class SimpleResponse {
				constructor(body = null, init = {}) {
					this._body = body;
					this.status = init.status || 200;
					this.headers = init.headers instanceof global.Headers ? init.headers : new global.Headers(init.headers || {});
				}
				async json() { if (typeof this._body === 'string') return JSON.parse(this._body); return this._body; }
				async text() { return this._body ? String(this._body) : ''; }
			}
			global.Response = SimpleResponse;
		}
	}
}
