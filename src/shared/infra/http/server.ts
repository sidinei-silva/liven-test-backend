import { logger } from '@shared/infra/logging/logger';

import { app } from './app';

const serverPort = process.env.SERVER_PORT || 3333;

app.listen(serverPort, () =>
  logger.info(`Server is running! Port: ${serverPort}`),
);
