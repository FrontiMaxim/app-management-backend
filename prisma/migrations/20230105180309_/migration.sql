/*
  Warnings:

  - Made the column `id_object` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_id_object_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "id_object" SET NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "id_comment" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "id_task" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id_comment")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id_resource" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "id_task" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id_attendance" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id_attendance")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "Object"("id_object") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
