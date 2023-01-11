/*
  Warnings:

  - You are about to drop the column `data` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `date` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_id_user_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "data",
ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "id_user" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
