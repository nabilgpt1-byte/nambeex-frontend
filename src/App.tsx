import { useState, type PropsWithChildren, type ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: BigInteger;
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
    id: "black",
    name: "Black",
    category: "T-shirt",
    price: 100,
    image: "/assets/nambeex-product-black_small.webp",
  },
  {
    id: "white",
    name: "White",
    category: "T-shirt",
    price: 100,
    image: "/assets/nambeex-product-white.webp",
  },
  {
    id: "maroon",
    name: "Maroon",
    category: "T-shirt",
    price: 100,
    image: "/assets/nambeex-product-red.webp",
  },
  {
    id: "lgrey",
    name: "Light Grey",
    category: "T-shirt",
    price: 100,
    image: "/assets/nambeex-product-grey.webp",
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

const TEMPLATE_LOOKBOOK_IMAGES = [
  {
    src: "/assets/weblium/template-lookbook-08.webp",
    alt: "Woman wearing a colourful top in front of a painted wall",
  },
  {
    src: "/assets/weblium/template-lookbook-09.webp",
    alt: "Woman wearing a colourful top in front of a painted wall",
  },
  {
    src: "/assets/weblium/template-lookbook-05.webp",
    alt: "Woman wearing a yellow sportswear outfit",
  },
  {
    src: "/assets/weblium/template-lookbook-06.webp",
    alt: "Woman wearing a colourful top in front of a painted wall",
  },
  {
    src: "/assets/weblium/template-lookbook-01.webp",
    alt: "Woman wearing colourful streetwear in front of a graffiti wall",
  },
  {
    src: "/assets/weblium/template-lookbook-02.webp",
    alt: "Woman posing in a turquoise jacket and purple trousers",
  },
  {
    src: "/assets/weblium/template-lookbook-03.webp",
    alt: "Streetwear portrait against a purple background",
  },
  {
    src: "/assets/weblium/template-lookbook-04.webp",
    alt: "Man wearing a turquoise and purple windbreaker",
  },
];

const TEMPLATE_WOMENS_IMAGES = [
  {
    src: "/assets/weblium/template-women-01.webp",
    alt: "Woman in a blue and orange studio portrait",
  },
  {
    src: "/assets/weblium/template-women-02.webp",
    alt: "Three athletes posing in a blue and orange studio",
  },
  {
    src: "/assets/weblium/template-women-03.webp",
    alt: "Woman wearing red and white sportswear",
  },
];

/* function buyUrl(productId: string, platform: "shopee" | "tiktok") {
  const query = encodeURIComponent(productId);

  return platform === "shopee"
    ? `https://shopee.co.id/search?keyword=${query}`
    : `https://www.tiktok.com/search?q=${query}%20shop`;
} */

function buyUrl(productId: string, platform: "shopee" | "tiktok") {

  return platform === "shopee"
    ? `https://shopee.co.id/Nambeex-Unisex-T-Shirt-Quotes-i.239518448.51767596480?extraParams=%7B%22display_model_id%22%3A401489456356%2C%22model_selection_logic%22%3A3%7D`
    : `https://www.tiktok.com/@nambeexofc`;
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

function ShopeeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"
      />
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    number: "",
    title: "Shiny and Unisex design",
    text: "Streetwear with substance. Simple but powerful designed inspired by the pulse, colour and movement of the city.",
    icon: <SparkIcon />,
  },
  {
    number: "",
    title: "Stretchy for comfort",
    text: "Comfort-first silhouettes made for every shape.",
    icon: <SizeIcon />,
  },
  {
    number: "",
    title: "Eco-friendly",
    text: "Local manufacture. Made in Jawa.",
    icon: <LeafIcon />,
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Shell className="site-header__inner">
        <a className="brand" href="https://shopee.co.id/nambeexofc" aria-label="Nambeex home" onClick={closeMenu}>
          <img className="brand__mark__logo " src="/assets/design-nambeex.webp" alt="" />
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
          <a href="#about" onClick={closeMenu}>
            About us
          </a>
          <a href="#new-arrivals" onClick={closeMenu}>
            New drop
          </a>
          <a href="#all-products" onClick={closeMenu}>
            Shop
          </a>
{/*           <a href="#press" onClick={closeMenu}>
            Press
          </a> */}
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <a className="button template-button--outline transparent-button header-cta" href="https://shopee.co.id/nambeexofc">
          Visit the shop <ShopeeIcon />
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
      </div>

      <Shell className="hero__content">
        <div className="hero__copy">
          <div className="eyebrow eyebrow--light">
            <span /> Streetwear · Indonesia
          </div>
          <p className="hero__kicker">Streetwear made simple, comfort made essential.</p>
          <h1 className="hero__title">
            Wear your
            <span>confidence</span>
          </h1>
          <p className="hero__intro">
            Premium Cotton Combed.
            Made for the streets, built for everyday moves.
          </p>
          <div className="hero__actions">
            <a className="button button--cyan" href="#new-arrivals">
              Explore the drop <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero__edition" aria-hidden="true">
          <span>2026</span>
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

function TemplateAbout() {
  return (
    <section id="about" className="template-about">
      <Shell className="template-about__inner">
        <div className="template-about__copy">
          <h2 className="template-title template-title--about">About us</h2>
          <p className="template-about__lead">Join the Nambeex brand. Live in style.</p>
          <p className="template-about__text">
            A big city can make everyone look the same. Nambeex creates
            streetwear that puts individuality first. Feel bright and free—never hide
            your own style.
          </p>
          <div className="template-about__actions">
            <a className="button template-button--outline" href="#story">
              Learn more <ArrowIcon />
            </a>
            <a className="button template-button--outline" href="#all-products">
              Shop Nambeex <ArrowIcon />
            </a>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function TemplateLookbook() {
  return (
    <section id="collection-lookbook" className="template-lookbook">
      <Shell>
        <header className="template-heading template-heading--center">
          <h2 className="template-title">
           Peep the <span>drip !</span>
          </h2>
        </header>

        <div className="template-lookbook__grid">
          {TEMPLATE_LOOKBOOK_IMAGES.map((image) => (
            <figure className="template-lookbook__item" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function TemplateInvitation() {
  return (
    <section id="collection-invite" className="template-invitation">
      <Shell className="template-invitation__inner">
        <div className="template-invitation__copy">
          <h2 className="template-title">Designed by a prince, in the wonderful jogja city</h2>
          <p>
            Join our community to learn our story and be the first to hear about the next Nambeex
            collection.
          </p>
          <a className="button button--cyan" href="#contact">
            Join <ArrowIcon />
          </a>
        </div>
      </Shell>
    </section>
  );
}

function TemplateWomensArrivals() {
  return (
    <section id="women-arrivals" className="template-womens">
      <Shell>
        <header className="template-heading template-heading--center">
          <h2 className="template-title">Check on our new t-shirt collection</h2>
          <p>Four colours available to match your daily energy.</p>
        </header>

        <div className="template-womens__grid">
          {TEMPLATE_WOMENS_IMAGES.map((image, index) => (
            <figure
              className={`template-womens__item template-womens__item--${index + 1}`}
              key={image.src}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="section section--paper story">
      <Shell className="story__grid">
        <div className="story__copy">
          <div className="eyebrow">
            <span /> Our identity
          </div>
          <h2 className="display-title">
            Made 
            <br /> for all
          </h2>
          <p className="story__lead">
            Nambeex turns local energy into confident, easy-to-wear pieces. Every drop is
            designed as a form of self-expression—not just another layer of fabric.
            Distinct streetwear identity make every piece easy to wear, 
            yet hard to ignore. Built for the city, made for your rhythm.
          </p>
          <p>
            Crafted from premium Cotton Combed 24s, our tees offer a soft, 
            breathable feel with enough structure to hold their shape throughout the day. 
            Comfortable, durable and street-ready, 
            they are made to move with you — from concrete streets to late-night city lights.
          </p>
        </div>

        <div className="story__visual">
          <div className="story__cyan-block" aria-hidden="true" />
          <img src="/assets/nambeex-logo.webp" alt="Nambeex by Prince Sam logo" />
          <a className="story__button button button--dark" href="#all-products">
            Discover the
            <br /> collection <ArrowIcon />
          </a>
          <div className="story__stamp" aria-hidden="true">
            <strong>100%</strong>
            <span>made in indonesia</span>
          </div>
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
          <h2 className="display-title">More than clothes</h2>
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
              <span /> Latest release
            </div>
            <h2 className="display-title">
              New
              <br /> arrivals
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
              DROP
            </div>
            <img class="image-front" src="/assets/nambeex-product-black.webp" alt="Nambeex Jogja graphic T-shirt" />
            <img class="image-back" src="/assets/nambeex-product-black-back.webp" alt="Nambeex Jogja graphic T-shirt Back" />
            <span className="drop-showcase__glitch drop-showcase__glitch--one" />
            <span className="drop-showcase__glitch drop-showcase__glitch--two" />
          </div>

          <div className="drop-showcase__copy">
            <span className="drop-showcase__label">New collection</span>
            <h3>Jogja city energy, wherever you go</h3>
            <p>
              3D high quality rubber logo on the front with a well-wish sentence on the back to spread good vibes wherever you are.
            </p>
            <ul>
              <li>Soft cotton feel</li>
              <li>Unisex street fit</li>
              <li>Powerful meaning</li>
            </ul>
            <a className="button button--dark" href="https://shopee.co.id/Nambeex-Unisex-T-Shirt-Quotes-i.239518448.51767596480?extraParams=%7B%22display_model_id%22%3A401489456356%2C%22model_selection_logic%22%3A3%7D">
              Shop this drop <ShopeeIcon />
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
        {/* <span className="product-card__index">0{index + 1}</span> */}
        <span className="product-card__badge">Limited</span>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__meta">
        <div>
          <span>{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <strong>Rp {product.price}rb</strong>
      </div>
      <div className="product-card__actions">
        <a
          className="button button--cyan"
          href={product.shopeeUrl ?? buyUrl(product.id, "shopee")}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Buy ${product.name} on Shopee Indonesia`}
        >
          Shopee <ShopeeIcon />
        </a>
        {/* <a
          className="text-link text-link--dark"
          href={product.tiktokUrl ?? buyUrl(product.id, "tiktok")}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Buy ${product.name} on TikTok Shop`}
        >
          TikTok Shop <ArrowIcon />
        </a> */}
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
              <span /> Shop Nambeex
            </div>
            <h2 className="display-title">
              Pick your
              <br /> colour
            </h2>
          </div>
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
          <span /> In the press
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
/*
function Contact() {
  return (
    <section id="contact" className="contact">
      <Shell className="contact__grid">
        <div>
          <div className="eyebrow">
            <span /> Contact
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
*/
function Contact() {
  return (
    <section id="contact" className="contact">
      <Shell className="contact__grid">
        <div className="contact__media" aria-hidden="true">
          <img src="/assets/nambeex-contact.webp" alt="" />
        </div>

        <div className="contact__details">
          <div className="eyebrow">
            <span /> Contact
          </div>
          <h2 className="display-title">
            Join our
            <br /> community
          </h2>
          <p>
            Social media, product questions, collaborations, press or wholesale—choose the channel
            that suits you best.
          </p>
          <a className="contact__email" href="mailto:hello@reallygreatsite.com">
            nambeexofc@gmail.com <ArrowIcon />
          </a>
          <div className="contact__links">
            {/* <a href="tel:+11234567890">(123) 456-7890</a> */}
            <a href="https://www.instagram.com/nambeexofc/" target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
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
          <img className="brand__mark__logo" src="/assets/design-nambeex.webp" alt="" />
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
        <TemplateAbout />
        <TemplateLookbook />
        <TemplateInvitation />
        <TemplateWomensArrivals />
        <Story />
        <Features />
        <NewArrivals />
        <AllProducts />
        {/* <Press /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
