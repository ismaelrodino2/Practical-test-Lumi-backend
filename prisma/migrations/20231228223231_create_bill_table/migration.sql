-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "eletricityConsumption" DOUBLE PRECISION NOT NULL,
    "eletricityCost" DOUBLE PRECISION NOT NULL,
    "sceeeeConsumption" DOUBLE PRECISION NOT NULL,
    "sceeeeCost" DOUBLE PRECISION NOT NULL,
    "gdiEnergyConsumption" DOUBLE PRECISION NOT NULL,
    "gdiEnergyCost" DOUBLE PRECISION NOT NULL,
    "publicContribution" DOUBLE PRECISION NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_id_key" ON "Bill"("id");
