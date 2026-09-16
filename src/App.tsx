import { useState, type PropsWithChildren, type ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  shopeeUrl?: string;
  tiktokUrl?: string;
};

type Feature = {
  number: string;
  title: string;
  text: string;
  icon: ReactNode;
};

const PRODUCTS: Product[] = [
  {
    id: "city-shirt",
    name: "City of Shirts",
    category: "Graphic tee",
    price: 20,
    image: "/assets/nambeex-product.webp",
  },
  {
    id: "street-hoodie",
    name: "Street Smart Hoodie",
    category: "Street layer",
    price: 25,
    image: "/assets/nambeex-product.webp",
  },
  {
    id: "urban-sweat",
    name: "Urban Sweat Shirt",
    category: "Everyday essential",
    price: 30,
    image: "/assets/nambeex-product.webp",
  },
];

const PRESS = [
  {
    quote:
      "Boost your credibility by adding quotes from articles written about your brand.",
    outlet: "Youth Culture Magazine",
  },
  {
    quote:
      "Boost your credibility by adding quotes from articles written about your brand.",
    outlet: "Streetwear Daily",
  },
  {
    quote:
      "Boost your credibility by adding quotes from articles written about your brand.",
    outlet: "Idea Media",
  },
];

function buyUrl(productId: string, platform: "shopee" | "tiktok") {
  const query = encodeURIComponent(productId);

  return platform === "shopee"
    ? `https://shopee.co.id/search?keyword=${query}`
    : `https://www.tiktok.com/search?q=${query}%20shop`;
}

function Shell({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`shell ${className}`.trim()}>{children}</div>;
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M32 6c1.7 14.7 9.3 22.3 24 24-14.7 1.7-22.3 9.3-24 24-1.7-14.7-9.3-22.3-24-24C22.7 28.3 30.3 20.7 32 6Z" />
      <path d="M50 5c.5 5.6 3.4 8.5 9 9-5.6.5-8.5 3.4-9 9-.5-5.6-3.4-8.5-9-9 5.6-.5 8.5-3.4 9-9Z" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="m22 10 10 8 10-8 12 8-8 11v25H18V29L10 18l12-8Z" />
      <path d="M22 10c0 6 4.5 10 10 10s10-4 10-10M18 31h28" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64">
      <path d="M53 10C31 11 15 20 13 38c-1 9 6 15 14 15 18 0 26-19 26-43Z" />
      <path d="M12 55c7-17 18-27 34-35M25 42c1-5 0-9-1-12M34 33c4 0 8 1 11 3" />
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    number: "01",
    title: "Fresh design",
    text: "Graphic pieces inspired by the pulse, colour and movement of the city.",
    icon: <SparkIcon />,
  },
  {
    number: "02",
    title: "Inclusive fits",
    text: "Comfort-first silhouettes made to leave room for every personality.",
    icon: <SizeIcon />,
  },
  {
    number: "03",
    title: "Lighter impact",
    text: "Thoughtful packaging and small drops that avoid unnecessary excess.",
    icon: <LeafIcon />,
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Shell className="site-header__inner">
        <a className="brand" href="#top" aria-label="Nambeex home" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">
            N
          </span>
          <span className="brand__name">Nambeex</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#story" onClick={closeMenu}>
            Story
          </a>
          <a href="#new-arrivals" onClick={closeMenu}>
            New drop
          </a>
          <a href="#all-products" onClick={closeMenu}>
            Shop
          </a>
          <a href="#press" onClick={closeMenu}>
            Press
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <a className="button button--cyan header-cta" href="#all-products">
          Shop the drop
        </a>
      </Shell>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img src="/assets/nambeex-hero.webp" alt="" />
        <span className="glitch-slice glitch-slice--one" />
        <span className="glitch-slice glitch-slice--two" />
        <span className="glitch-slice glitch-slice--three" />
      </div>

      <Shell className="hero__content">
        <div className="hero__copy">
          <div className="eyebrow eyebrow--light">
            <span /> Streetwear · Indonesia
          </div>
          <p className="hero__kicker">A new urban uniform by Prince Sam</p>
          <h1 className="hero__title">
            Find your
            <span>vibe.</span>
          </h1>
          <p className="hero__intro">
            Graphic streetwear made for people who would rather stand out than fit in.
          </p>
          <div className="hero__actions">
            <a className="button button--cyan" href="#new-arrivals">
              Explore the drop <ArrowIcon />
            </a>
            <a className="text-link" href="#story">
              Our identity <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero__edition" aria-hidden="true">
          <span>NM—01</span>
          <span>Limited release</span>
        </div>
      </Shell>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          <span>Move loud</span><i>✦</i><span>Live in style</span><i>✦</i>
          <span>Find your vibe</span><i>✦</i><span>Move loud</span><i>✦</i>
          <span>Live in style</span><i>✦</i><span>Find your vibe</span><i>✦</i>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="section section--paper story">
      <Shell className="story__grid">
        <div className="story__copy">
          <div className="eyebrow">
            <span /> 01 / Our identity
          </div>
          <h2 className="display-title">
            Built for
            <br /> the street.
          </h2>
          <p className="story__lead">
            Nambeex turns local energy into confident, easy-to-wear pieces. Every drop is
            designed as a form of self-expression—not just another layer of fabric.
          </p>
          <p>
            From graphic tees to everyday essentials, the collection mixes comfort,
            character and an unmistakably urban point of view.
          </p>
          <a className="button button--dark" href="#all-products">
            Discover the collection <ArrowIcon />
          </a>
        </div>

        <div className="story__visual">
          <div className="story__cyan-block" aria-hidden="true" />
          <img src="/assets/nambeex-logo.jpeg" alt="Nambeex by Prince Sam logo" />
          <div className="story__stamp" aria-hidden="true">
            <strong>100%</strong>
            <span>Own your look</span>
          </div>
          <span className="story__glitch story__glitch--top" aria-hidden="true" />
          <span className="story__glitch story__glitch--bottom" aria-hidden="true" />
        </div>
      </Shell>
    </section>
  );
}

function Features() {
  return (
    <section className="section section--dark features">
      <Shell>
        <div className="section-heading section-heading--center section-heading--light">
          <div className="eyebrow eyebrow--light">
            <span /> Why Nambeex
          </div>
          <h2 className="display-title">More than clothes.</h2>
          <p>Three principles shape every Nambeex release.</p>
        </div>

        <div className="features__grid">
          {FEATURES.map((feature) => (
            <article className="feature" key={feature.number}>
              <div className="feature__topline">
                <div className="feature__icon">{feature.icon}</div>
                <span>{feature.number}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function NewArrivals() {
  return (
    <section id="new-arrivals" className="section section--paper new-arrivals">
      <Shell>
        <div className="section-heading section-heading--split">
          <div>
            <div className="eyebrow">
              <span /> 02 / Latest release
            </div>
            <h2 className="display-title">
              New
              <br /> arrivals.
            </h2>
          </div>
          <p>
            A compact drop with a strong graphic voice. Built for city days, late nights
            and everything in between.
          </p>
        </div>

        <div className="drop-showcase">
          <div className="drop-showcase__visual">
            <div className="drop-showcase__code" aria-hidden="true">
              DROP / 001
            </div>
            <img src="/assets/nambeex-product.webp" alt="Nambeex Jogja graphic T-shirt" />
            <span className="drop-showcase__glitch drop-showcase__glitch--one" />
            <span className="drop-showcase__glitch drop-showcase__glitch--two" />
          </div>

          <div className="drop-showcase__copy">
            <span className="drop-showcase__label">New collection</span>
            <h3>Jogja energy, wherever you go.</h3>
            <p>
              A bold city graphic on a clean black base. Easy to style, impossible to
              ignore.
            </p>
            <ul>
              <li>Soft cotton feel</li>
              <li>Unisex street fit</li>
              <li>Limited graphic release</li>
            </ul>
            <a className="button button--dark" href="#all-products">
              Shop this drop <ArrowIcon />
            </a>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className={`product-card product-card--${index + 1}`}>
      <div className="product-card__visual">
        <span className="product-card__index">0{index + 1}</span>
        <span className="product-card__badge">Limited</span>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__meta">
        <div>
          <span>{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
      <div className="product-card__actions">
        <a
          className="button button--dark"
          href={product.shopeeUrl ?? buyUrl(product.id, "shopee")}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Buy ${product.name} on Shopee Indonesia`}
        >
          Shopee <ArrowIcon />
        </a>
        <a
          className="text-link text-link--dark"
          href={product.tiktokUrl ?? buyUrl(product.id, "tiktok")}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Buy ${product.name} on TikTok Shop`}
        >
          TikTok Shop <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function AllProducts() {
  return (
    <section id="all-products" className="section section--dark products">
      <Shell>
        <div className="section-heading section-heading--split section-heading--light">
          <div>
            <div className="eyebrow eyebrow--light">
              <span /> 03 / Shop Nambeex
            </div>
            <h2 className="display-title">
              Pick your
              <br /> statement.
            </h2>
          </div>
          <p>
            Start with the piece that matches your energy. Orders are completed through
            our marketplace partners.
          </p>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Press() {
  return (
    <section id="press" className="section section--paper press">
      <Shell>
        <div className="eyebrow">
          <span /> 04 / In the press
        </div>
        <div className="press__layout">
          <h2 className="display-title">People are talking.</h2>
          <div className="press__quotes">
            {PRESS.map((item, index) => (
              <figure key={item.outlet}>
                <span className="press__number">0{index + 1}</span>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>{item.outlet}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <Shell className="contact__grid">
        <div>
          <div className="eyebrow">
            <span /> 05 / Contact
          </div>
          <h2 className="display-title">
            Let's make
            <br /> some noise.
          </h2>
        </div>
        <div className="contact__details">
          <p>
            Product questions, collaborations, press or wholesale—choose the channel
            that suits you best.
          </p>
          <a className="contact__email" href="mailto:hello@reallygreatsite.com">
            hello@reallygreatsite.com <ArrowIcon />
          </a>
          <div className="contact__links">
            <a href="tel:+11234567890">(123) 456-7890</a>
            <a href="https://www.tiktok.com/@nambeexofc" target="_blank" rel="noreferrer noopener">
              TikTok
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Shell className="footer__inner">
        <a className="brand" href="#top" aria-label="Nambeex home">
          <span className="brand__mark" aria-hidden="true">
            N
          </span>
          <span className="brand__name">Nambeex</span>
        </a>
        <p>Streetwear by Prince Sam.</p>
        <p>© {new Date().getFullYear()} Nambeex</p>
      </Shell>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site">
      <Header />
      <main>
        <Hero />
        <Story />
        <Features />
        <NewArrivals />
        <AllProducts />
        <Press />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
