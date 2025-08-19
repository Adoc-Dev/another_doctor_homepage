/*
  Warnings:

  - You are about to drop the column `authorId` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."News" DROP CONSTRAINT "News_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_createdBy_fkey";

-- AlterTable
ALTER TABLE "public"."News" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdBy",
DROP COLUMN "role";

-- DropEnum
DROP TYPE "public"."UserRole";
