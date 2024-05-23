/*
  Warnings:

  - You are about to drop the column `likes` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "likes",
ADD COLUMN     "like_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "postid" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
