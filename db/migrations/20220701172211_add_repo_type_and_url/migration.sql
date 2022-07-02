/*
  Warnings:

  - Added the required column `type` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Repository" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "appId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "Repository_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Repository" ("appId", "createdAt", "id", "name", "updatedAt") SELECT "appId", "createdAt", "id", "name", "updatedAt" FROM "Repository";
DROP TABLE "Repository";
ALTER TABLE "new_Repository" RENAME TO "Repository";
CREATE UNIQUE INDEX "Repository_appId_key" ON "Repository"("appId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
