-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('STRING', 'BOOL', 'NUMBER');

-- CreateTable
CREATE TABLE "Setting" (
    "key" VARCHAR NOT NULL,
    "value" VARCHAR NOT NULL,
    "type" "SettingType" NOT NULL DEFAULT 'STRING',

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);
