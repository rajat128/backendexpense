import express from 'express';
import { registerControllers,loginControllers,setAvatarController,allUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/setAvatar/:id").post(setAvatarController);
// router.route('/').get(allUsers)
export default router;