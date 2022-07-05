/*
  Warnings:

  - You are about to drop the `WebHook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WebHook";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Webhook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logsId" INTEGER NOT NULL,
    CONSTRAINT "Webhook_logsId_fkey" FOREIGN KEY ("logsId") REFERENCES "Logs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_logsId_key" ON "Webhook"("logsId");
