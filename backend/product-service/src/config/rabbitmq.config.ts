import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
  uri: 'amqp://localhost',
  exchange: 'exchange_name',
  exchangeType: 'topic',
}));
