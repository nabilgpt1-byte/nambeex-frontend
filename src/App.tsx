import React, { useEffect } from "react";

// Single-file React + Tailwind one-pager, front-end only.
// Design mirrors the provided reference. Data-driven + componentized for maintainability.
// — Sections: Topbar, Hero, Roots, Features, New Arrivals (marquee only), All Products (grid), Press, Contact, Footer
// — External buy links: Shopee (ID) & TikTok Shop only
// — No backend, cart, or DB. Pure front-end.

// ---------------------------------
// Dev-time data validations ("tests")
// ---------------------------------
const __DEV__ =
  typeof window !== "undefined" && process.env.NODE_ENV !== "production";
function isAllowedMarketplace(url?: string) {
  if (!url) return true; // undefined is allowed (we fallback to buyUrl)
  try {
    const u = new URL(url);
    return (
      /(^|\.)shopee\.co\.id$/.test(u.hostname) ||
      /(^|\.)tiktok\.(com|co|shop)$/.test(u.hostname)
    );
  } catch {
    return false;
  }
}
function validateProducts(products: Array<any>) {
  if (!__DEV__) return;
  try {
    console.groupCollapsed("[DEV] Product data checks");
    // Basic presence
    console.assert(
      Array.isArray(products) && products.length >= 1,
      "At least one product expected"
    );

    products.forEach((p) => {
      console.assert(
        typeof p.id === "string" && p.id.length > 0,
        `Invalid id for product`,
        p
      );
      console.assert(
        typeof p.name === "string" && p.name.length > 0,
        `Invalid name for product`,
        p
      );
      console.assert(
        typeof p.price === "number" && p.price >= 0,
        `Invalid price for product`,
        p
      );
      console.assert(
        !p.shopeeUrl || isAllowedMarketplace(p.shopeeUrl),
        `Shopee URL must be shopee.co.id`,
        p.shopeeUrl
      );
      console.assert(
        !p.tiktokUrl || isAllowedMarketplace(p.tiktokUrl),
        `TikTok URL domain appears invalid`,
        p.tiktokUrl
      );
      console.assert(
        typeof p.image === "string" && p.image.length > 0,
        `Product image should be a non-empty string`,
        p
      );
    });

    // Functional checks for helper
    console.assert(
      buyUrl("sample", "shopee").startsWith("https://shopee.co.id/"),
      "buyUrl(shopee) must target shopee.co.id"
    );
    console.assert(
      buyUrl("sample", "tiktok").startsWith("https://www.tiktok.com/"),
      "buyUrl(tiktok) must target tiktok.com"
    );
    // Extra test cases
    console.assert(
      isAllowedMarketplace("https://shopee.co.id/search?keyword=x"),
      "Allowed host: shopee.co.id"
    );
    console.assert(
      !isAllowedMarketplace("https://shopee.com/search?keyword=x"),
      "Disallowed host: shopee.com"
    );
    console.assert(
      isAllowedMarketplace("https://www.tiktok.com/search?q=x%20shop"),
      "Allowed host: tiktok.com"
    );
    // Encodage & caractères spéciaux
    const special = "jakarta tee + summer";
    console.assert(
      buyUrl(special, "shopee").includes(encodeURIComponent(special)),
      "buyUrl encodes query for Shopee"
    );
    console.assert(
      buyUrl(special, "tiktok").includes(encodeURIComponent(special)),
      "buyUrl encodes query for TikTok"
    );
    // New lightweight checks
    console.assert(FEATURES.length >= 3, "Expect at least 3 feature pills");
    console.assert(PRESS.length >= 3, "Expect at least 3 press quotes");
  } finally {
    console.groupEnd?.();
  }
}

// ------------------------------
// Data models (easy to extend)
// ------------------------------
const THEME = {
  bg: "#0b0b0b",
  fg: "#f4f4f4",
  muted: "#bfbfbf",
  accent: "#ffffff",
  grid: "1200px",
};

// Layout tokens for consistent spacing (if needed later)
const LAYOUT = {
  containerX: "px-6 md:px-8",
  sectionY: "py-16 md:py-20",
  cardPad: "p-6 md:p-7",
  cardBorder: "border-[#262626]",
};

const FEATURES = [
  { icon: "✴︎", title: "Designed", text: "By Locals" },
  { icon: "✚", title: "Inclusive", text: "Sizes" },
  { icon: "⚡", title: "Eco‑Friendly", text: "Packaging" },
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

// Example product shape. Uses the Shopee image provided by you.
const PRODUCTS = [
  {
    id: "city-shirt",
    name: "City of Shirts",
    price: 20.0,
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp",
  },
  {
    id: "street-hoodie",
    name: "Street Smart Hoodie",
    price: 25.0,
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp",
  },
  {
    id: "urban-sweat",
    name: "Urban Sweat Shirt",
    price: 30.0,
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp",
  },
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

// Run dev-time checks once (also invoked in App via useEffect for SPA HMR)
validateProducts(PRODUCTS);

// ------------------------------
// Shared UI: container + helpers
// ------------------------------
const Wrap: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mx-auto px-6 md:px-8" style={{ maxWidth: THEME.grid }}>
    {children}
  </div>
);

// ------------------------------
// Marquee (images only)
// ------------------------------
const ProductImageMarquee: React.FC<{ images: string[] }> = ({ images }) => {
  const fallback =
    "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp";
  const seq = images && images.length ? images : [fallback, fallback, fallback];
  return (
    <div className="relative mt-8">
      <div className="overflow-hidden">
        <div className="flex flex-nowrap gap-6 w-[max-content] animate-marquee">
          {seq.map((src, i) => (
            <img
              key={`m1-${i}`}
              src={src || fallback}
              alt="Product"
              loading="lazy"
              className="h-[140px] w-[110px] sm:h-[160px] sm:w-[130px] lg:h-[180px] lg:w-[150px] object-cover rounded-xl border border-[#2a2a2a] bg-[#111]"
            />
          ))}
          {seq.map((src, i) => (
            <img
              key={`m2-${i}`}
              src={src || fallback}
              alt="Product duplicate"
              loading="lazy"
              className="h-[140px] w-[110px] sm:h-[160px] sm:w-[130px] lg:h-[180px] lg:w-[150px] object-cover rounded-xl border border-[#2a2a2a] bg-[#111]"
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[rgba(11,11,11,1)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[rgba(11,11,11,1)] to-transparent" />
    </div>
  );
};

// ------------------------------
// Sections
// ------------------------------
const Topbar: React.FC = () => (
  <header className="py-5">
    <Wrap>
      <div className="flex items-center gap-3 font-bold tracking-[0.3px]">
        <span className="text-[19px] mr-1">✦</span>
        <strong>Nambeex</strong>
      </div>
    </Wrap>
  </header>
);

// HERO with swapped positions (image + CTA first, then text) on all breakpoints
const Hero: React.FC = () => (
  <section className="relative overflow-hidden pt-12 md:pt-16 pb-24">
    <Wrap>
      <div className="grid gap-8 items-center md:grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        {/* First: tee image + fixed overlays */}
        <div className="relative grid place-items-center">
          <div className="relative inline-block w-[280px] md:w-[360px] lg:w-[420px] aspect-square">
            <img
              src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/6b258925101e81fb6aee95a14e197486~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=fb2f78fa&x-expires=1761303600&x-signature=Au%2BU6dHSE0kkeJUMoOgpkQ3tZsU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
              alt="Featured product"
              className="absolute inset-0 w-full h-full object-cover rounded-xl border border-[#2a2a2a] rotate-[-12deg] shadow-[0_40px_140px_rgba(0,0,0,.5)]"
              loading="lazy"
            />

            {/* CTA circular button anchored to the image wrapper (fixed relative offsets) */}
            <a
              href="#new-arrivals"
              className="absolute bottom-[-20px] right-[-10px] md:bottom-[-26px] md:right-[-14px] lg:bottom-[-32px] lg:right-[-18px] w-[98px] h-[98px] md:w-[110px] md:h-[110px] rounded-full grid place-items-center text-[11px] font-semibold tracking-[1px] text-white btn-invert transition-colors"
              aria-label="Explore new arrivals"
            >
              <span className="btn-ring absolute inset-0 rounded-full border border-white/50" />
              <span className="btn-ring absolute inset-[8px] rounded-full border border-white/25" />
              <span className="z-10 text-center leading-tight">
                EXPLORE
                <br />
                HERE
              </span>
            </a>
          </div>
        </div>

        {/* Second: Headline + copy */}
        <div>
          <h1 className="font-anton leading-[0.82] tracking-[0.5px] text-white text-[clamp(56px,12vw,160px)]">
            FIND
            <br />
            YOUR
            <br />
            VIBE
          </h1>
          <p className="mt-6 text-[15px] text-[#d7d7d7] max-w-[420px]">
            Check out our Captivating shirt collection
          </p>
        </div>
      </div>
    </Wrap>
  </section>
);

const Roots: React.FC = () => (
  <section className="relative mt-14 md:mt-16">
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
  <section className="py-16">
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
  <section id="new-arrivals" className="scroll-mt-24 pb-10 md:pb-16">
    <Wrap>
      <h3 className="font-anton text-[clamp(42px,7vw,80px)] mb-4">
        NEW ARRIVALS
      </h3>
      {/* IMAGE MARQUEE (only product images) */}
      <ProductImageMarquee
        images={PRODUCTS.map(
          (p) =>
            p.image ||
            "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp"
        )}
      />
    </Wrap>
  </section>
);

const AllProducts: React.FC = () => (
  <section id="all-products" className="scroll-mt-24 pt-12 md:pt-20">
    <Wrap>
      <h3 className="font-anton text-[clamp(42px,7vw,80px)] mb-4">
        ALL PRODUCTS
      </h3>
      {/* GRID (unique) */}
      <div className="mt-10 grid gap-7 lg:grid-cols-3 md:grid-cols-1">
        {PRODUCTS.map((p, idx) => (
          <article
            key={`grid-${p.id}-${idx}`}
            className="grid gap-3 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-6 md:p-7"
          >
            <div className="w-full">
              <img
                src={
                  p.image ||
                  "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp"
                }
                alt={p.name}
                className="w-full aspect-[4/5] object-cover rounded-xl border border-[#262626]"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between text-[#cfcfcf] text-[12px]">
              <span className="text-muted">{p.name}</span>
              <span>${p.price.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <a
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[12px] font-semibold hover:border-white/40 btn-invert transition-colors"
                href={p.shopeeUrl || buyUrl(p.id, "shopee")}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Buy ${p.name} on Shopee Indonesia`}
              >
                Buy on Shopee
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[12px] font-semibold hover:border-white/40 btn-invert transition-colors"
                href={p.tiktokUrl || buyUrl(p.id, "tiktok")}
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
    </Wrap>
  </section>
);

const Press: React.FC = () => (
  <section className="mt-20 md:mt-24 border-t border-[#222] pt-8 pb-4">
    <Wrap>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: Big PRESS heading matching the reference */}
        <div className="order-1 md:order-none">
          <h3 className="font-anton text-[clamp(64px,14vw,180px)] leading-[0.85]">
            PRESS
          </h3>
        </div>

        {/* Right: Stacked quotes with separators */}
        <div className="space-y-12">
          {PRESS.map((item, idx) => (
            <div key={item.outlet}>
              <div className="text-[clamp(16px,2.2vw,24px)] leading-snug text-[#e9e9e9]">
                {item.quote}
              </div>
              <div className="mt-6 text-[clamp(20px,3vw,32px)] tracking-[1.2px] uppercase text-white">
                {item.outlet}
              </div>
              {idx < PRESS.length - 1 && (
                <div className="mt-8 h-px bg-white/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  </section>
);

const Contact: React.FC = () => (
  <section className="relative mt-20 md:mt-24">
    <Wrap>
      <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left: big heading + copy */}
        <div>
          <div className="font-anton text-[clamp(42px,7.6vw,96px)] leading-[.9]">
            REACH OUT FOR
            <br />
            INQUIRIES <span className="text-[#bdbdbd]">&amp; PARTNERSHIPS</span>
          </div>
          <p className="text-[#d6d6d6] text-[14px] max-w-[560px] mt-4">
            Questions sur les produits, demandes B2B, collabs ou presse —
            utilise le canal qui te convient. Nous répondons rapidement en
            semaine.
          </p>
        </div>

        {/* Right: cards (resilient to long content) */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[#262626] bg-[#0f0f0f] p-6 md:p-7 break-words">
            <div className="uppercase tracking-[1px] text-muted text-[12px]">
              Phone
            </div>
            <a
              href="tel:+11234567890"
              className="block mt-2 text-[18px] break-words max-w-full"
            >
              (123) 456-7890
            </a>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-3 text-[12px] text-[#bdbdbd]">
              Lun–Ven · 9h–18h
            </div>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#0f0f0f] p-6 md:p-7 break-words">
            <div className="uppercase tracking-[1px] text-muted text-[12px]">
              Email
            </div>
            <a
              href="mailto:hello@reallygreatsite.com"
              className="block mt-2 text-[18px] break-words max-w-full"
            >
              hello@reallygreatsite.com
            </a>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-3 text-[12px] text-[#bdbdbd]">
              Support &amp; partenariats
            </div>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#0f0f0f] p-6 md:p-7 break-words">
            <div className="uppercase tracking-[1px] text-muted text-[12px]">
              Press
            </div>
            <div className="mt-2 text-[18px] break-words max-w-full">
              press@reallygreatsite.com
            </div>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-3 text-[12px] text-[#bdbdbd]">
              Dossiers &amp; visuels sur demande
            </div>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#0f0f0f] p-6 md:p-7 break-words">
            <div className="uppercase tracking-[1px] text-muted text-[12px]">
              Social
            </div>
            <div className="mt-2 flex items-center gap-3 text-[18px] flex-wrap">
              <a
                href="#"
                className="underline-offset-4 hover:underline break-words max-w-full"
              >
                Instagram
              </a>
              <span className="text-muted">·</span>
              <a
                href="https://www.tiktok.com/@nambeexofc"
                className="underline-offset-4 hover:underline break-words max-w-full"
              >
                TikTok
              </a>
            </div>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-3 text-[12px] text-[#bdbdbd]">DM ouverts</div>
          </div>
        </div>
      </div>
    </Wrap>

    {/* subtle divider to close the section visually */}
    <div className="pointer-events-none absolute left-0 right-0 -bottom-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-[#222] mt-[30px] py-10 text-[#cfcfcf]">
    <Wrap>
      <div>© Nambeex</div>
    </Wrap>
  </footer>
);

// ------------------------------
// App
// ------------------------------
export default function App() {
  useEffect(() => {
    validateProducts(PRODUCTS);
  }, []);

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

        /* Hide horizontal scrollbar */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        /* Marquee animation */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation-duration: 0.001ms; animation-iteration-count: 1; } }

        /* Headings rhythm */
        h1,h2,h3{ letter-spacing: 0.4px; }
        .section-gap{ margin-top: 1rem; margin-bottom: 1rem; }

        /* Button invert behavior (global) */
        .btn-invert{ background: transparent; color:#fff; border-color: rgba(255,255,255,.32); transition: background-color .2s ease, color .2s ease, border-color .2s ease; }
        .btn-invert:hover{ background:#fff; color:#000; border-color:#000 !important; }
        .btn-invert:focus-visible{ outline:2px solid #fff; outline-offset:2px; }
        .btn-invert:hover .btn-ring{ border-color:#000 !important; }
      `}</style>

      <div className="font-inter">
        <Topbar />
        <Hero />
        <Roots />
        <FeaturePills />
        <NewArrivals />
        <AllProducts />
        <Press />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
