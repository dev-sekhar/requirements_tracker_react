/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subdomain]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subdomain` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tenant` ADD COLUMN `subdomain` VARCHAR(191) NULL;

-- Update existing records with a default subdomain based on their name
UPDATE `Tenant` 
SET `subdomain` = LOWER(REPLACE(REPLACE(name, ' ', '-'), '.', '-'));

-- Add unique constraint to name
ALTER TABLE `Tenant` ADD UNIQUE INDEX `Tenant_name_key`(`name`);

-- Make subdomain required and unique
ALTER TABLE `Tenant` MODIFY COLUMN `subdomain` VARCHAR(191) NOT NULL;
ALTER TABLE `Tenant` ADD UNIQUE INDEX `Tenant_subdomain_key`(`subdomain`);

-- Add index for subdomain lookups
ALTER TABLE `Tenant` ADD INDEX `Tenant_subdomain_idx`(`subdomain`);
