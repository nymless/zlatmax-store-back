import typeRouter from "./typeRouter";
import categoryRouter from "./categoryRouter";
import brandRouter from "./brandRouter";
import bladeMaterialRouter from "./bladeMaterialRouter";
import userRouter from "./userRouter";
import productModelRouter from "./productModelRouter";
import handleMaterialRouter from "./handleMaterialRouter";
import handguardMaterialRouter from "./handguardMaterialRouter";
import gildingRouter from "./gildingRouter";

const router = require("express").Router();

router.use("/user", userRouter);
// router.use("/cart", cartRouter);
// router.use("/order", orderRouter);
router.use("/product-model", productModelRouter);
// router.use("/product", productRouter);
router.use("/type", typeRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/blade-material", bladeMaterialRouter);
router.use("/handle-material", handleMaterialRouter);
router.use("/handguard-material", handguardMaterialRouter);
router.use("/gilding", gildingRouter);

module.exports = router;
