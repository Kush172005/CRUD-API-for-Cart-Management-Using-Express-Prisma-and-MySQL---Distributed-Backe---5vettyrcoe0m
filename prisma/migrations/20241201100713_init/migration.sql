-- CreateTable
CREATE TABLE "Cart" (
    "cartId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cartId")
);
