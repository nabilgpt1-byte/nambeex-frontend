import React, { useEffect } from "react";

// Single-file React + Tailwind one-pager, front-end only.
// Design mirrors the provided reference. Data-driven + componentized for maintainability.
// — Sections: Topbar, Hero, Roots, Features, New Arrivals (carousel), Press, Contact, Footer
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
  <div className="mx-auto px-7" style={{ maxWidth: THEME.grid }}>
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
          <img
            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/6b258925101e81fb6aee95a14e197486~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=fb2f78fa&x-expires=1761303600&x-signature=Au%2BU6dHSE0kkeJUMoOgpkQ3tZsU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
            alt="Featured product"
            className="w-[160px] h-[160px] object-cover rounded-xl border border-[#2a2a2a]"
            loading="lazy"
          />
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
      <h3 className="font-anton text-[clamp(42px,7vw,80px)] my-2">
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
  <section id="all-products" className="scroll-mt-24">
    <Wrap>
      <h3 className="font-anton text-[clamp(42px,7vw,80px)] my-2">
        ALL PRODUCTS
      </h3>
      {/* GRID (unique) */}
      <div className="mt-10 grid gap-7 lg:grid-cols-3 md:grid-cols-1">
        {PRODUCTS.map((p, idx) => (
          <article
            key={`grid-${p.id}-${idx}`}
            className="grid gap-3 rounded-2xl border border-[#2a2a2a] bg-[#0f0f0f] p-[22px]"
          >
            <div className="w-full">
              <img
                src={
                  p.image ||
                  "https://down-id.img.susercontent.com/file/id-11134207-7rbk3-mapulxh672n28f.webp"
                }
                alt={p.name}
                className="w-full aspect-[4/5] object-cover rounded-xl border border-[#2a2a2a]"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between text-[#cfcfcf] text-[12px]">
              <span className="text-muted">{p.name}</span>
              <span>${p.price.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <a
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[12px] font-semibold hover:border-white/40"
                href={p.shopeeUrl || buyUrl(p.id, "shopee")}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Buy ${p.name} on Shopee Indonesia`}
              >
                Buy on Shopee
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-[12px] font-semibold hover:border-white/40"
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
