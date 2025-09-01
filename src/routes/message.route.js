import Router from "express"
import { getMessage } from "../controllers/message.controller"
import { verifyJWT } from "../middlewares/auth.middlewares";

const router=Router();

router.use(verifyJWT)

router.route(':/receiverId').get(getMessage)

export default router;