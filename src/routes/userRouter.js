import express  from "express";
import userController from "../controllers/userController.js";



const router = express.Router();

router
    .get('/user', userController.getUsers)
    .get('/user/:id', userController.getUserById)
    .post('/user', userController.createUser)
    .put('/user/:id', userController.updateUser)
    .delete('/user/:id', userController.deleteUser)
   

export default router;