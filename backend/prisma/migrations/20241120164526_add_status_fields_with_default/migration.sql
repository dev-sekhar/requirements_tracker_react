-- AlterTable
ALTER TABLE `organization` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `portfolio` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `program` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `project` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `tenant` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Active';
