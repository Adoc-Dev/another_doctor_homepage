/*
  Warnings:

  - Made the column `thumbnail` on table `News` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."News" ALTER COLUMN "published" SET DEFAULT true,
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "date" SET NOT NULL;
