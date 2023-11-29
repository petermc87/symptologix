"use server";

import { Novu } from "@novu/node";

export default async function GetSubscriber(id: string) {
  const novu = new Novu(`${process.env.NOVU_API}`);

  const subscriber = await novu.subscribers.get(id);
  console.log(subscriber);
  return subscriber;
}
