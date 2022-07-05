-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Webhook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT NEWID(),
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logsId" INTEGER NOT NULL,
    CONSTRAINT "Webhook_logsId_fkey" FOREIGN KEY ("logsId") REFERENCES "Logs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Webhook" ("createdAt", "id", "logsId", "updatedAt") SELECT "createdAt", "id", "logsId", "updatedAt" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
CREATE UNIQUE INDEX "Webhook_id_key" ON "Webhook"("id");
CREATE UNIQUE INDEX "Webhook_logsId_key" ON "Webhook"("logsId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
