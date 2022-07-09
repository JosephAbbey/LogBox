/*
  Warnings:

  - The primary key for the `Webhook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Webhook` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Repository` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "RepositoryType" AS ENUM ('GITHUB');

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "type",
ADD COLUMN     "type" "RepositoryType" NOT NULL;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- AlterTable
ALTER TABLE "Webhook" DROP CONSTRAINT "Webhook_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Webhook_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_id_key" ON "Webhook"("id");
