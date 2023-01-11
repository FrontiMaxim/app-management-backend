/*
  Warnings:

  - A unique constraint covering the columns `[city,street,house,note]` on the table `Object` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[city,street,house,apartment,note]` on the table `Object` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `note` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Object_city_street_house_apartment_key";

-- DropIndex
DROP INDEX "Object_city_street_house_key";

-- AlterTable
ALTER TABLE "Object" ADD COLUMN     "note" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_note_key" ON "Object"("city", "street", "house", "note");

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_apartment_note_key" ON "Object"("city", "street", "house", "apartment", "note");
