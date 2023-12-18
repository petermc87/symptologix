-- CreateTable
CREATE TABLE "CalendarDates" (
    "id" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "CalendarDates_pkey" PRIMARY KEY ("id")
);
