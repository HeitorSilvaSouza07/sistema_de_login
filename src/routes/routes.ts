import { Router } from 'express';
import { UserController } from '../controller/UserController';

const router = Router();

router.post('/createUser', UserController.createUser);
router.post('/login', UserController.login);

export default router;