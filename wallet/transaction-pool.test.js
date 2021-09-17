const TransactionPool = require('./transaction-pool');
const Transactino = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let transactionPool, transaction;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    transaction = new Transaction({
      senderWallet: new Wallet(),
      recipient: 'fake-recipient',
      amount: 50
    });
  });
});
