/*
  Warnings:

  - Added the required column `atualizadoEm` to the `Movimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movimentacao` ADD COLUMN `atualizadoEm` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `atualizadoEm` DATETIME(3) NOT NULL;
