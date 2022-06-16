/*
  Warnings:

  - Added the required column `movieId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
