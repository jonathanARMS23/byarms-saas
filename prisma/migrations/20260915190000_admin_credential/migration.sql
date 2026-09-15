-- Bootstrap requested administrator credential; plaintext is never persisted.
CREATE TABLE "AdminCredential" (
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminCredential_pkey" PRIMARY KEY ("email")
);
INSERT INTO "AdminCredential" ("email", "passwordHash")
VALUES ('admin@byarms.com', '$2b$12$FC1uTeta0f7a0FgPraHfKu2XfrgFqBdHVnoMGBqWQw4Ic5rkev1nS');
