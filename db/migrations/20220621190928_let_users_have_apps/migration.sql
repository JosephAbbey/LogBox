-- CreateTable
CREATE TABLE "_AppToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AppToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "App" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppToUser_AB_unique" ON "_AppToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToUser_B_index" ON "_AppToUser"("B");
