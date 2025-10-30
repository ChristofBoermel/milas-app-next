import { redirect } from "next/navigation";

export default function CardsPage() {
  // Redirect to the latest birthday year
  redirect("/cards/2025");
}
