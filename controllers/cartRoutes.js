const { prisma } = require("../db/config");

const create = async (req, res) => {
    const { userId, productId, count } = req.body;

    const newCart = await prisma.cart.create({
        data: {
            userId,
            productId,
            count,
        },
    });

    return res.status(201).json(newCart);
};

const get = async (req, res) => {
    const { id } = req.params;
    const val = await prisma.cart.findUnique({
        where: {
            cartId: Number(id),
        },
    });

    if (val) res.status(200).json(val);

    return res.status(404).json({
        error: "Cart not found",
    });
};

const update = async (req, res) => {
    const { count } = req.body;
    const { id } = req.params;
    const val = await prisma.cart.update({
        where: {
            cartId: Number(id),
        },
        data: { count: count },
    });

    return res.status(200).json(val);
};

const deleteRecord = async (req, res) => {
    const { id } = req.params;

    const del = await prisma.cart.delete({
        where: {
            cartId: Number(id),
        },
    });

    if (del) {
        return res.status(200).json({ message: "Cart deleted successfully" });
    }
};

const createMissing = async (req, res) => {
    const { userId, productId, count } = req.body;

    if (!userId || !productId || !count) {
        return res.status(404).json({ error: "All fields required" });
    }

    const newCart = await prisma.cart.create({
        data: {
            userId,
            productId,
            count,
        },
    });

    return res.status(201).json(newCart);
};

module.exports = { create, get, update, deleteRecord, createMissing };
