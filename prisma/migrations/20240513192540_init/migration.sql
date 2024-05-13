-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profile_icon" TEXT NOT NULL DEFAULT '../imgs/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg',
ALTER COLUMN "bio" SET DEFAULT 'Welcome to my profile';
