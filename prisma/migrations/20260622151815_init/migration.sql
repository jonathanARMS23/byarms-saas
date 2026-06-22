-- CreateEnum
CREATE TYPE "DemandeStatus" AS ENUM ('NOUVEAU', 'EN_COURS', 'REPONDU', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "AppelStatus" AS ENUM ('CONFIRME', 'EN_ATTENTE', 'TERMINE', 'ANNULE');

-- CreateTable
CREATE TABLE "Demande" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "sujet" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "budget" TEXT NOT NULL DEFAULT '',
    "status" "DemandeStatus" NOT NULL DEFAULT 'NOUVEAU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "heure" TEXT NOT NULL,
    "lien" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "status" "AppelStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appel_pkey" PRIMARY KEY ("id")
);
