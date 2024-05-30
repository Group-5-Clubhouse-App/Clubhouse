-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postid_fkey";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
