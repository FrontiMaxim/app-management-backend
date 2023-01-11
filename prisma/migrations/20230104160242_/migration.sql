/*
  Warnings:

  - Changed the type of `apartment` on the `Object` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Object" DROP COLUMN "apartment",
ADD COLUMN     "apartment" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_apartment_key" ON "Object"("city", "street", "house", "apartment");
