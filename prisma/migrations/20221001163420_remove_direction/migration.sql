/*
  Warnings:

  - You are about to drop the column `isUp` on the `DownVotes` table. All the data in the column will be lost.
  - You are about to drop the column `isUp` on the `UpVotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DownVotes" DROP COLUMN "isUp";

-- AlterTable
ALTER TABLE "UpVotes" DROP COLUMN "isUp";
