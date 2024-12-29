import Image from "next/image";
import mila from "@/public/images/Mila.jpg";

const InfoBoxes = ({
  heading,
  backgroundColor = "bg-gray-100",
  children,
  backgroundImage,
}) => {
  return (
    <div
      className={`${backgroundColor} p-6 rounded-lg shadow-md flex flex-col items-center`}
    >
      <Image
        className="flex-none rounded-lg size-24"
        src={mila}
        alt="Mila and Mika"
      ></Image>
      <h1 className="text-5xl font-bold">{heading} </h1>
      {/* //todo multiple lucide icons */}
      <p className="mt-2 mb-4">{children}</p>
    </div>
  );
};

export default InfoBoxes;
