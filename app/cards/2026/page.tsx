"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { animals, burritoPhoto, chapters, couple, heroPhoto, letterGreeting, letterParagraphs, portraits, type Animal, type Shot, type TaskKind } from "./content";
import styles from "./birthday.module.css";

const STORAGE_KEY = "mila-2026";
const GLASS = ["#b93a68", "#e4a13a", "#7a1f4b", "#ea8fab", "#c98a2c", "#5d2a6e"];
const PRIDE = ["#d6364f", "#ee8a2c", "#f0c93c", "#3f9e5c", "#3b6fc4", "#8344b0"];
const pages = ["welcome", ...chapters.map(c => c.id), "portraits", "couple", "letter", "invite"];

function formatDate(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join(".");
}

function Bee({ className = styles.bee }: { className?: string }) {
  return <svg className={className} viewBox="0 0 130 90" fill="none" aria-hidden="true"><ellipse cx="49" cy="24" rx="15" ry="22" transform="rotate(-35 49 24)" stroke="currentColor" fill="#fdf3ea"/><ellipse cx="76" cy="24" rx="15" ry="22" transform="rotate(35 76 24)" stroke="currentColor" fill="#fdf3ea"/><ellipse cx="64" cy="51" rx="30" ry="21" stroke="currentColor" fill="#eab54a"/><path d="M52 32v38m15-39v40m15-33v27" stroke="currentColor" strokeWidth="6"/><circle cx="96" cy="47" r="13" fill="currentColor"/><path d="m99 35 2-12m-7 14-6-11M37 51l-13 3m29 17-6 10m25-10 5 10" stroke="currentColor" strokeWidth="2"/></svg>;
}

function Moth({ small = false, className }: { small?: boolean; className?: string }) {
  return <svg className={className || (small ? styles.smallMoth : styles.moth)} viewBox="0 0 200 120" fill="none" aria-hidden="true"><path d="M98 56C58 2 9 11 15 51c3 23 35 28 70 19-48 15-32 48 1 34l14-31 14 31c33 14 49-19 1-34 35 9 67 4 70-19 6-40-43-49-83 5" fill="currentColor" fillOpacity=".22" stroke="currentColor" strokeWidth="1.5"/><path d="M100 46v44M99 48 88 30m13 18 11-18M85 59 35 38m48 28-46-7m78 0 50-21m-48 28 46-7" stroke="currentColor" strokeWidth="1.5"/><circle cx="48" cy="49" r="9" stroke="currentColor"/><circle cx="152" cy="49" r="9" stroke="currentColor"/></svg>;
}

function RoseWindow({ className, glyph }: { className?: string; glyph?: string }) {
  return <svg className={`${styles.rose} ${className || ""}`} viewBox="-100 -100 200 200" aria-hidden="true">
    <circle r="99" fill="#3a2029"/><circle r="99" fill="none" stroke="#c7a25f" strokeWidth="2.5"/>
    {Array.from({ length: 12 }, (_, i) => <g key={i} transform={`rotate(${i * 30})`}>
      <circle cy="-79" r="14" fill={GLASS[(i + 1) % 6]} stroke="#3a2029" strokeWidth="2"/>
      <path d="M0-24C17-34 17-52 0-68C-17-52-17-34 0-24Z" fill={GLASS[i % 6]} stroke="#3a2029" strokeWidth="2"/>
      <path d="M0-24C8-20 12-16 14-9L0 0L-14-9C-12-16-8-20 0-24Z" fill={GLASS[(i + 3) % 6]} stroke="#3a2029" strokeWidth="1.5"/>
    </g>)}
    <circle r="23" fill="#f6d9dd" stroke="#3a2029" strokeWidth="3"/><circle r="23" fill="none" stroke="#c7a25f" strokeWidth="1"/>
    {glyph ? <text y="10" textAnchor="middle" fontSize="28" fill="#8c2f55">{glyph}</text> : <g transform="translate(-19 -12) scale(.19)"><path d="M98 56C58 2 9 11 15 51c3 23 35 28 70 19-48 15-32 48 1 34l14-31 14 31c33 14 49-19 1-34 35 9 67 4 70-19 6-40-43-49-83 5" fill="#b93a68" stroke="#5a1f38" strokeWidth="5"/></g>}
  </svg>;
}

function GlassWindow() {
  const panes = [];
  for (let row = 0; row < 15; row++) for (let col = 0; col < 11; col++) {
    const x = col * 44 + (row % 2 ? 0 : 22), y = row * 40;
    panes.push(<polygon key={`${row}-${col}`} points={`${x},${y - 40} ${x + 22},${y} ${x},${y + 40} ${x - 22},${y}`} fill={GLASS[(row * 5 + col * 3 + (row * col) % 4) % 6]} stroke="#3a2029" strokeWidth="1.5"/>);
  }
  return <svg className={styles.glassWindow} viewBox="0 0 400 560" preserveAspectRatio="none" aria-hidden="true">
    <defs><clipPath id="mila-window"><path d="M12 556V215Q12 72 200 8Q388 72 388 215V556Z"/></clipPath></defs>
    <g clipPath="url(#mila-window)"><g opacity=".62">{panes}</g></g>
    <path d="M12 556V215Q12 72 200 8Q388 72 388 215V556ZM200 215V556M12 330H388" fill="none" stroke="#3a2029" strokeWidth="7"/>
    <path d="M12 556V215Q12 72 200 8Q388 72 388 215V556Z" fill="none" stroke="#c7a25f" strokeWidth="2"/>
    <g transform="translate(200 145) scale(.72)"><circle r="99" fill="#3a2029"/>{Array.from({ length: 12 }, (_, i) => <path key={i} transform={`rotate(${i * 30})`} d="M0-14C20-30 20-66 0-90C-20-66-20-30 0-14Z" fill={GLASS[i % 6]} stroke="#3a2029" strokeWidth="2"/>)}<circle r="16" fill="#f6d9dd" stroke="#3a2029" strokeWidth="3"/></g>
  </svg>;
}

function AnimalArt({ animal }: { animal: Animal }) {
  const line = "#3a2029";
  if (animal.kind === "bee") return <Bee className={styles.animalArt}/>;
  if (animal.kind === "moth") return <Moth className={styles.animalArt}/>;
  if (animal.kind === "snail") return <svg className={styles.animalArt} viewBox="0 0 80 64" aria-hidden="true"><path d="M6 56C20 60 60 60 74 54C70 46 62 44 58 44L58 22M58 26 52 14M58 26 66 16" fill="#e8c9a4" stroke={line} strokeWidth="2.5" strokeLinecap="round"/><circle cx="34" cy="34" r="21" fill="#d9799a" stroke={line} strokeWidth="2.5"/><path d="M34 34a5 5 0 1 1 5 5a10 10 0 1 1 8-12" fill="none" stroke={line} strokeWidth="2.5" strokeLinecap="round"/></svg>;
  if (animal.kind === "ladybug") return <svg className={styles.animalArt} viewBox="0 0 80 64" aria-hidden="true"><circle cx="62" cy="32" r="11" fill={line}/><path d="M68 24 76 14M68 40 76 50" stroke={line} strokeWidth="2.5" strokeLinecap="round"/><ellipse cx="36" cy="32" rx="28" ry="24" fill="#d6364f" stroke={line} strokeWidth="2.5"/><path d="M8 32H64" stroke={line} strokeWidth="2.5"/>{["#ee8a2c", "#f0c93c", "#3f9e5c", "#3b6fc4", "#8344b0", "#fff4e0"].map((color, i) => <circle key={color} cx={18 + (i % 3) * 16} cy={i < 3 ? 20 : 44} r="5" fill={color} stroke={line}/>)}</svg>;
  if (animal.kind === "bat") return <svg className={styles.animalArt} viewBox="0 0 80 64" aria-hidden="true"><path d="M40 20 34 8 30 20C18 14 8 18 2 30C10 28 14 32 16 40C22 34 28 38 30 46C33 50 37 54 40 56C43 54 47 50 50 46C52 38 58 34 64 40C66 32 70 28 78 30C72 18 62 14 50 20L46 8Z" fill="#4b2a4d" stroke={line} strokeWidth="2"/><circle cx="35" cy="26" r="2.5" fill="#f6d577"/><circle cx="45" cy="26" r="2.5" fill="#f6d577"/></svg>;
  const tone = animal.tone || "#d99a5b";
  return <svg className={styles.animalArt} viewBox="0 0 80 80" aria-hidden="true">
    <path d="M58 72c14 2 18-8 12-18" fill="none" stroke={line} strokeWidth="6" strokeLinecap="round"/><path d="M58 72c14 2 18-8 12-18" fill="none" stroke={tone} strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 76c-4-22 2-36 20-36s24 14 20 36Z" fill={tone} stroke={line} strokeWidth="2.5"/>
    <path d="M24 20 22 4 37 13ZM56 20 58 4 43 13Z" fill={tone} stroke={line} strokeWidth="2.5" strokeLinejoin="round"/>
    <ellipse cx="40" cy="28" rx="19" ry="17" fill={tone} stroke={line} strokeWidth="2.5"/>
    {animal.sleeping ? <path d="M28 27q4 4 8 0M44 27q4 4 8 0" fill="none" stroke="#fff4e0" strokeWidth="2.5" strokeLinecap="round"/> : <><circle cx="32" cy="26" r="3.2" fill={line}/><circle cx="48" cy="26" r="3.2" fill={line}/></>}
    <path d="M38 33h4l-2 3Z" fill="#c0456f"/><path d="M26 34 15 32M26 38 15 40M54 34 65 32M54 38 65 40" stroke={animal.sleeping ? "#fff4e0" : line} strokeWidth="1.3"/>
    {animal.hat && <><path d="M24 18C24 2 56 2 56 18Z" fill="#b93a68" stroke={line} strokeWidth="2.5"/><rect x="21" y="14" width="38" height="7" rx="3" fill="#f6d9dd" stroke={line} strokeWidth="2"/><circle cx="40" cy="4" r="4" fill="#f6d9dd" stroke={line} strokeWidth="1.5"/></>}
  </svg>;
}

function TokenArt({ kind, index, found }: { kind: TaskKind; index: number; found: boolean }) {
  if (kind === "box") return <svg viewBox="0 0 80 72" aria-hidden="true"><path className={styles.boxLid} d={found ? "M10 30 2 12 38 22 40 30M70 30 78 12 42 22 40 30" : "M10 30H40V22H10ZM40 30H70V22H40Z"}/><path d="M10 30H70V66H10Z" fill="#c79a6e" stroke="#5c3a2c" strokeWidth="2"/><path d="M34 30h12v14H34z" fill={found ? "#b93a68" : "#e2c9a4"}/>{found && <path d="M40 52c-6-5-9-7-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 6-9 11Z" fill="#b93a68"/>}</svg>;
  if (kind === "star") return <svg viewBox="0 0 80 72" aria-hidden="true"><path d="M40 6l9 23 24 4-18 16 5 22-20-12-20 12 5-22L7 33l24-4Z" fill={found ? "#f6d577" : "none"} stroke={found ? "#fff2c4" : "#d9c9b0"} strokeWidth="2"/></svg>;
  if (kind === "snow") return <svg viewBox="0 0 80 72" aria-hidden="true">{[0, 60, 120].map(a => <g key={a} transform={`rotate(${a} 40 36)`} stroke={found ? "#ffffff" : "#c9d4e6"} strokeWidth="3" strokeLinecap="round"><path d="M40 6V66M40 16 32 9M40 16 48 9M40 56 32 63M40 56 48 63"/></g>)}</svg>;
  if (kind === "pane") return <svg viewBox="0 0 60 130" aria-hidden="true"><path d="M3 127V42Q3 18 30 3Q57 18 57 42V127Z" fill="#3a2029"/>{PRIDE.map((color, i) => <path key={color} d={i === 0 ? "M8 44Q8 24 30 10Q52 24 52 44Z" : `M8 ${44 + (i - 1) * 16 + 2}H52V${44 + i * 16}H8Z`} fill={found ? PRIDE[(i + index * 2) % 6] : ["#8c8079", "#a0948c", "#7b7069"][(i + index) % 3]} stroke="#3a2029" strokeWidth="1"/>)}</svg>;
  return null;
}

export default function Birthday2026() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState(false);
  const [active, setActive] = useState("welcome");
  const [collected, setCollected] = useState<Record<string, number[]>>({});
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [letter, setLetter] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const [foundAnimals, setFoundAnimals] = useState<string[]>([]);
  const [animalNote, setAnimalNote] = useState("");
  const [animalHint, setAnimalHint] = useState(false);
  const chapter = chapters.find(c => c.id === active);
  const completed = chapters.filter(c => (collected[c.id]?.length || 0) === 3).length;

  useEffect(() => {
    document.documentElement.lang = "de";
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.unlocked) setUnlocked(true);
      if (saved.collected) setCollected(saved.collected);
      if (saved.invitation) setInvitation(true);
      if (saved.foundAnimals) setFoundAnimals(saved.foundAnimals);
    } catch {}
    setReady(true);
    return () => { document.documentElement.lang = "en"; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlocked, collected, invitation, foundAnimals })); } catch {}
  }, [ready, unlocked, collected, invitation, foundAnimals]);

  useEffect(() => {
    if (!animalNote) return;
    const timer = window.setTimeout(() => setAnimalNote(""), 4000);
    return () => window.clearTimeout(timer);
  }, [animalNote]);

  function navigate(id: string) { setActive(id); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function collect(id: string, index: number) { setCollected(old => ({ ...old, [id]: [...new Set([...(old[id] || []), index])] })); }
  function tryDate(e: React.FormEvent) {
    e.preventDefault();
    const digits = date.replace(/\D/g, "");
    if (["01072024", "172024", "1072024", "0172024", "20240701"].includes(digits)) { setUnlocked(true); setError(""); return; }
    const next = attempts + 1;
    setAttempts(next);
    setError(next >= 3 ? "Unser Chat weiß es, Sliczna. Ganz, ganz oben. ♡" : "Fast, Sliczna. Denk an unsere allererste WhatsApp-Nachricht. Versuch’s noch einmal. ♡");
  }

  function spotAnimal(animal: Animal) {
    const count = foundAnimals.includes(animal.id) ? foundAnimals.length : foundAnimals.length + 1;
    setFoundAnimals(old => old.includes(animal.id) ? old : [...old, animal.id]);
    setAnimalHint(false);
    setAnimalNote(count === animals.length ? `${animal.name}! Das waren alle ${animals.length}. Neben „Ein Rendezvous“ ist jetzt etwas offen. ✦` : `${animal.name} gefunden! ${count} von ${animals.length}.`);
  }

  function hiddenAnimal(page: string) {
    const animal = animals.find(a => a.page === page);
    if (!animal) return null;
    return <button type="button" className={`${styles.animal} ${foundAnimals.includes(animal.id) ? styles.animalFound : ""}`} style={{ left: animal.left, top: animal.top }} onClick={() => spotAnimal(animal)} aria-label="Hier versteckt sich etwas"><AnimalArt animal={animal}/></button>;
  }

  function collage(page: string, shots: Shot[], alt: string) {
    return <div className={styles.collage}>
      {hiddenAnimal(page)}
      {shots.map((s, i) => <button type="button" key={s.src} className={`${styles.photo} ${styles[`skin_${s.skin}`]}`} style={{ "--desktop": s.desktop, "--mobile": s.mobile, "--r": `${s.rotate}deg`, "--dt": `${s.desktopTop}px`, "--mt": `${s.mobileTop}px`, "--z": shots.length - i } as CSSProperties} onClick={() => setLightbox({ src: s.src, alt: `${alt}, Bild ${i + 1}`, caption: s.caption })} aria-label={`${s.caption} Foto vergrößern`}>
        {!["stamp", "torn", "arch"].includes(s.skin) && <span className={styles.tape}/>}
        <span className={styles.frame}>
          <Image src={s.src} alt={`${alt}, Bild ${i + 1}`} width={s.width} height={s.height} sizes="(max-width: 750px) 85vw, 480px" className={styles.photoImage}/>
          <span className={styles.photoCaption}>{s.caption}</span>
        </span>
        {s.skin === "stamp" && <span className={styles.postmark}>04.11.2026<br/>FÜR MILA</span>}
      </button>)}
    </div>;
  }

  function nextButton(from: string, label: string) {
    return <div className={styles.chapterBottom}>
      <span className={styles.moths} aria-label={`${completed} von 5 Erinnerungen gesammelt`}>{chapters.map((c, i) => <Moth key={c.id} className={i < completed ? styles.mothDone : styles.mothOpen}/>)}<small>{completed} von 5 Erinnerungen gesammelt</small></span>
      <button type="button" className={styles.primary} onClick={() => navigate(pages[pages.indexOf(from) + 1])}>{label} <span>→</span></button>
    </div>;
  }

  const allAnimalsFound = foundAnimals.length === animals.length;

  return <div className={styles.world}>
    <div className={styles.grain}/>
    <header className={styles.topline}><Link href="/cards/2025">← Die anderen Jahre</Link><span className={styles.fraktur}>Für Mila · MMXXVI</span><span className={styles.edition}>Eine kleine Sammlung von uns</span></header>
    <div className={styles.arcade} aria-hidden="true"/>
    {!unlocked ? <section className={styles.gate}>
      <div className={styles.archShadow}><div className={styles.arch}><div className={styles.archInner}>
        <RoseWindow className={styles.gateRose}/>
        <span className={styles.eyebrow}>04. NOVEMBER 2026</span>
        <p className={styles.script}>Für dich, mein Mondschein.</p>
        <h1>Only <em>you.</em></h1>
        <p className={styles.script}>Nur du kannst die Tür zu meinem Herzen öffnen.</p>
        <p className={styles.intro}>Hinter dieser Tür wartet ein kleines Stück von meinem Herzen auf dich.<br/>Aber zuerst musst du wissen:</p>
        <form onSubmit={tryDate}>
          <label htmlFor="our-date">Wann haben wir uns zum ersten Mal auf WhatsApp geschrieben?</label>
          <input id="our-date" value={date} onChange={e => setDate(formatDate(e.target.value))} placeholder="TT.MM.JJJJ" inputMode="numeric" maxLength={10} autoComplete="off" aria-describedby="date-feedback"/>
          <button className={styles.primary} type="submit">Unser kleines Kapitel öffnen <span>↗</span></button>
          <p id="date-feedback" role="status" className={styles.feedback}>{error}</p>
        </form>
        <button type="button" className={styles.textButton} onClick={() => setHint(!hint)}>Ein winziger Hinweis?</button>
        {hint && <p className={styles.hint}>Es war Sommer. Mehr verrate ich nicht, Sliczna.</p>}
        <div className={styles.gateFooter}>♡ &nbsp; Mit Liebe gesammelt. Nur für dich.</div>
      </div></div></div>
      <div className={styles.gateAside}><span className={styles.handNote}>ein Anfang.<br/>so viele Lieblingsmomente.</span><div className={styles.gatePortrait}><Image src={heroPhoto} alt="Ein gemeinsamer Lieblingsmoment" width={500} height={650} priority/></div><span className={styles.handNote}>Ein Lieblingsmoment von uns.</span><Bee/></div>
    </section> : <>
      <nav className={styles.booknav} aria-label="Dein Geburtstagsbuch">
        <button type="button" className={active === "welcome" ? styles.selected : ""} onClick={() => navigate("welcome")}>Das Buch</button>
        <button type="button" className={chapter ? styles.selected : ""} onClick={() => navigate(chapters[0].id)}>Erinnerungen</button>
        <button type="button" className={active === "portraits" ? styles.selected : ""} onClick={() => navigate("portraits")}>Einfach du</button>
        <button type="button" className={active === "couple" ? styles.selected : ""} onClick={() => navigate("couple")}>Einfach wir</button>
        <button type="button" className={active === "letter" ? styles.selected : ""} onClick={() => navigate("letter")}>Dein Brief</button>
        <button type="button" className={active === "invite" ? styles.selected : ""} onClick={() => navigate("invite")}>Ein Rendezvous ↗</button>
        {allAnimalsFound && <button type="button" className={`${styles.secretTab} ${active === "secret" ? styles.selected : ""}`} onClick={() => navigate("secret")}>Die Geheimkammer ✦</button>}
      </nav>
      <p className={styles.hunt}>{allAnimalsFound ? "Alle Tiere gefunden. Die Geheimkammer ist offen. ✦" : <>{foundAnimals.length} von {animals.length} Tieren gefunden · <button type="button" onClick={() => setAnimalHint(!animalHint)}>Ein Hinweis?</button>{animalHint && <span> Schau mal bei „{animals.find(a => !foundAnimals.includes(a.id))?.pageName}“ vorbei.</span>}</>}</p>
      <div className={styles.book}>
        {active === "welcome" && <>
          <section className={styles.hero}>
            <div className={styles.heroCopy}><span className={styles.eyebrow}>EIN GEBURTSTAGSBUCH · KAPITEL 2026</span><Moth small/><h1>Good Vibes,<br/><em>Good Energy.</em></h1><p className={styles.script}>Und wie TJ jetzt sagen würde: Ich bin high auf Endorphin. Und das nur wegen dir.</p><p className={styles.script}>Alles Gute zum Geburtstag, Bibs.</p><p>Ein paar Erinnerungen. Ein bisschen Chaos.<br/>Und ein ganzer kleiner Tag für dich.</p><button type="button" className={styles.primary} onClick={() => navigate("Umzug")}>Komm, wir blättern zurück <span>↗</span></button></div>
            <div className={styles.heroPictures}>
              <GlassWindow/>
              <div className={styles.heroPhoto}><span className={styles.tape}/><Image src={heroPhoto} width={600} height={800} sizes="(max-width: 750px) 70vw, 430px" alt="Wir beide an einem gemeinsamen Tag" priority/><span className={styles.heroCaption}>mein liebstes Wir.</span></div>
              <div className={styles.miniPhoto}><Image src={burritoPhoto} width={220} height={280} alt="Mila als Burrito in einer rosa Decke"/><span>Burrito ♡</span></div>
              <span className={styles.marginNote}>für immer<br/>zum Aufheben.</span>
              <Moth/>
              {hiddenAnimal("welcome")}
            </div>
          </section>
          <div className={styles.beeNote}><Bee/><span>Hier haben sich neun kleine Tiere versteckt. Tipp sie an, wenn du eins findest.</span></div>
          <div className={styles.rule}>✦ &nbsp; KLEINE DINGE, DIE BLEIBEN &nbsp; ✦</div>
          <section className={styles.keepsakes}>
            <button type="button" onClick={() => navigate("Umzug")}><RoseWindow glyph="⌂"/><small>01 / DAS ERINNERUNGSBUCH</small><h2>Weißt du noch?</h2><p>Unsere kleinen und großen Abenteuer.</p></button>
            <button type="button" onClick={() => navigate("letter")}><RoseWindow glyph="✉"/><small>02 / EIN VERSIEGELTER BRIEF</small><h2>Für deine Augen.</h2><p>Ein paar Worte von mir.</p></button>
            <button type="button" onClick={() => navigate("invite")}><RoseWindow glyph="❀"/><small>03 / DU HAST ETWAS VOR</small><h2>Halt dir den Tag frei.</h2><p>Ich hab da etwas mit dir geplant.</p></button>
          </section>
        </>}
        {chapter && (() => {
          const found = collected[chapter.id] || [];
          const done = found.length === 3;
          return <>
            <div className={styles.chapterTabs}>{chapters.map((c, i) => <button type="button" key={c.id} onClick={() => navigate(c.id)} aria-current={active === c.id ? "page" : undefined}>{String(i + 1).padStart(2, "0")} <span>{c.tab}</span>{collected[c.id]?.length === 3 && " ♡"}</button>)}</div>
            <header className={styles.chapterHeading}><span className={styles.eyebrow}>{chapter.label}</span><h1>{chapter.title}</h1><p className={styles.script}>{chapter.note}</p></header>
            <section className={`${styles.task} ${styles[`task_${chapter.kind}`]} ${done ? styles.taskDone : ""}`} aria-label="Kleine Erinnerungsaufgabe">
              <p>{chapter.task}</p>
              <div className={styles.tokens}>{chapter.tokens.map((token, i) => {
                const isFound = found.includes(i);
                return <button type="button" key={i} onClick={() => collect(chapter.id, i)} aria-label={`Andenken ${i + 1} entdecken`} aria-pressed={isFound} className={`${styles.token} ${isFound ? styles.found : ""}`}>
                  <span className={styles.tokenArt}>{token.glyph ? token.glyph : <TokenArt kind={chapter.kind} index={i} found={isFound}/>}</span>
                  {token.found && <span className={styles.tokenLabel}>{isFound ? token.found : " "}</span>}
                </button>;
              })}</div>
              {chapter.kind === "star" && done && <span className={styles.moon} aria-hidden="true"/>}
              <p role="status" className={styles.taskStatus}>{done ? chapter.doneText : "Kein Stress, Bibs. Hier läuft uns nichts davon."}</p>
            </section>
            {collage(chapter.id, chapter.shots, chapter.title)}
            {nextButton(chapter.id, chapter.id === "CSD" ? "Und jetzt: einfach du" : "Die nächste Erinnerung")}
          </>;
        })()}
        {active === "portraits" && <><header className={styles.chapterHeading}><span className={styles.eyebrow}>EINE KLEINE LIEBLINGSSAMMLUNG</span><Moth small/><h1>Einfach <em>du.</em></h1><p className={styles.script}>Bibs. Mondschein. Sliczna. Mein Burrito.</p></header>{collage("portraits", portraits, "Mila")}{nextButton("portraits", "Und jetzt: einfach wir")}</>}
        {active === "couple" && <><header className={styles.chapterHeading}><span className={styles.eyebrow}>NOCH EINE LIEBLINGSSAMMLUNG</span><Moth small/><h1>Einfach <em>wir.</em></h1><p className={styles.script}>Ein bisschen Chaos. Und wir mittendrin.</p></header>{collage("couple", couple, "Wir beide")}{nextButton("couple", "Und jetzt: dein Brief")}</>}
        {active === "letter" && <section className={styles.letterSection}><span className={styles.eyebrow}>EIN PAAR WORTE. NUR FÜR DICH.</span><h1>Mit Liebe<br/><em>versiegelt.</em></h1><div className={styles.envelopeWrap}>{hiddenAnimal("letter")}<button type="button" className={`${styles.envelope} ${letter ? styles.openEnvelope : ""}`} onClick={() => setLetter(!letter)} aria-expanded={letter}><span className={styles.envelopeFold}/><span className={styles.seal}>M</span><span className={styles.envelopeLabel}>{letter ? "Wieder verschließen" : "Für Mila · Siegel öffnen"}</span></button></div>{letter && <article className={styles.letterPaper}><Moth small/><h2>{letterGreeting}</h2>{letterParagraphs.map(text => <p key={text}>{text}</p>)}<p className={styles.signature}>In Liebe,<br/>dein Bubs</p></article>}<div className={styles.letterNext}><button type="button" className={styles.primary} onClick={() => navigate("invite")}>Und jetzt: dein Rendezvous <span>→</span></button></div></section>}
        {active === "invite" && <section className={styles.inviteSection}><span className={styles.eyebrow}>MITTWOCH · 04. NOVEMBER 2026</span><Moth/><h1>Du bist<br/><em>verabredet.</em></h1><p className={styles.script}>Mit mir. Überraschung, Bibs.</p><div className={styles.inviteTimeline}><article><span className={styles.time}>12:00</span><small>DER TAG BEGINNT SÜSS</small><h2>Du. Ich. Boba.</h2><p>Ein kleiner Geburtstagsausflug für uns zwei.</p></article><article className={styles.secretCard}><span className={styles.time}>16:00</span><small>DER REST BLEIBT NOCH EIN GEHEIMNIS</small><h2>Ich führe dich aus.</h2><p>Um 16 Uhr habe ich etwas mit dir vor.<br/>Mach dich hübsch, Bibs — ich führe dich aus.</p><p className={styles.readyNote}>Sei um <strong>15:15 Uhr</strong> fertig. ♡</p></article></div><button type="button" className={styles.primary} onClick={() => setInvitation(true)}>{invitation ? "Ein Date mit dir? Immer. ♡" : "Den Tag halte ich mir für dich frei ♡"}</button>{invitation && <p className={styles.script} role="status">Dann ist es ein Date, Sliczna.</p>}<p className={styles.fineprint}>Deine Antwort bleibt hier in diesem kleinen Buch.</p></section>}
        {active === "secret" && allAnimalsFound && <section className={styles.secretRoom}>
          <RoseWindow className={styles.secretRose}/>
          <span className={styles.eyebrow}>NUR FÜR TIERFREUNDINNEN</span>
          <h1>Die Geheim<em>kammer.</em></h1>
          <p className={styles.script}>Du hast alle gefunden, Bibs.</p>
          <div className={styles.cabinet}>{animals.map(animal => <article key={animal.id}><div className={styles.cabinetNiche}><AnimalArt animal={animal}/></div><h2>{animal.name}</h2><em>{animal.latin}</em><p>{animal.text}</p></article>)}</div>
          <div className={styles.voucher}><span className={styles.fraktur}>Gutschein</span><h2>Einmal schwimmen und ein veganer Döner ausgegeben.</h2><p className={styles.voucherTerms}>Einlösbar egal wann, egal wo.</p><p className={styles.voucherSign}>In Liebe, dein Bubs</p></div>
        </section>}
      </div>
      <footer className={styles.footer}><div className={styles.arcade} aria-hidden="true"/><Moth small/><p>Ein bisschen Chaos. Ganz viel du.</p><span className={styles.fraktur}>Für Mila · 2026 · Mit Liebe</span><button type="button" className={styles.textButton} onClick={() => { setUnlocked(false); setDate(""); setActive("welcome"); }}>Das Buch wieder schließen</button></footer>
    </>}
    {animalNote && <p className={styles.animalNote} role="status">{animalNote}</p>}
    {lightbox && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)} onKeyDown={e => { if (e.key === "Escape") setLightbox(null); if (e.key === "Tab") e.preventDefault(); }}><button type="button" autoFocus onClick={() => setLightbox(null)} aria-label="Foto schließen">Schließen ×</button><Image src={lightbox.src} alt={lightbox.alt} width={1500} height={1500} className={styles.fullPhoto}/>{lightbox.caption && <p className={styles.lightboxCaption}>{lightbox.caption}</p>}</div>}
  </div>;
}
