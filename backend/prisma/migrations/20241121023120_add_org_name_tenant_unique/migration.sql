/*
  Warnings:

  - A unique constraint covering the columns `[name,tenantId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Organization_name_tenantId_key` ON `Organization`(`name`, `tenantId`);
