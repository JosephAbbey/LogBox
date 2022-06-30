/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `App` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "App_name_key" ON "App"("name");
