import { Connection, createConnections } from 'typeorm';

export default async (): Promise<Connection[]> => {
  return createConnections([
    {
      name: 'testConnection',
      type: 'sqlite',
      database: ':memory:',
      entities: ['./src/modules/**/entities/*.ts'],
      dropSchema: true,
      synchronize: true,
      logging: false,
    },
  ]);
};
