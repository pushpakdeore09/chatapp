import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/v1/register", userController.registerController);
router.post("/v1/login", userController.loginController);
router.get(
  "/v1/profile",
  authMiddleware.authUser,
  userController.profileController
);
router.post("/v1/reset-password", userController.resetPasswordController);
router.post("/v1/verify-otp", userController.verifyOtpController);
router.post("/v1/update-password", userController.updatePasswordController);
router.get("/v1/logout", authMiddleware.authUser, userController.logoutController);
export default router;
