const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.walet = wallet;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriberToChannels();

    this.subscriber.on(
      'message',
      (channel, message) => this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Message recieved. Channel: ${channel}. Message: ${message}.`);

    const parsedMessage = JSON.parse(message);

    switch(channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, () => {
          this.transactionPool.clearBlockchainTransactions({
            chain: parsedMessage
          });
        });
        break;
      case CHANNELS.TRANSACTION:
        if (!this.transactionPool.existingTransaction({
          inputAddress: this.wallet.publicKey
        })) {
          this.transactionPool.setTransaction(parsedMessage);
        }
        break;
      default;
        return;
    }
  }

  subscriberToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscriber(channel);
    });
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSCATION,
      message: JSON.stringify(transaction)
    });
  }
}

module.exports = PubSub;
