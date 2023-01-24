import express from 'express'
import { getUser, getUsers, loginUser, registerUser, updateUser } from '../controllers/users.js';

const router = express.Router()

router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/',registerUser)
router.post('/login',loginUser) // loginUser
router.put('/:id',updateUser)

export default router;