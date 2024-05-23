/*
  Warnings:

  - A unique constraint covering the columns `[userid,postid]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "likes_userid_postid_key" ON "likes"("userid", "postid");
