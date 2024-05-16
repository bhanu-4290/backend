import express from  'express'
const router = express.Router()
import {deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/UserController.js"
import {verifyUser} from "../utlis/verifyToken.js"
//update 
router.put("/:id", verifyUser, updateUser);
//delete tour
router.delete("/:id" ,verifyUser,deleteUser);
//get single USer
router.get("/:id", verifyUser, getSingleUser);
//cerate new user 
router.get("/",  verifyUser, getAllUsers);
 export default router;