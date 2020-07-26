const config = require('./config');
const kafka = require('kafka-node');


try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(config.kafka_server);
  let consumer = new Consumer(
    client,
    [{ topic: config.kafka.kafka_topic, partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  consumer.on('message', async function (message) {
    console.log(
      'kafka-> ',
      message.value
    );
  })
  consumer.on('error', function (err) {
    console.log('error', err);
  });
} catch (err) {
  console.log('Error:\n', err);
}