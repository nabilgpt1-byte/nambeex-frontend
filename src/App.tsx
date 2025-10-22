import React from "react";

// Single-file React + Tailwind one-pager, front-end only.
// Design faithfully mirrors the provided reference. Data-driven + componentized for maintainability.
// — Sections: Topbar, Hero, Roots, Features, New Arrivals, Press, Contact, Footer
// — External buy links: Shopee (ID) & TikTok Shop only
// — No backend, cart, or DB. Pure front-end.

// ------------------------------
// Data models (easy to extend)
// ------------------------------
const THEME = {
  bg: "#0b0b0b",
  fg: "#f4f4f4",
  muted: "#bfbfbf",
  accent: "#ffffff",
  grid: "1240px",
};

const FEATURES = [
  { icon: "✴︎", title: "Designed", text: "By Locals" },
  { icon: "✚", title: "Inclusive", text: "Sizes" },
  { icon: "⌁", title: "Eco‑Friendly", text: "Packaging" },
];

const PRESS = [
  {
    quote:
      '"Boost your credibility by adding quotes from articles written about your brand."',
    outlet: "YOUTH CULTURE MAGAZINE",
  },
  {
    quote:
      '"Boost your credibility by adding quotes from articles written about your brand."',
    outlet: "STREETWEAR DAILY",
  },
  {
    quote:
      '"Boost your credibility by adding quotes from articles written about your brand."',
    outlet: "IDEA MEDIA",
  },
];

// Example product shape. Replace image with your own later; the on-card "tee" is a vector mockup.
const PRODUCTS = [
  { id: "city-shirt", name: "City of Shirts", price: 20.0 },
  {
    id: "street-hoodie",
    name: "Street Smart Hoodie",
    price: 25.0,
    cutHeight: "65%",
    printTop: "22%",
  },
  { id: "urban-sweat", name: "Urban Sweat Shirt", price: 30.0 },
];

// Build outbound links to the two allowed marketplaces only.
function buyUrl(productId: string, platform: "shopee" | "tiktok") {
  if (platform === "shopee") {
    // Replace the slug/path with your real listing; keep domain fixed to shopee.co.id
    return `https://shopee.co.id/search?keyword=${encodeURIComponent(
      productId
    )}`;
  }
  // TikTok Shop ID market — adjust query when you have listing URLs
  return `https://www.tiktok.com/search?q=${encodeURIComponent(
    productId
  )}%20shop`;
}

// ------------------------------
// Shared UI: container + helpers
// ------------------------------
const Wrap: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto px-7" style={{ maxWidth: THEME.grid }}>
    {children}
  </div>
);

// Vector T-shirt mockup (matches the reference look)
const TeeMockup: React.FC<{
  width?: number;
  cloudOffset?: string; // left offset for cloud variation
  cutHeight?: string; // override tee cut height
  printTop?: string; // override print top
}> = ({ width = 250, cloudOffset = "22%", cutHeight, printTop }) => {
  const teeW = `${width}px`;
  return (
    <div
      className="relative rounded-xl border border-[#2a2a2a] shadow-[0_20px_40px_rgba(0,0,0,.35)]"
      style={{
        width: teeW,
        aspectRatio: "1 / 1",
        background: "linear-gradient(#0f0f0f,#151515)",
      }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-xl"
        style={{
          top: "10%",
          width: "82%",
          height: cutHeight ?? "72%",
          background: "linear-gradient(#ebebeb,#cfcfcf)",
          opacity: 0.92,
          clipPath:
            "path('M 10 40 Q 125 -6 240 40 L 230 250 Q 125 300 20 250 Z')",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-lg border-4 border-white overflow-hidden"
        style={{
          top: printTop ?? "28%",
          width: "56%",
          aspectRatio: "4 / 5",
          background: "linear-gradient(#d9f1ff,#cce8ff)",
        }}
      >
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(#cfe9ff 0,#a6d6ff 40%,#7cc5ff 60%)",
          }}
        />
        {/* Hill */}
        <div
          className="absolute left-[-10%] right-[-10%]"
          style={{
            bottom: "-5%",
            height: "45%",
            background:
              "radial-gradient(120% 80% at 50% 0, #7ecb56 0 60%, #6bb545 61% 100%)",
            transform: "skewY(-4deg)",
          }}
        />
        {/* Cloud */}
        <div
          className="absolute rounded-[40px] bg-white"
          style={{ top: "18%", left: cloudOffset, width: "40%", height: "22%" }}
        >
          <div
            className="absolute rounded-full bg-white"
            style={{ width: "45%", height: "160%", left: "18%", top: "-55%" }}
          />
          <div
            className="absolute rounded-full bg-white"
            style={{ width: "38%", height: "120%", left: "58%", top: "-30%" }}
          />
        </div>
      </div>
    </div>
  );
};

// ------------------------------
// Sections
// ------------------------------
const Topbar: React.FC = () => (
  <header className="py-4">
    <Wrap>
      <div className="flex items-center gap-3 font-bold tracking-[0.3px]">
        <span className="text-[19px] mr-1">✦</span>
        <strong>street style &amp; co</strong>
      </div>
    </Wrap>
  </header>
);

const Hero: React.FC = () => (
  <section className="relative py-6 pb-20 overflow-clip">
    <Wrap>
      <div className="grid gap-7 items-start md:grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-anton leading-[0.9] tracking-[1px] my-2 text-[clamp(48px,11vw,148px)]">
            FIND
            <br />
            YOUR
            <br />
            VIBE
          </h1>
          <small className="block text-[14px] text-muted max-w-[320px] mt-[22px]">
            Check out our Captivating Cities shirt collection
          </small>
        </div>
        <div
          aria-hidden
          className="relative lg:absolute lg:right-14 lg:top-10 w-[220px] h-[220px] rounded-2xl grid place-items-center border border-[#2a2a2a] bg-[#111] md:mx-auto lg:mx-0"
        >
          <div className="absolute inset-[22px] rounded-xl border border-dashed border-[#3a3a3a]" />
          <TeeMockup width={250} />
          <a
            href="#new-arrivals"
            className="absolute right-[-8px] bottom-3 w-[74px] h-[74px] rounded-full border border-[#2d2d2d] bg-[#111] text-white grid place-items-center text-[11px] font-bold tracking-[1px]"
          >
            EXPLORE
            <br />
            HERE
          </a>
        </div>
      </div>
    </Wrap>
  </section>
);

const Roots: React.FC = () => (
  <section className="relative mt-10">
    <div
      className="h-[520px] grayscale bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1600&auto=format&fit=crop')",
      }}
    />
    <div className="absolute inset-0 bg-[rgba(0,0,0,.45)]" />
    <div className="absolute inset-0 grid items-center">
      <Wrap>
        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <h2 className="font-anton leading-[0.85] text-[clamp(42px,8vw,96px)] mb-2">
              WE'RE
              <br />
              PROUD OF
              <br />
              OUR ROOTS
            </h2>
          </div>
          <div>
            <p className="max-w-[520px] text-[#ddd] text-[14px]">
              What's special about your product, service, or company? Use this
              space to highlight the things that set you apart from your
              competition, whether it's a special feature, a unique philosophy,
              or awards and recognition that you have received. Think of this as
              your elevator pitch to get the reader's attention.
            </p>
          </div>
        </div>
      </Wrap>
    </div>
  </section>
);

const FeaturePills: React.FC = () => (
  <section className="py-14">
    <Wrap>
      <div className="grid gap-6 text-center lg:grid-cols-3 md:grid-cols-1">
        {FEATURES.map((f) => (
          <div key={f.title} className="grid justify-items-center gap-1">
            <div className="w-[38px] h-[38px] rounded-full border-2 border-white grid place-items-center text-[18px]">
              {f.icon}
            </div>
            <div className="uppercase tracking-[1px]">{f.title}</div>
            <small className="text-muted">{f.text}</small>
          </div>
        ))}
      </div>
    </Wrap>
  </section>
);

const NewArrivals: React.FC = () => (
  <section id="new-arrivals" className="scroll-mt-24">
    <Wrap>
      <h3 className="font-anton text-[clamp(42px,7vw,80px)] my-2 mb-6">
        NEW ARRIVALS
      </h3>
      <div className="grid gap-7 lg:grid-cols-3 md:grid-cols-1">
        {PRODUCTS.map((p, idx) => (
          <article
            key={p.id}
            className="grid gap-3 rounded-2xl border border-[#2a2a2a] bg-[#0f0f0f] p-[22px]"
          >
            <div className="mx-auto" style={{ width: 220 }}>
              <TeeMockup
                width={220}
                cloudOffset={idx === 0 ? "28%" : idx === 1 ? "30%" : "32%"}
                cutHeight={p.cutHeight}
                printTop={p.printTop}
              />
            </div>
            <div className="flex items-center justify-between text-[#cfcfcf] text-[12px]">
              <span className="text-muted">{p.name}</span>
              <span>${p.price.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <a
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[12px] font-semibold hover:border-white/40"
                href={buyUrl(p.id, "shopee")}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Buy ${p.name} on Shopee Indonesia`}
              >
                Buy on Shopee
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[12px] font-semibold hover:border-white/40"
                href={buyUrl(p.id, "tiktok")}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Buy ${p.name} on TikTok Shop`}
              >
                Buy on TikTok Shop
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="text-muted text-[12px] mt-2">
        Tip: Drag and drop your image over the mockup.
      </p>
    </Wrap>
  </section>
);

const Press: React.FC = () => (
  <section className="mt-[70px] border-t border-[#222] pt-[34px] pb-2">
    <Wrap>
      <h3 className="font-anton text-[clamp(42px,7vw,80px)] mb-2">PRESS</h3>
      <div className="grid gap-7 lg:grid-cols-2 md:grid-cols-1">
        <div>
          <div className="uppercase text-[12px] tracking-[1.6px] text-[#adadad]">
            {PRESS[0].quote}
          </div>
          <div className="mt-3 border-t border-[#222] pt-3 text-[13px] text-[#c9c9c9]">
            {PRESS[0].outlet}
          </div>
        </div>
        <div>
          <div className="uppercase text-[12px] tracking-[1.6px] text-[#adadad]">
            {PRESS[1].quote}
          </div>
          <div className="mt-3 border-t border-[#222] pt-3 text-[13px] text-[#c9c9c9]">
            {PRESS[1].outlet}
          </div>
          <div className="mt-3 border-t border-[#222] pt-3 text-[13px] text-[#c9c9c9]">
            {PRESS[2].outlet}
          </div>
        </div>
      </div>
    </Wrap>
  </section>
);

const Contact: React.FC = () => (
  <section className="my-[70px]">
    <Wrap>
      <div className="font-anton text-[clamp(42px,7.6vw,90px)] leading-[.95] mb-4">
        REACH OUT FOR
        <br />
        INQUIRIES
      </div>
      <div className="mt-6 grid gap-7 lg:grid-cols-4 md:grid-cols-2">
        <div className="border-t border-[#222] pt-3 text-[#dcdcdc]">
          <div className="uppercase tracking-[1px] text-muted">Phone</div>
          <div>(123) 456-7890</div>
        </div>
        <div className="border-t border-[#222] pt-3 text-[#dcdcdc]">
          <div className="uppercase tracking-[1px] text-muted">Email</div>
          <div>hello@reallygreatsite.com</div>
        </div>
        <div className="border-t border-[#222] pt-3 text-[#dcdcdc]">
          <div className="uppercase tracking-[1px] text-muted">Email</div>
          <div>hello@reallygreatsite.com</div>
        </div>
        <div className="border-t border-[#222] pt-3 text-[#dcdcdc]">
          <div className="uppercase tracking-[1px] text-muted">Social</div>
          <div className="space-x-2">
            <a href="#">f</a>
            <a href="#">◎</a>
          </div>
        </div>
      </div>

      <div className="font-anton text-[clamp(42px,7.6vw,90px)] leading-[.95] mt-[50px]">
        AND PARTNERSHIPS
      </div>
    </Wrap>
  </section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-[#222] mt-[30px] py-8 pb-20 text-[#cfcfcf]">
    <Wrap>
      <div>© Street Style &amp; Co</div>
    </Wrap>
  </footer>
);

// ------------------------------
// App
// ------------------------------
export default function App() {
  return (
    <div
      className="min-h-screen text-[var(--fg)]"
      style={{ background: THEME.bg, color: THEME.fg }}
    >
      {/* Global styles + fonts (Anton & Inter) */}
      <style>{`
        :root{ --bg:${THEME.bg}; --fg:${THEME.fg}; --muted:${THEME.muted}; --accent:${THEME.accent}; }
        .text-muted{ color: var(--muted); }
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;900&display=swap');
        html, body, #root { height: 100%; }
        body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
        .font-anton{ font-family: 'Anton', Impact, sans-serif; }
        .font-inter{ font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
      `}</style>

      <div className="font-inter">
        <Topbar />
        <Hero />
        <Roots />
        <FeaturePills />
        <NewArrivals />
        <Press />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
