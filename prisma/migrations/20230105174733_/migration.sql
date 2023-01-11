-- CreateTable
CREATE TABLE "Task" (
    "id_task" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_object" TEXT,
    "id_user" TEXT,
    "id_status" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id_task")
);

-- CreateTable
CREATE TABLE "Status" (
    "id_status" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id_status")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "Object"("id_object") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;
