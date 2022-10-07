/*
  Warnings:

  - Added the required column `airDate` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "airDate" TIMESTAMP(3) NOT NULL;
