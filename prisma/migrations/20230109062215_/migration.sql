/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(52)`.
  - You are about to alter the column `login` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(14)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "data" SET DATA TYPE DATE,
ALTER COLUMN "time_start" SET DATA TYPE TIME,
ALTER COLUMN "time_end" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "Object" ALTER COLUMN "data_start" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "deadline" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(52),
ALTER COLUMN "login" SET DATA TYPE VARCHAR(14),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(10);
