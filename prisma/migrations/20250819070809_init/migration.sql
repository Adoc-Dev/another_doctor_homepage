-- CreateTable
CREATE TABLE "public"."News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT,
    "link" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
