/*
  Warnings:

  - You are about to drop the `Votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_gifId_fkey";

-- DropTable
DROP TABLE "Votes";

-- CreateTable
CREATE TABLE "UpVotes" (
    "id" TEXT NOT NULL,
    "isUp" BOOLEAN NOT NULL,
    "browserId" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gifId" TEXT NOT NULL,

    CONSTRAINT "UpVotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DownVotes" (
    "id" TEXT NOT NULL,
    "isUp" BOOLEAN NOT NULL,
    "browserId" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gifId" TEXT NOT NULL,

    CONSTRAINT "DownVotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpVotes" ADD CONSTRAINT "UpVotes_gifId_fkey" FOREIGN KEY ("gifId") REFERENCES "Gif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownVotes" ADD CONSTRAINT "DownVotes_gifId_fkey" FOREIGN KEY ("gifId") REFERENCES "Gif"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
