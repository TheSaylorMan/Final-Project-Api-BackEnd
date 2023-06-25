/*
  Warnings:

  - Added the required column `value` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cost" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
