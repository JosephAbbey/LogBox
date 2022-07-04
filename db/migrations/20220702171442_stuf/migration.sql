/*
  Warnings:

  - You are about to drop the column `builderId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Log` table. All the data in the column will be lost.
  - Added the required column `level` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logsId` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "builderId" INTEGER,
    "hostId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Logs_builderId_fkey" FOREIGN KEY ("builderId") REFERENCES "Builder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Logs_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "logsId" INTEGER NOT NULL,
    CONSTRAINT "Log_logsId_fkey" FOREIGN KEY ("logsId") REFERENCES "Logs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_WebHook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logId" INTEGER NOT NULL,
    CONSTRAINT "WebHook_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Logs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebHook" ("createdAt", "id", "logId", "updatedAt") SELECT "createdAt", "id", "logId", "updatedAt" FROM "WebHook";
DROP TABLE "WebHook";
ALTER TABLE "new_WebHook" RENAME TO "WebHook";
CREATE UNIQUE INDEX "WebHook_logId_key" ON "WebHook"("logId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
