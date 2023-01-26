import express from 'express'
import { deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from '../controllers/users.js';
import { body } from 'express-validator';
import { varifyToken } from '../middlewares/auth.js';


const router = express.Router()

router.get('/',varifyToken,getUsers)
router.get('/:id',varifyToken,getUser)
router.post('/',[body('email').isEmail(),body('password').isLength({ min: 6 , max: 12 })],registerUser)
router.post('/login',loginUser) // loginUser
router.put('/:id',varifyToken,updateUser)
router.delete('/:id',varifyToken,deleteUser)

export default router;