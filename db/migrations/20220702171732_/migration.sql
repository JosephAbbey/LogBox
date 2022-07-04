/*
  Warnings:

  - You are about to drop the column `logId` on the `WebHook` table. All the data in the column will be lost.
  - Added the required column `logsId` to the `WebHook` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WebHook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logsId" INTEGER NOT NULL,
    CONSTRAINT "WebHook_logsId_fkey" FOREIGN KEY ("logsId") REFERENCES "Logs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebHook" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "WebHook";
DROP TABLE "WebHook";
ALTER TABLE "new_WebHook" RENAME TO "WebHook";
CREATE UNIQUE INDEX "WebHook_logsId_key" ON "WebHook"("logsId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
