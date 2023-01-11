/*
  Warnings:

  - Changed the type of `data` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time_start` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time_end` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data_start` on the `Object` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
DROP COLUMN "time_start",
ADD COLUMN     "time_start" TIMESTAMP(3) NOT NULL,
DROP COLUMN "time_end",
ADD COLUMN     "time_end" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Object" DROP COLUMN "data_start",
ADD COLUMN     "data_start" TIMESTAMP(3) NOT NULL;
