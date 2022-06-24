import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { SelectorController } from "../controllers/SelectorController";
import { Category } from "../db/models/Category";
import { imgFileHandler } from "../middleware/imgFileHandler";

const categoryController = new SelectorController(Category);

const router = Router();

router.post("/", checkRole("ADMIN"), imgFileHandler, categoryController.create);

router.put("/", checkRole("ADMIN"), imgFileHandler, categoryController.update);

router.get("/", categoryController.getAll);

export default router;
