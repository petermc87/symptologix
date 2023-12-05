import { Novu } from "@novu/node";

// NOTES: Have a notification procedure setup based on the
// user preference. Ex. if the user wants to log three times
// a day,

export default async function NotificationEmail() {
  const novu = new Novu(`${process.env.NOVU_API}`);

  novu.trigger("event-reminder", {
    to: {
      subscriberId: "<REPLACE_WITH_DATA>",
      email: "<REPLACE_WITH_DATA>",
    },
    payload: {
      // Pass in the required field (event name & date)
      eventName: "<REPLACE_WITH_DATA>",
      eventDate: "<REPLACE_WITH_DATA>",
      rsvpLink: "<REPLACE_WITH_DATA>",
      "": "<REPLACE_WITH_DATA>",
    },
  });
}
