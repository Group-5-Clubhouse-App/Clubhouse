-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_icon" SET DEFAULT 'https://example.com/default-avatar.jpg';

-- CreateTable
CREATE TABLE "dms" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "dms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "time_sent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dmid" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserDms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserDms_AB_unique" ON "_UserDms"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDms_B_index" ON "_UserDms"("B");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_dmid_fkey" FOREIGN KEY ("dmid") REFERENCES "dms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_UserDms" ADD CONSTRAINT "_UserDms_A_fkey" FOREIGN KEY ("A") REFERENCES "dms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDms" ADD CONSTRAINT "_UserDms_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
