/*
  Warnings:

  - You are about to drop the `AuthInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AuthInfo";

-- CreateTable
CREATE TABLE "auth_info" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_info_pkey" PRIMARY KEY ("id")
);
