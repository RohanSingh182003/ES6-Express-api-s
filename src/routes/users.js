import express from 'express'
import { deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from '../controllers/users.js';
import { body } from 'express-validator';


const router = express.Router()

router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/',[body('email').isEmail(),body('password').isLength({ min: 6 , max: 12 })],registerUser)
router.post('/login',loginUser) // loginUser
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)

export default router;