/*
  Warnings:

  - You are about to drop the column `valor` on the `transacoes` table. All the data in the column will be lost.
  - Added the required column `pagamento` to the `transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transacoes" DROP COLUMN "valor",
ADD COLUMN     "pagamento" DOUBLE PRECISION NOT NULL;
