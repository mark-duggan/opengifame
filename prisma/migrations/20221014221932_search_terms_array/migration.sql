/*
  Warnings:

  - The `searchTerms` column on the `Gif` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Gif" DROP COLUMN "searchTerms",
ADD COLUMN     "searchTerms" VARCHAR(2000)[];
