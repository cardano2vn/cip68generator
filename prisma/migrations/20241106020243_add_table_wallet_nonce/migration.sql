-- CreateTable
CREATE TABLE "wallet_nonce" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "wallet_nonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_nonce_address_key" ON "wallet_nonce"("address");
