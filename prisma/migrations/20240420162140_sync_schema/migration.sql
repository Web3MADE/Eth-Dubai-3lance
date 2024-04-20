/*
  Warnings:

  - A unique constraint covering the columns `[jobHash]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobHash" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobHash_key" ON "Job"("jobHash");
