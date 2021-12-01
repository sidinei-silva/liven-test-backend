import { Connection, createConnection, getConnectionOptions } from 'typeorm';

import { AppError } from '@shared/errors/AppError';

type connectionName = 'default' | 'test';

const typeOrmCreateConnection = async (
  connectionName: connectionName,
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  switch (connectionName) {
    case 'default':
      return createConnection(defaultOptions);
    case 'test':
      return createConnection({
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
