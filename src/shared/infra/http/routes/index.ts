import { Router } from 'express';

const router = Router();

router.use('/status', (req, res) => res.status(200).json({ status: 'ok' }));

export { router };
