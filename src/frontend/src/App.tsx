import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { id: "home", label: "होम", marker: "nav.home.link" },
  { id: "story", label: "कहानी", marker: "nav.story.link" },
  { id: "characters", label: "किरदार", marker: "nav.characters.link" },
  { id: "episodes", label: "एपिसोड", marker: "nav.episodes.link" },
  { id: "gallery", label: "गैलरी", marker: "nav.gallery.link" },
];

const EPISODES = [
  {
    num: "01",
    title: "खाखा का उदय",
    desc: "जब एक आम इंसान ने राज की दुनिया में कदम रखा",
    duration: "52 मिनट",
  },
  {
    num: "02",
    title: "कश्मीर की आग",
    desc: "सत्ता की लड़ाई में कश्मीर बना रणभूमि",
    duration: "48 मिनट",
  },
  {
    num: "03",
    title: "रेसिडेंसी का राज़",
    desc: "खाखा रेसिडेंसी में छिपे हैं गहरे राज़",
    duration: "55 मिनट",
  },
  {
    num: "04",
    title: "मेक्सिको की कैद",
    desc: "दुश्मनों ने जब राजा को जेल में डाला",
    duration: "61 मिनट",
  },
  {
    num: "05",
    title: "राजा की वापसी",
    desc: "अब बदला लेगा राहुल राजा खाखा",
    duration: "68 मिनट",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/assets/uploads/file_00000000bc5c71fabc1e8033d218b328-1.png",
    alt: "राहुल राजा खाखा - पोस्टर",
    marker: "gallery.item.1",
  },
  {
    src: "/assets/uploads/file_00000000ab487208b17bf9a0c008ad68-2.png",
    alt: "राहुल राजा खाखा - नेता",
    marker: "gallery.item.2",
  },
  {
    src: "/assets/uploads/file_00000000cd7471fab90b50b464d926fa-3.png",
    alt: "रेसिडेंसी",
    marker: "gallery.item.3",
  },
  {
    src: "/assets/uploads/file_00000000871c7208a713e4dee6807ea7-4.png",
    alt: "कश्मीर का शेर",
    marker: "gallery.item.4",
  },
  {
    src: "/assets/uploads/file_00000000e2807209a6a7f4ab1a86deab-5.png",
    alt: "राहुल राजा खाखा - अंतिम अध्याय",
    marker: "gallery.item.5",
  },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function App() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      {/* ── STICKY NAV ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_2px_20px_oklch(0_0_0/0.6)]"
            : "bg-gradient-to-b from-background/80 to-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.home.link"
          >
            <span className="text-gold text-2xl font-bold leading-none">♠</span>
            <span className="font-devanagari text-foreground font-bold text-sm sm:text-base leading-tight">
              राहुल राजा खाखा
            </span>
          </button>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ id, label, marker }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  data-ocid={marker}
                  className={`relative px-4 py-2 text-sm font-devanagari transition-colors duration-200 ${
                    activeSection === id
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile nav spade */}
          <div className="md:hidden flex gap-3">
            {NAV_LINKS.slice(1).map(({ id, label, marker }) => (
              <button
                type="button"
                key={id}
                onClick={() => scrollTo(id)}
                data-ocid={marker}
                className="text-xs font-devanagari text-muted-foreground hover:text-gold transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* ── SECTION 1: HERO ── */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen min-h-[600px] overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/assets/uploads/file_00000000bc5c71fabc1e8033d218b328-1.png"
            alt="Rahul Raja Khakha Hero"
            className="w-full h-full object-cover object-center scale-110"
          />
        </motion.div>
        {/* Overlay */}
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 sm:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Brand spade */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-gold text-5xl mb-4 leading-none"
            >
              ♠
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="font-devanagari font-black text-5xl sm:text-7xl lg:text-8xl leading-tight text-foreground"
            >
              राहुल राजा
              <br />
              <span className="text-gold">खाखा</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-display text-foreground/60 text-xl sm:text-2xl italic mt-1 mb-4"
            >
              Rahul Raja Khakha
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-devanagari text-foreground/80 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed"
            >
              एक राजा की कहानी...
              <span className="text-gold font-semibold"> जो रुकता नहीं</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Button
                data-ocid="hero.primary_button"
                onClick={() => scrollTo("episodes")}
                className="bg-gold text-background hover:bg-gold/90 font-devanagari text-base px-8 py-6 rounded-none glow-gold transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                अभी देखें
              </Button>
              <button
                type="button"
                onClick={() => scrollTo("story")}
                className="font-devanagari text-foreground/70 hover:text-gold text-base flex items-center gap-2 transition-colors"
              >
                कहानी जानें <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/50"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── SECTION 2: STORY ── */}
      <section id="story" className="relative py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/uploads/file_00000000cd7471fab90b50b464d926fa-3.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gold text-xl">♠</span>
                <span className="text-gold text-sm font-devanagari tracking-widest uppercase">
                  कहानी
                </span>
                <div className="h-px flex-1 bg-gold/30" />
              </div>

              <h2 className="font-devanagari font-black text-4xl sm:text-5xl text-foreground leading-tight mb-8">
                एक योद्धा की
                <br />
                <span className="text-gold">असली दास्तान</span>
              </h2>

              <p className="font-devanagari text-foreground/75 text-lg leading-loose mb-8">
                राहुल राजा खाखा — एक ऐसे नेता की कहानी जिसने सत्ता, शक्ति और साजिश के
                बीच अपना रास्ता खुद बनाया। कश्मीर की बर्फीली वादियों से लेकर मेक्सिको की
                जेल तक — यह सफर है एक इंसान का जो हर मुश्किल को अपनी ताकत बना लेता है।
              </p>

              {/* Genre badges */}
              <div className="flex flex-wrap gap-3">
                {["एक्शन", "थ्रिलर", "ड्रामा"].map((genre) => (
                  <Badge
                    key={genre}
                    className="font-devanagari bg-card border border-gold/30 text-gold hover:bg-gold hover:text-background transition-colors px-4 py-1.5 text-sm rounded-none"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Side image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-gold/20 rounded-none" />
              <div className="absolute -inset-1 border border-gold/10 rounded-none" />
              <img
                src="/assets/uploads/file_00000000cd7471fab90b50b464d926fa-3.png"
                alt="रेसिडेंसी"
                className="w-full aspect-[4/3] object-cover grayscale-[20%]"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-devanagari text-gold text-sm font-semibold">
                  ♠ खाखा रेसिडेंसी
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CHARACTERS ── */}
      <section id="characters" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold/40" />
              <span className="text-gold text-xl">♠</span>
              <div className="h-px w-16 bg-gold/40" />
            </div>
            <h2 className="font-devanagari font-black text-4xl sm:text-5xl text-foreground">
              मुख्य <span className="text-gold">किरदार</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                img: "/assets/uploads/file_00000000ab487208b17bf9a0c008ad68-2.png",
                name: "राहुल राजा खाखा",
                role: "नेता एवं योद्धा",
                desc: "एक नेता जो सत्ता की दुनिया में अपना वर्चस्व कायम करता है",
              },
              {
                img: "/assets/uploads/file_00000000871c7208a713e4dee6807ea7-4.png",
                name: "खाखा",
                role: "कश्मीर का शेर",
                desc: "कश्मीर की वादियों का सबसे खतरनाक और बहादुर योद्धा",
              },
            ].map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative overflow-hidden card-glow transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={char.img}
                    alt={char.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-xs font-devanagari tracking-widest mb-1 uppercase">
                    ♠ {char.role}
                  </p>
                  <h3 className="font-devanagari font-bold text-2xl text-foreground mb-2">
                    {char.name}
                  </h3>
                  <p className="font-devanagari text-foreground/60 text-sm leading-relaxed">
                    {char.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: EPISODES ── */}
      <section id="episodes" className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gold text-xl">♠</span>
              <span className="text-gold text-sm font-devanagari tracking-widest uppercase">
                सीज़न १
              </span>
              <div className="h-px flex-1 bg-gold/20 max-w-xs" />
            </div>
            <h2 className="font-devanagari font-black text-4xl sm:text-5xl text-foreground">
              सभी <span className="text-gold">एपिसोड</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {EPISODES.map((ep, i) => (
              <motion.div
                key={ep.num}
                data-ocid={`episodes.item.${i + 1}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex items-center gap-6 p-5 border border-border hover:border-gold/50 bg-card/30 hover:bg-card/60 transition-all duration-300 cursor-pointer card-glow"
              >
                {/* Episode number */}
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="font-display text-gold/40 group-hover:text-gold text-3xl font-bold transition-colors duration-300">
                    {ep.num}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-12 w-px bg-border group-hover:bg-gold/30 transition-colors" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-devanagari font-bold text-xl text-foreground group-hover:text-gold transition-colors mb-1">
                    {ep.title}
                  </h3>
                  <p className="font-devanagari text-muted-foreground text-sm">
                    {ep.desc}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className="font-devanagari text-muted-foreground text-sm">
                    {ep.duration}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-gold/0 group-hover:border-gold/50 flex items-center justify-center transition-all duration-300">
                    <Play className="w-3 h-3 text-gold/0 group-hover:text-gold transition-colors fill-current" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: GALLERY ── */}
      <section id="gallery" className="py-24 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold/40" />
              <span className="text-gold text-xl">♠</span>
              <div className="h-px w-16 bg-gold/40" />
            </div>
            <h2 className="font-devanagari font-black text-4xl sm:text-5xl text-foreground">
              <span className="text-gold">फोटो</span> गैलरी
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.button
                key={img.src}
                data-ocid={img.marker}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={() => setLightboxImg(img.src)}
                className={`group relative overflow-hidden block ${
                  i === 0 ? "col-span-2 md:col-span-2 row-span-1" : ""
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-gold text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ♠
                  </span>
                </div>
                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-colors duration-500" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-foreground/0 group-hover:text-foreground/80 font-devanagari text-xs transition-colors duration-300">
                    {img.alt}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImg}
                alt="Lightbox"
                className="w-full max-h-[85vh] object-contain border border-gold/20"
              />
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                data-ocid="gallery.close_button"
                className="absolute -top-4 -right-4 w-10 h-10 bg-card border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-16 text-center">
          <p className="text-gold text-3xl mb-4">♠</p>
          <h3 className="font-devanagari font-bold text-xl text-foreground mb-2">
            राहुल राजा खाखा
          </h3>
          <p className="font-devanagari text-muted-foreground text-sm mb-6">
            एक राजा की कहानी... जो रुकता नहीं
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground/50 text-xs">
            <span className="font-devanagari">
              © {new Date().getFullYear()}.
            </span>
            <span>Built with ❤️ using</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
