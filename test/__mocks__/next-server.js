// Minimal mock for Next's server helpers used in tests
module.exports = {
  NextResponse: {
    json: (body, opts = {}) => {
      // return a Response-like object with json() and status
      return {
        status: opts.status || 200,
        _body: body,
        async json() { return this._body; },
        async text() { return JSON.stringify(this._body); },
      };
    }
  }
};
