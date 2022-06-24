import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { checkAuth } from "../middleware/checkAuth";

const userController = new UserController();

const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", checkAuth, userController.check);

export default router;
