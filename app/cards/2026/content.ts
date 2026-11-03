import photos from "./photos.json";

export type Skin = "paper" | "pink" | "kraft" | "stamp" | "torn" | "dark" | "arch";
export type TaskKind = "box" | "star" | "stamp" | "snow" | "pane";

export type Shot = {
  src: string;
  width: number;
  height: number;
  caption: string;
  skin: Skin;
  desktop: string; // Spalten im 12er-Raster, z. B. "1 / span 5"
  mobile: string;
  rotate: number;
  desktopTop: number; // Abstand nach oben, negativ = überlappt
  mobileTop: number;
};

const P = [1125, 1500];
const L = [1500, 1125];
const ROOM = [1014, 567];
const WIDE = [1500, 844];

function shot(src: string, [width, height]: number[], caption: string, skin: Skin, desktop: string, mobile: string, rotate: number, desktopTop = 0, mobileTop = 0): Shot {
  return { src, width, height, caption, skin, desktop, mobile, rotate, desktopTop, mobileTop };
}

export const chapters: {
  id: string;
  tab: string;
  title: string;
  note: string;
  label: string;
  task: string;
  doneText: string;
  kind: TaskKind;
  tokens: { glyph: string; found: string }[];
  shots: Shot[];
}[] = [
  {
    id: "Umzug",
    tab: "Umzug",
    title: "Ein neues Zuhause.",
    note: "Ein großer Schritt. Und mittendrin: wir.",
    label: "01 / KISTEN VOLLER ANFANG",
    task: "Öffne die drei kleinen Umzugskartons.",
    doneText: "Alles ausgepackt. Zuhause. ♡",
    kind: "box",
    tokens: [{ glyph: "", found: "4,25 m" }, { glyph: "", found: "8,25 m" }, { glyph: "", found: "und endlich: unser Zuhause ♡" }],
    shots: [
      shot(photos.Umzug[0], ROOM, "Wohnung vermessen: super anstrengend …", "paper", "1 / span 6", "1 / span 11", -4, 10, 0),
      shot(photos.Umzug[1], ROOM, "… aber endlich unsere erste eigene Wohnung.", "pink", "7 / span 6", "2 / span 11", 4, 60, -8),
      shot(photos.Umzug[2], [844, 1500], "Die Bauleitung hat gesprochen.", "torn", "2 / span 3", "1 / span 6", -8, -10, 14),
      shot(photos.Umzug[3], WIDE, "Ich kann es kaum fassen: Wir sind endlich zusammengezogen.", "stamp", "5 / span 8", "3 / span 10", 3, 40, -30),
    ],
  },
  {
    id: "Planetarium",
    tab: "Planetarium",
    title: "Du, ich & das Universum.",
    note: "Ein kleiner Ausflug zwischen die Sterne.",
    label: "02 / FÜR MEINEN MONDSCHEIN",
    task: "Lass die drei Sterne für uns leuchten.",
    doneText: "Das bist du. ♡",
    kind: "star",
    tokens: [{ glyph: "", found: "Ich liebe dich" }, { glyph: "", found: "bis zum Mond" }, { glyph: "", found: "und zurück." }],
    shots: [
      shot(photos.Planetarium[0], P, "Ich liebe dich bis zum Mond …", "dark", "2 / span 5", "1 / span 9", -5, 0, 0),
      shot(photos.Planetarium[1], P, "… und zurück.", "arch", "7 / span 5", "4 / span 9", 6, 90, -36),
    ],
  },
  {
    id: "Berlin",
    tab: "Berlin",
    title: "Für dich bis nach Berlin.",
    note: "Ein veganer REWE. Ein süßes Café. Und du dabei.",
    label: "03 / EINFACH MAL LOS",
    task: "Ein kleiner Abstecher? Sammle unsere drei Reiseandenken.",
    doneText: "Berlin. ♡",
    kind: "stamp",
    tokens: [{ glyph: "❦", found: "Du" }, { glyph: "☕︎", found: "Ich" }, { glyph: "♡", found: "Süßestes Date der Welt" }],
    shots: [
      shot(photos.Berlin[0], P, "Unser spontanstes Date bisher.", "stamp", "1 / span 5", "1 / span 9", -6, 20, 0),
      shot(photos.Berlin[1], P, "Für die Aesthetics.", "kraft", "7 / span 5", "4 / span 9", 5, 0, -30),
    ],
  },
  {
    id: "Family_Winter",
    tab: "Winter",
    title: "Winter in Hamburg.",
    note: "Kalte Nasen. Warme Mützen. Und ein paar Liebste mittendrin.",
    label: "04 / KALTE NASEN",
    task: "Lass drei kleine Flocken für uns schneien.",
    doneText: "Es schneit. ♡",
    kind: "snow",
    tokens: [{ glyph: "", found: "kalte Nasen" }, { glyph: "", found: "warme Mützen" }, { glyph: "", found: "und du mittendrin" }],
    shots: [
      shot(photos.Family_Winter[0], L, "Süße Erinnerungen …", "paper", "1 / span 6", "1 / span 11", -3, 0, 0),
      shot(photos.Family_Winter[1], L, "… mit der ganzen Familie.", "pink", "7 / span 6", "2 / span 11", 4, 50, -6),
      shot(photos.Family_Winter[2], P, "Ein Süßi im Winter.", "torn", "2 / span 4", "1 / span 7", -7, -10, 10),
      shot(photos.Family_Winter[3], P, "Eins meiner Favorites.", "stamp", "8 / span 4", "6 / span 7", 6, 20, -44),
    ],
  },
  {
    id: "CSD",
    tab: "CSD",
    title: "So schön, du zu sein.",
    note: "Unser CSD in Hamburg.",
    label: "05 / ALLE FARBEN VON DIR",
    task: "Bring die Farben in dieses Fenster zurück.",
    doneText: "Da sind sie wieder, alle Farben von dir. ♡",
    kind: "pane",
    tokens: [{ glyph: "", found: "" }, { glyph: "", found: "" }, { glyph: "", found: "" }],
    shots: [
      shot(photos.CSD[0], P, "Zwei Mausis in freier Wildbahn.", "pink", "1 / span 5", "1 / span 10", -5, 0, 0),
      shot(photos.CSD[1], P, "Endlich mal ein Zuhause gefunden.", "paper", "7 / span 5", "3 / span 10", 6, 60, -24),
      shot(photos.CSD[2], P, "Make-up: Slay.", "stamp", "3 / span 4", "1 / span 8", -8, -40, -20),
    ],
  },
];

export const portraits: Shot[] = [
  shot(photos.Favorites[0], L, "Beweisstück A: zu schön.", "paper", "1 / span 5", "1 / span 11", -4, 0, 0),
  shot(photos.Favorites[1], [1080, 1440], "Mein Mondschein, heute mal in Sonne.", "dark", "7 / span 3", "6 / span 7", 7, 40, -20),
  shot(photos.Favorites[2], P, "Herbst? Steht dir.", "arch", "10 / span 3", "1 / span 6", -5, -10, -30),
  shot(photos.Favorites[3], P, "Uff, ich glaube, ich kann nicht mehr.", "torn", "2 / span 4", "7 / span 6", 5, -30, 24),
  shot(photos.Favorites[4], P, "Slayyy Queen.", "pink", "6 / span 3", "1 / span 9", -7, 40, -16),
  shot(photos.Favorites[5], P, "Sliczna im Schnee.", "stamp", "9 / span 4", "6 / span 7", 4, -50, -36),
  shot(photos.Favorites[6], P, "Mein Burrito, frisch eingerollt.", "kraft", "3 / span 5", "2 / span 9", -3, -30, -20),
];

export const couple: Shot[] = [
  shot(photos.Favorite_Couple_Pics[2], P, "Mein liebstes Wir.", "paper", "1 / span 5", "1 / span 11", -4, 0, 0),
  shot(photos.Favorite_Couple_Pics[3], P, "Ein Bussi für die Akten.", "pink", "6 / span 3", "1 / span 6", 6, 60, -10),
  shot(photos.Favorite_Couple_Pics[7], P, "Die sind so cute.", "stamp", "9 / span 4", "7 / span 6", -5, 0, 10),
  shot(photos.Favorite_Couple_Pics[0], P, "Quality Time mit meinem Bibs.", "torn", "2 / span 3", "2 / span 9", 5, -40, -14),
  shot(photos.Favorite_Couple_Pics[4], P, "Kuschelstatus: kritisch.", "kraft", "5 / span 4", "1 / span 7", -6, 10, -24),
  shot(photos.Favorite_Couple_Pics[6], P, "Zu nah? Gibt's bei uns nicht.", "dark", "9 / span 3", "6 / span 7", 7, -30, -40),
  shot(photos.Favorite_Couple_Pics[5], P, "Pssst, nicht stören.", "arch", "1 / span 4", "1 / span 7", -3, -30, -26),
  shot(photos.Favorite_Couple_Pics[1], P, "Vorne ich, hinten mein Burrito.", "pink", "6 / span 5", "5 / span 8", 4, 10, -40),
];

export type AnimalKind = "bee" | "moth" | "cat" | "snail" | "ladybug" | "bat";
export type Animal = { id: string; page: string; pageName: string; kind: AnimalKind; tone?: string; hat?: boolean; sleeping?: boolean; name: string; latin: string; text: string; left: string; top: string };

export const animals: Animal[] = [
  { id: "hummi", page: "welcome", pageName: "Das Buch", kind: "bee", name: "Hummi", latin: "Bombus hummi", text: "Eigentlich viel zu flauschig zum Fliegen. Macht es trotzdem.", left: "2%", top: "16%" },
  { id: "kistenkatze", page: "Umzug", pageName: "Umzug", kind: "cat", tone: "#d99a5b", name: "Kistenkatze", latin: "Felis kartonensis", text: "Jeder Karton gehört ihr. Auch deiner.", left: "84%", top: "27%" },
  { id: "mondi", page: "Planetarium", pageName: "Planetarium", kind: "moth", name: "Mondi", latin: "Mottus lunaris", text: "Fliegt bis zum Mond und zurück. Und dann gegen die Lampe.", left: "2%", top: "33%" },
  { id: "schnecki", page: "Berlin", pageName: "Berlin", kind: "snail", name: "Schnecki", latin: "Helix veganensis", text: "Schon immer vegan. Nur etwas langsam im Café.", left: "84%", top: "20%" },
  { id: "schneekatze", page: "Family_Winter", pageName: "Winter", kind: "cat", tone: "#f3eee6", hat: true, name: "Schneekatze", latin: "Felis muetzensis", text: "Kalte Nase, warme Mütze, schlechte Laune.", left: "3%", top: "56%" },
  { id: "marie", page: "CSD", pageName: "CSD", kind: "ladybug", name: "Marie", latin: "Coccinella arcus", text: "Trägt alle Farben. Findet das völlig normal.", left: "86%", top: "20%" },
  { id: "schnurri", page: "portraits", pageName: "Einfach du", kind: "cat", tone: "#8d8590", name: "Schnurri", latin: "Felis schnurrus", text: "Schaut dir gern beim Schönsein zu.", left: "86%", top: "48%" },
  { id: "fledi", page: "couple", pageName: "Einfach wir", kind: "bat", name: "Fledi", latin: "Vesperugo kuschelus", text: "Hängt gern kopfüber und kuschelt trotzdem.", left: "3%", top: "62%" },
  { id: "postkatze", page: "letter", pageName: "Dein Brief", kind: "cat", tone: "#5b4752", sleeping: true, name: "Postkatze", latin: "Felis postalis", text: "Liegt auf dem Brief. Hat ihn nicht gelesen. Wahrscheinlich.", left: "76%", top: "22px" },
];

export const heroPhoto = photos.Favorite_Couple_Pics[2];
export const burritoPhoto = photos.Favorites[6];

export const letterGreeting = "Hallo mein Bibs,";
export const letterParagraphs = [
  "du bist endlich 23 geworden. Wir sind jetzt schon fast zwei Jahre zusammen, und ich wäre mit keiner anderen Person so gern zusammen wie mit dir. Du bist meine Queen, mein Baby, mein Bär.",
  "Wir haben dieses Jahr so viel erreicht, mit so vielen Ups und so vielen Downs. Wir waren in Berlin, im Planetarium und irgendwie überall unterwegs. Wir sind endlich umgezogen. Du hast dein eigenes Tattoo-Business aufgemacht, und ich habe irgendwann bei Muia angefangen. Wir waren bei deiner ersten Ausstellung im Bracula und bei deinem Kunstslam, was auch richtig cool war. Deine Family hat uns im Winter besucht.",
  "Wir waren zwischendurch übel happy, hatten aber auch ein paar Down-Phasen und sehr viel Stress mit anderem Stuff. Da sind wir jedes Mal zusammen durchgegangen. Und egal wie viel Stress wir jemals hatten: Am Ende bin ich einfach nur froh, dass du an meiner Seite bist.",
  "Du bist die Person, die mir immer Wärme gibt. Du bist immer für mich da, genauso wie ich immer für dich da bin. Ich liebe es, dich in all deinen Phasen zu supporten. Ich liebe es, im Hintergrund zu stehen, dich zu gießen und dich blühen zu sehen, und zu sehen, wie du in all deinen Sachen aufgehst.",
  "Beim CSD habe ich zum allerersten Mal einen Typen richtig gebussert, und du warst dabei. Du hast neue Freunde kennengelernt, die so süß sind, und so viele Menschen, die dein Leben einfach bereichern. Zu sehen, wie du zu der Person wirst, die du dir immer vorgestellt hast, ist das Schönste auf der Welt.",
  "Erinnerst du dich, wie du hierhergekommen bist und früher mal gesagt hast: „Boah, ich weiß nicht, was aus mir wird“? Und jetzt guck mal, wo du stehst. Imagine, du könntest deinem 15- oder 16-jährigen Ich zeigen, wo du heute bist. Die würde dir das nicht glauben. Der würde ein Ei aus der Hose fallen, weil sie sich das nicht vorstellen könnte.",
  "Du bist so tapfer, und du hast so viel geschafft. Du hast deine scheiß Weisheits-OP gemacht. Obwohl du Autismus hast und obwohl es dir schwerfällt, hast du dieses Jahr so viel gemanagt. Du gehst aktiver zur Therapie, und deine Therapie hat dich richtig weitergebracht. Und dass du mit mir zusammengezogen bist und damit deinen Safe Space teilst, bedeutet mir super viel.",
  "Auch wenn bei mir zurzeit vieles nicht gut läuft und meine Depressionen teilweise etwas doller sind, wollte ich dir sagen: Ich bin immer für dich da, und wir sind füreinander da. Und wenn wir bald noch ein Tier haben, dann sind wir eine große, süße Familie. Ich freue mich darauf, noch mehr Zeit mit dir zu verbringen. Für immer.",
];
