const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-6be6bf2b-059d-48b7-8767-59d3d1ebc9ae',
  subscribeKey: 'sub-c-0379de8e-0d0c-11ec-ab62-2a0190623188',
  secretKey: 'sec-c-MTRjMTk2YTMtYWMzOS00ZGU4LTk0NTUtMzY2YjMxZjZmOTBj'
};

const CHANNELS = {
  TEST: 'TEST',
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });
  }
}
