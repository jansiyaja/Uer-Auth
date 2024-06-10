import express from 'express'
import { authUser,registerUser,
    logoutUser,
    profileUser,
    UpdateProfileUser } from '../controllers/userControllers.js';
 import { protect } from '../middleWare/authMiddleware.js';
const router=express.Router();

router.post('/',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,profileUser).put(protect,UpdateProfileUser)

export default router