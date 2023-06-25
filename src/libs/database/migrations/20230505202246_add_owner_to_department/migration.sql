-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "ownerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
