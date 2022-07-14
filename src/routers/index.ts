import { Router } from 'express';

import userRouter from './userRouter.js';
import credentialRouter from './credentialRouter.js';
import safenoteRouter from './safenoteRouter.js';

const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(safenoteRouter);

export default router;