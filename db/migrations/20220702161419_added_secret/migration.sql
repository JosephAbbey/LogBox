/*
  Warnings:

  - Added the required column `secret` to the `WebHook` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebHook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "secret" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logId" INTEGER NOT NULL,
    CONSTRAINT "WebHook_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebHook" ("createdAt", "id", "logId", "updatedAt") SELECT "createdAt", "id", "logId", "updatedAt" FROM "WebHook";
DROP TABLE "WebHook";
ALTER TABLE "new_WebHook" RENAME TO "WebHook";
CREATE UNIQUE INDEX "WebHook_logId_key" ON "WebHook"("logId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
