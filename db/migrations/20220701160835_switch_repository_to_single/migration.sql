/*
  Warnings:

  - A unique constraint covering the columns `[appId]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Repository_appId_key" ON "Repository"("appId");
