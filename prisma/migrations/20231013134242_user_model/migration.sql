/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `auth_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `auth_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auth_info" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "bio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_info_userId_key" ON "auth_info"("userId");

-- AddForeignKey
ALTER TABLE "auth_info" ADD CONSTRAINT "auth_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
