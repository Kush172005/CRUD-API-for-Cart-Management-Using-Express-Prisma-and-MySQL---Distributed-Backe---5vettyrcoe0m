const express = require("express");
const {
    create,
    get,
    update,
    deleteRecord,
    createMissing,
} = require("../controllers/cartRoutes");

const router = express.Router();

router.post("/api/cart/addProduct", create);
router.get("/api/cart/getById/:id", get);
router.put("/api/cart/patch/:id", update);
router.delete("/api/cart/removeProduct/:id", deleteRecord);
router.post("/api/products/create", createMissing);

module.exports = router;
