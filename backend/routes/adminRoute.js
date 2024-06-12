import express from 'express'
import { authAdmin} from '../controllers/adminController.js';
 import { protect } from '../middleWare/authMiddleware.js';
 
const adminrouter=express.Router();

adminrouter.post('/')
adminrouter.post('/login',authAdmin)
adminrouter.post('/logout',)
adminrouter.route('/profile').get(protect).put(protect)

export default adminrouter