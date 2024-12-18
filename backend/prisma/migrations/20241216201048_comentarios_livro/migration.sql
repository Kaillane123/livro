/*
  Warnings:

  - Added the required column `livroCod` to the `Comentarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comentarios` ADD COLUMN `livroCod` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_livroCod_fkey` FOREIGN KEY (`livroCod`) REFERENCES `Livro`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;
