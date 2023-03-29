/*
  Warnings:

  - Added the required column `id_user` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
