import express from 'express';
import { getUserProfile, createUser } from '../controllers/UserController.js';

const router = express.Router();
// On définit la route et on passe la fonction du contrôleur
router.get('/:id', getUserProfile);
router.post('/', createUser);
export default router;