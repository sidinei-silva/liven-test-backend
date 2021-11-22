import { Router } from 'express';

import { createUserController } from '@modules/users/useCases/createUser';

const router = Router();

router.use('/status', (req, res) => res.status(200).json({ status: 'ok' }));
router.use('/users', (request, response) => {
  return createUserController.handle(request, response);
});

export { router };
