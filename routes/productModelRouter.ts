import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { ProductModelController } from "../controllers/ProductModelController";
import { imgFileHandler } from "../middleware/imgFileHandler";

const productModelController = new ProductModelController();

const router = Router();

router.post(
  "/",
  checkRole("ADMIN"),
  imgFileHandler,
  productModelController.create
);

router.get("/", productModelController.getAll);

router.get("/:id", productModelController.getOne);

export default router;
