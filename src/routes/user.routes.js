import Router from "router";

import { loginUser,logOutUser,registerUser } from "../controllers/user.controllers";
import {verifyJWT} from '../middlewares/auth.middlewares.js';

const router=Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//you must be logged in to log out
router.route("/logout").post(logOutUser)


export default router;