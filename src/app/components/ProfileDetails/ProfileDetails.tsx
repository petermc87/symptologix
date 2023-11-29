import { useSession } from "next-auth/react";
import { useEffect } from "react";
import CreateSubscriber from "../../../../actions/createSubscriber/createSubscriber";
import { User } from "../../../../typings";

export default function ProfileDetails() {
  // Get user data to be added to the subscriber.
  const { data } = useSession();

  // Saving just the user data to a variable.
  const user: User | undefined = data?.user;

  console.log(user);
  // UseEffect will instigate the subscriber backend function
  // for testing.
  useEffect(() => {
    if (user) CreateSubscriber(user?.email, user?.name, user?.id);
  }, []);

  return <div>Profile Details</div>;
}
