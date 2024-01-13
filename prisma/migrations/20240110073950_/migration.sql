/*
  Warnings:

  - You are about to drop the column `pagamento` on the `transacoes` table. All the data in the column will be lost.
  - Added the required column `valor` to the `transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "valor" DROP COLUMN "pagamento",
ADD COLUMN     "valor" REAL NOT NULL;
