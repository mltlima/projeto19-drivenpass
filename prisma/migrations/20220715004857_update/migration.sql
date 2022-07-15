/*
  Warnings:

  - A unique constraint covering the columns `[userId,label]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `SafeNote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,label]` on the table `Wifi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "documentTypes" AS ENUM ('RG', 'CNH');

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "emissionDate" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "issuingAuthority" TEXT NOT NULL,
    "type" "documentTypes" NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_userId_type_key" ON "Document"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_label_key" ON "Card"("userId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_userId_name_key" ON "Credential"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "SafeNote_userId_title_key" ON "SafeNote"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Wifi_userId_label_key" ON "Wifi"("userId", "label");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
