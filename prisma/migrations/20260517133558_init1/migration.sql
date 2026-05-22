/*
  Warnings:

  - The values [MEMBERSHIP_EXPIRING,PAYMENT_RECEIVED] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `ActivityLog` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `documents` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OrganizationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `dueMembershipFee` on the `OrganizationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `sessionTimeout` on the `OrganizationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorAuth` on the `OrganizationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrganizationSettings` table. All the data in the column will be lost.
  - You are about to drop the column `mobileProvider` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `sessionTimeout` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `OrganizationRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `Dependent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Dependent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organizationId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('PAYMENT_REMINDER', 'EVENT_REMINDER', 'ANNOUNCEMENT', 'DOCUMENT_SHARED', 'SYSTEM');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationRequest" DROP CONSTRAINT "OrganizationRequest_organizationId_fkey";

-- DropIndex
DROP INDEX "ActivityLog_entity_idx";

-- DropIndex
DROP INDEX "ActivityLog_organizationId_idx";

-- DropIndex
DROP INDEX "ActivityLog_userId_idx";

-- DropIndex
DROP INDEX "OrganizationMember_userId_idx";

-- DropIndex
DROP INDEX "User_role_idx";

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "description",
DROP COLUMN "ipAddress",
DROP COLUMN "metadata",
DROP COLUMN "userAgent";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "name",
DROP COLUMN "period",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dependent" DROP COLUMN "documents",
DROP COLUMN "photo",
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "issueDate",
ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "organizationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "dateOfBirth",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationSettings" DROP COLUMN "createdAt",
DROP COLUMN "dueMembershipFee",
DROP COLUMN "sessionTimeout",
DROP COLUMN "twoFactorAuth",
DROP COLUMN "updatedAt",
ADD COLUMN     "membershipFee" INTEGER;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "mobileProvider";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sessionTimeout";

-- DropTable
DROP TABLE "OrganizationRequest";

-- DropEnum
DROP TYPE "RequestStatus";

-- CreateIndex
CREATE INDEX "Budget_organizationId_idx" ON "Budget"("organizationId");

-- CreateIndex
CREATE INDEX "Document_organizationId_idx" ON "Document"("organizationId");

-- CreateIndex
CREATE INDEX "Invoice_organizationId_idx" ON "Invoice"("organizationId");

-- CreateIndex
CREATE INDEX "Payment_organizationId_idx" ON "Payment"("organizationId");

-- CreateIndex
CREATE INDEX "Payment_memberId_idx" ON "Payment"("memberId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
