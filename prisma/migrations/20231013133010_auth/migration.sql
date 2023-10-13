/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `auth_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `auth_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `auth_info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('user', 'admin', 'superAdmin');

-- AlterTable
ALTER TABLE "auth_info" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "EnumRole" NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "auth_info_email_key" ON "auth_info"("email");
