/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Gif` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Gif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gif" ADD COLUMN     "slug" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gif_slug_key" ON "Gif"("slug");
