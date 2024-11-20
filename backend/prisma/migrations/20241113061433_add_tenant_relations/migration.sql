/*
  Warnings:

  - You are about to drop the column `key` on the `portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `program` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[portfolioKey]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[programKey]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectKey]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[requirementKey]` on the table `Requirement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantId` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `ArchitectureLayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolioKey` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programKey` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectKey` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirementKey` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Risk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Risk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Portfolio_key_key` ON `portfolio`;

-- DropIndex
DROP INDEX `Program_key_key` ON `program`;

-- DropIndex
DROP INDEX `Project_key_key` ON `project`;

-- AlterTable
ALTER TABLE `activitylog` ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `architecturelayer` ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `component` ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `organization` ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `portfolio` DROP COLUMN `key`,
    ADD COLUMN `portfolioKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `program` DROP COLUMN `key`,
    ADD COLUMN `programKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `key`,
    ADD COLUMN `projectKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `requirement` ADD COLUMN `requirementKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `resource` ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `risk` ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `tenantId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tenant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Portfolio_portfolioKey_key` ON `Portfolio`(`portfolioKey`);

-- CreateIndex
CREATE UNIQUE INDEX `Program_programKey_key` ON `Program`(`programKey`);

-- CreateIndex
CREATE UNIQUE INDEX `Project_projectKey_key` ON `Project`(`projectKey`);

-- CreateIndex
CREATE UNIQUE INDEX `Requirement_requirementKey_key` ON `Requirement`(`requirementKey`);

-- AddForeignKey
ALTER TABLE `Organization` ADD CONSTRAINT `Organization_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Portfolio` ADD CONSTRAINT `Portfolio_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArchitectureLayer` ADD CONSTRAINT `ArchitectureLayer_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resource` ADD CONSTRAINT `Resource_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Risk` ADD CONSTRAINT `Risk_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
