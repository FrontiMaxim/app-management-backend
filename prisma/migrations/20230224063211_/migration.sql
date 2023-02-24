-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
