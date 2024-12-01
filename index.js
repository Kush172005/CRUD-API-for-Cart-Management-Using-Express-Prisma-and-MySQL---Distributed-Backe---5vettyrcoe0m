const express = require("express");
const cartRoutes = require("./routes/cartRoutes");
// const { authMiddleware } = require("./middleware/authMiddleware");
const router = require("./routes/cartRoutes");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// app.use(authMiddleware);

app.use("/api/cart", cartRoutes);

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
