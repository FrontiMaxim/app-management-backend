/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_id_user_fkey";

-- DropTable
DROP TABLE "Attendance";

-- CreateTable
CREATE TABLE "Session" (
    "id_session" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id_session")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
