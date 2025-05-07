import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Route for registeration functionality
router.post('/register', register);

// Route for login functionality
router.post('/login', login);

export default router;
