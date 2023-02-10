-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_id_object_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "Object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;
