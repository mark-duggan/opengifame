/*
  Warnings:

  - You are about to drop the column `downVotes` on the `Gif` table. All the data in the column will be lost.
  - You are about to drop the column `upVotes` on the `Gif` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gif" DROP COLUMN "downVotes",
DROP COLUMN "upVotes";

-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL,
    "isUp" BOOLEAN NOT NULL,
    "browserId" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gifId" TEXT NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_gifId_fkey" FOREIGN KEY ("gifId") REFERENCES "Gif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
