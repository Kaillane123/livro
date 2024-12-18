/*
  Warnings:

  - The primary key for the `livro` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `Comentarios_livroCod_fkey`;

-- DropForeignKey
ALTER TABLE `lista_fav` DROP FOREIGN KEY `Lista_fav_livroCod_fkey`;

-- DropForeignKey
ALTER TABLE `livro_user` DROP FOREIGN KEY `Livro_user_livroCod_fkey`;

-- AlterTable
ALTER TABLE `comentarios` MODIFY `livroCod` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `lista_fav` MODIFY `livroCod` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `livro` DROP PRIMARY KEY,
    MODIFY `cod` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`cod`);

-- AlterTable
ALTER TABLE `livro_user` MODIFY `livroCod` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Lista_fav` ADD CONSTRAINT `Lista_fav_livroCod_fkey` FOREIGN KEY (`livroCod`) REFERENCES `Livro`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentarios` ADD CONSTRAINT `Comentarios_livroCod_fkey` FOREIGN KEY (`livroCod`) REFERENCES `Livro`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livro_user` ADD CONSTRAINT `Livro_user_livroCod_fkey` FOREIGN KEY (`livroCod`) REFERENCES `Livro`(`cod`) ON DELETE RESTRICT ON UPDATE CASCADE;
