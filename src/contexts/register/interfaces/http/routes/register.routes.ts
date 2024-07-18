import { Router } from 'express';
import { registerToTeam, approveRegisterToTeam } from '../../controllers/register.controller'

const router = Router();

router.post('/', registerToTeam);
router.post('/approve', approveRegisterToTeam);

export default router;
