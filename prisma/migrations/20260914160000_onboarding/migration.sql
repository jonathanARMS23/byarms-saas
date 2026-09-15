CREATE TABLE "Onboarding" (
  "id" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "offer" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "answers" JSONB NOT NULL DEFAULT '{}',
  "gates" JSONB NOT NULL DEFAULT '{}',
  "revision" INTEGER NOT NULL DEFAULT 0,
  "submittedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "OnboardingAccess" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "onboardingId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  CONSTRAINT "OnboardingAccess_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "OnboardingAccess_tokenHash_key" ON "OnboardingAccess"("tokenHash");
CREATE INDEX "OnboardingAccess_onboardingId_idx" ON "OnboardingAccess"("onboardingId");
ALTER TABLE "OnboardingAccess" ADD CONSTRAINT "OnboardingAccess_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "Onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
