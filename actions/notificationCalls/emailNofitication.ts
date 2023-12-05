"use server";

import { Novu } from "@novu/node";

// NOTES: Have a notification procedure setup based on the
// user preference. Ex. if the user wants to log three times
// a day, we automatically set this for everyday up until the
// specified end date.

export default async function NotificationEmail(id: string, email: string) {
  const novu = new Novu(`${process.env.NOVU_API}`);

  // Add the current date/time UTC string to the payload
  // on trigger of this function.

  // Get the current date/time in UTC format.
  let now = new Date().toISOString();

  novu.trigger("event-reminder", {
    to: {
      subscriberId: id,
      email: email,
    },
    payload: {
      // Pass in the required field (event name & date)
      eventName: "Placeholder",
      eventDate: now,
      rsvpLink: "localhost:3000",
      "": "<REPLACE_WITH_DATA>",
    },
  });
}
