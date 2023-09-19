//Login form will take in events for name, username, email, password
import db from "@/app/modules/db";

export async function loginForm(email: string) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return "Email is incorrect. Please try again.";
  }
}
