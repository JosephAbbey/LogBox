/*
  Warnings:

  - Added the required column `name` to the `Builder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Builder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Builder_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Builder" ("appId", "createdAt", "id", "updatedAt") SELECT "appId", "createdAt", "id", "updatedAt" FROM "Builder";
DROP TABLE "Builder";
ALTER TABLE "new_Builder" RENAME TO "Builder";
CREATE TABLE "new_App" (
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_App" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
