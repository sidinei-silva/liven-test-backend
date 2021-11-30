import { Connection, createConnection } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

type connectionName = 'default' | 'test';

const typeOrmCreateConnection = async (
  connectionName: connectionName,
): Promise<Connection> => {
  switch (connectionName) {
    case 'default':
      return createConnection();
    case 'test':
      return createConnection({
        name: 'testConnection',
        type: 'sqlite',
        database: ':memory:',
        entities: ['./src/modules/**/entities/*.ts'],
        dropSchema: true,
        synchronize: true,
        logging: false,
      });

    default:
      throw new AppError('Connection name not found.', 500);
  }
};

export { typeOrmCreateConnection };
