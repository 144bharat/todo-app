/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Todo] ADD CONSTRAINT [Todo_id_userId_key] UNIQUE NONCLUSTERED ([id], [userId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
