/*
  Warnings:

  - Made the column `time_end` on table `Attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "data" SET DATA TYPE TEXT,
ALTER COLUMN "time_start" SET DATA TYPE TEXT,
ALTER COLUMN "time_end" SET NOT NULL,
ALTER COLUMN "time_end" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "data" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Object" ALTER COLUMN "data_start" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "deadline" SET DATA TYPE TEXT;
