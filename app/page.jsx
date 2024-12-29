import Image from "next/image";

const HomePage = () => {
  return (
    <div className="text-white flex justify-center items-center pt-20 flex-wrap">
      <div>
        <h1 className="text-center text-8xl font-serif bg-gradient-to-br from-purple-700 to-pink-700 bg-clip-text text-transparent">
          Happy Birthday Babyyy
        </h1>
      </div>
      <div>
        <Image
          src={"/images/astronauts.png"}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-t-xl"
        />
      </div>
      <div className="text-pretty">
        <p className="text-center text-xl">
          Hey Frettchen, hier ist eine kleine Website für dich, die ich jeden
          Geburtstag updaten werde. Ich wünsche dir alles gute zum Geburtstag
          und hoffe, dass ich dich so gut unterstützen kann, wie du mich. Du
          kannst die Website nutzen, wenn du dir mal nicht sicher sein solltest,
          wie unglaublich viel du mir eigentlich bedeutest. Vergiss nie, du bist
          für mich, wie ein warmer Regen an einem schönen Herbstmorgen
        </p>
      </div>
    </div>
  );
};

export default HomePage;
