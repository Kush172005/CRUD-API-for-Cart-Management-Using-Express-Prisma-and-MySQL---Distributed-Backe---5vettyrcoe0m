const express = require("express");
const cartRoutes = require("./routes/cartRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
const router = require("./routes/cartRoutes");
const { prisma } = require("./db/config");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// app.use(authMiddleware);

app.post("/api/cart/addProduct", async (req, res) => {
    const { userId, productId, count } = req.body;

    if (!userId || !productId || !count) {
        return res.status(404).json({ error: "All fields required" });
    }

    try {
        const newCart = await prisma.cart.create({
            data: { userId, productId, count },
        });
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create cart entry" });
    }
});

// 2. Retrieve Cart Entry by ID
app.get("/api/cart/getById/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await prisma.cart.findUnique({
            where: { cartId: Number(id) },
        });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve cart entry" });
    }
});

// 3. Partially Update a Cart Entry
app.patch("/api/cart/patch/:id", async (req, res) => {
    const { id } = req.params;
    const { count } = req.body;

    try {
        const updatedCart = await prisma.cart.update({
            where: { cartId: Number(id) },
            data: { count },
        });

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Cart not found" });
    }
});

// 4. Delete a Cart Entry
app.delete("/api/cart/removeProduct/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.cart.delete({
            where: { cartId: Number(id) },
        });
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error });
    }
});

// 5. Attempt to Create a Product with Missing Fields
app.post("/api/products/create", async (req, res) => {
    const { userId, name, price } = req.body;

    if (!userId || !name || !price) {
        return res.status(404).json({ error: "All fields required" });
    }

    // Proceed with product creation...
    res.status(201).json({ message: "Product created" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
