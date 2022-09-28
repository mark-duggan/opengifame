/*
  Warnings:

  - Added the required column `fileName` to the `Gif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gif" ADD COLUMN     "fileName" VARCHAR(100) NOT NULL;
