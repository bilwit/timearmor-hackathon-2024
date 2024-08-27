/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `camera` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `model` to the `camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_mjpeg` to the `camera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "camera" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "model" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url_mjpeg" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "camera_name_key" ON "camera"("name");
