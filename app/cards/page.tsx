import InfoBoxes from "@/components/InfoBoxes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthday Cards",
  description: "Collection of birthday messages and memories for Mila's special celebrations over the years.",
  openGraph: {
    title: "Birthday Cards | Happy Birthday Mila",
    description: "Collection of birthday messages and memories for Mila's special celebrations.",
  }
};

const CardsPage = () => {
  return <InfoBoxes />;
};

export default CardsPage;
