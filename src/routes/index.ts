import { Router } from 'express';
import authRoutes from './auth.routes';
import gadgetRoutes from './gadget.route'

const router = Router();

router.use('/auth', authRoutes);
router.use('/gadgets', gadgetRoutes)

export default router;
