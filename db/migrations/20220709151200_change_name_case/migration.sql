/*
  Warnings:

  - The values [GITHUB] on the enum `RepositoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RepositoryType_new" AS ENUM ('GitHub');
ALTER TABLE "Repository" ALTER COLUMN "type" TYPE "RepositoryType_new" USING ("type"::text::"RepositoryType_new");
ALTER TYPE "RepositoryType" RENAME TO "RepositoryType_old";
ALTER TYPE "RepositoryType_new" RENAME TO "RepositoryType";
DROP TYPE "RepositoryType_old";
COMMIT;
