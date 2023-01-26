-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "name" VARCHAR(52) NOT NULL,
    "login" VARCHAR(14) NOT NULL,
    "password" TEXT NOT NULL,
    "is_online" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT NOT NULL,
    "role" VARCHAR(10) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Object" (
    "id_object" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "apartment" INTEGER,
    "note" TEXT NOT NULL,
    "data_start" TEXT NOT NULL,
    "client" TEXT NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id_object")
);

-- CreateTable
CREATE TABLE "Task" (
    "id_task" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_object" TEXT NOT NULL,
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
    "originalName" TEXT NOT NULL,
    "storageName" TEXT NOT NULL,
    "id_task" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "Session" (
    "id_session" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id_session")
);

-- CreateTable
CREATE TABLE "_ObjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_note_key" ON "Object"("city", "street", "house", "note");

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_apartment_note_key" ON "Object"("city", "street", "house", "apartment", "note");

-- CreateIndex
CREATE UNIQUE INDEX "_ObjectToUser_AB_unique" ON "_ObjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ObjectToUser_B_index" ON "_ObjectToUser"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "Object"("id_object") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectToUser" ADD CONSTRAINT "_ObjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectToUser" ADD CONSTRAINT "_ObjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
