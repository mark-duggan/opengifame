/*
  Warnings:

  - You are about to drop the column `name` on the `Season` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number,seasonId]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Season` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Season" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Episode_number_seasonId_key" ON "Episode"("number", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_number_key" ON "Season"("number");
