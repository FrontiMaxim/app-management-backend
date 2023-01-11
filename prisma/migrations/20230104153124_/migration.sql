-- CreateTable
CREATE TABLE "Object" (
    "id_object" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "apartment" TEXT NOT NULL,
    "data_start" TIMESTAMP(3) NOT NULL,
    "client" TEXT NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id_object")
);

-- CreateTable
CREATE TABLE "_ObjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_key" ON "Object"("city", "street", "house");

-- CreateIndex
CREATE UNIQUE INDEX "Object_city_street_house_apartment_key" ON "Object"("city", "street", "house", "apartment");

-- CreateIndex
CREATE UNIQUE INDEX "_ObjectToUser_AB_unique" ON "_ObjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ObjectToUser_B_index" ON "_ObjectToUser"("B");

-- AddForeignKey
ALTER TABLE "_ObjectToUser" ADD CONSTRAINT "_ObjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectToUser" ADD CONSTRAINT "_ObjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
