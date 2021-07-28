const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('foo'))
      .toEqual('b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c');
  });
});
