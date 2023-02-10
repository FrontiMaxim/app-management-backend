-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_id_task_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_id_task_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id_task") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id_task") ON DELETE CASCADE ON UPDATE CASCADE;
