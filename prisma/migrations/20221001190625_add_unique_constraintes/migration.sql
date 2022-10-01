/*
  Warnings:

  - A unique constraint covering the columns `[browserId,gifId]` on the table `DownVotes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[browserId,gifId]` on the table `UpVotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DownVotes_browserId_gifId_key" ON "DownVotes"("browserId", "gifId");

-- CreateIndex
CREATE UNIQUE INDEX "UpVotes_browserId_gifId_key" ON "UpVotes"("browserId", "gifId");
