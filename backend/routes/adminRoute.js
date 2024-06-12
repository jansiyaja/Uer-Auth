import express from 'express'

import { 
    authAdmin,
    logoutAdmin,
    getUsers,
    addNewUser,
    editUser,
    deleteUser,
} from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute
.post('/' , authAdmin)
.post('/logout' , logoutAdmin)
.get('/users' , getUsers)
.post('/users' , addNewUser)
.put('/users', editUser)
.delete('/users', deleteUser)

export default adminRoute;