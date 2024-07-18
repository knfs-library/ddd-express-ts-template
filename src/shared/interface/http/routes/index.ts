import { Router } from 'express';
import registerRoutes from '../../../../contexts/register/interfaces/http/routes/register.routes'

const router = Router();

router.use('/registers', registerRoutes);

export default router;
