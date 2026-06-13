"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const services = [
  {
    title: "İmza Saç Tasarımı",
    description:
      "Yüz formunuzu, yaşam ritminizi ve stilinizi okuyarak size ait bir silüet yaratıyoruz.",
  },
  {
    title: "Renk Ritüeli",
    description:
      "Ten tonunuzla uyum kuran, boyutlu ve zamansız renk uygulamaları.",
  },
  {
    title: "Gelin Atelier",
    description:
      "Prova sürecinden düğün anına uzanan, sakin ve kişisel bir güzellik kurgusu.",
  },
  {
    title: "Bakım Protokolleri",
    description:
      "Saçın doğal gücünü geri kazandıran, ihtiyaca özel yoğun bakım deneyimleri.",
  },
];

const locations = [
  {
    name: "Nişantaşı Atelier",
    address: "Teşvikiye, Nişantaşı",
    hours: "Pzt - Cmt / 09.00 - 20.00",
  },
  {
    name: "Etiler Studio",
    address: "Nispetiye, Etiler",
    hours: "Pzt - Cmt / 09.00 - 20.00",
  },
];

const press = ["VOGUE", "ELLE", "Harper's BAZAAR", "MARIE CLAIRE", "L'Officiel"];

const revealTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-24, 24]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.05, 1, 1.05],
  );

  return (
    <div ref={ref} className={`media-frame ${className}`}>
      <motion.div className="absolute -inset-y-8 inset-x-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 55vw"
          className={`object-cover ${imageClassName ?? ""}`}
        />
      </motion.div>
    </div>
  );
}

function ArrowMark() {
  return (
    <span aria-hidden="true" className="button-arrow">
      ↗
    </span>
  );
}

function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a href={href} className={`text-link ${light ? "text-link-light" : ""}`}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-cream text-ink">
      <header className="site-header">
        <div className="page-shell flex h-18 items-center justify-between lg:h-20">
          <a href="#top" aria-label="Leyla Tonya ana sayfa">
            <Image
              src="/brand/leyla-tonya-wordmark.png"
              alt=""
              width={260}
              height={87}
              priority
              className="h-auto w-36 lg:w-44"
            />
          </a>

          <nav
            className="hidden items-center gap-8 text-[0.63rem] uppercase tracking-[0.2em] text-cream/68 lg:flex"
            aria-label="Ana navigasyon"
          >
            <a className="nav-link" href="#hikaye">Hikaye</a>
            <a className="nav-link" href="#hizmetler">Hizmetler</a>
            <a className="nav-link" href="#donusumler">Dönüşümler</a>
            <a className="nav-link" href="#subeler">Şubeler</a>
          </nav>

          <a href="#randevu" className="header-cta">
            <span className="hidden sm:inline">Online randevu</span>
            <span className="sm:hidden">Randevu</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/leyla-hero-reference.png"
            alt="Leyla Tonya için sinematik güzellik portresi"
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover"
          />
        </motion.div>
        <div className="hero-scrim" />

        <div className="page-shell relative flex min-h-[100dvh] items-end pb-10 pt-24 sm:pb-14 lg:pb-16">
          <div className="max-w-[47rem]">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.18 }}
              className="mb-5 text-[0.61rem] uppercase tracking-[0.26em] text-gold"
            >
              Kişisel güzelliğin imzası
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.3 }}
              className="font-editorial text-[clamp(4.2rem,8.5vw,8.2rem)] leading-[0.82] tracking-[-0.055em] text-cream"
            >
              Güzellik,
              <span className="block italic text-gold">size ait.</span>
            </motion.h1>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.48 }}
              className="mt-7 flex max-w-xl flex-col items-start gap-7 sm:ml-[18%]"
            >
              <p className="max-w-md text-sm leading-6 text-cream/70 sm:text-base sm:leading-7">
                Sizi okuyan, karakterinizi görünür kılan kişisel bir güzellik yaklaşımı.
              </p>
              <a href="#randevu" className="primary-button primary-button-light group">
                <span>Deneyimi planla</span>
                <ArrowMark />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="page-shell grid grid-cols-2 lg:grid-cols-4">
          {[
            ["15+", "Yıllık uzmanlık"],
            ["25K", "Kişisel dönüşüm"],
            ["4.9", "Misafir memnuniyeti"],
            ["2", "İstanbul atelier"],
          ].map(([value, label], index) => (
            <Reveal
              key={label}
              delay={index * 0.06}
              className="proof-item"
            >
              <span className="font-editorial text-4xl leading-none text-gold-dark sm:text-5xl">
                {value}
              </span>
              <span className="text-[0.58rem] uppercase tracking-[0.18em] text-ink/48">
                {label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="hikaye" className="section-space">
        <div className="page-shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative lg:col-span-7">
            <ParallaxImage
              src="/images/leyla-story-face-reference.png"
              alt="Leyla Tonya'nın saç tasarımı üzerinde çalıştığı an"
              className="aspect-[4/5] w-[82%] sm:aspect-[5/4]"
              imageClassName="object-left"
            />
            <ParallaxImage
              src="/images/leyla-story-face-reference.png"
              alt="Saç bakım ritüelinden yakın plan"
              className="absolute -bottom-12 right-0 aspect-[4/5] w-[42%] shadow-[0_28px_80px_rgba(89,65,48,0.18)]"
              imageClassName="object-[45%_70%]"
            />
          </Reveal>

          <Reveal className="pt-8 lg:col-span-5 lg:pl-6" delay={0.08}>
            <h2 className="editorial-title">
              Her yüzün bir ritmi,
              <span className="block italic text-gold-dark">
                her kadının bir hikayesi var.
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-7 text-ink/62">
              <p>
                Leyla Tonya güzelliği kalıplara sığdırmaz. Yüzünüzü,
                karakterinizi ve gündelik hayatınızı birlikte okur.
              </p>
              <p>
                Teknik ustalık, sezgi ve estetik hafıza yalnızca size ait bir
                görünümde buluşur.
              </p>
            </div>
            <blockquote className="mt-9 border-l border-gold pl-5 font-editorial text-2xl leading-tight">
              “İyi görünmek bir sonuç. Asıl mesele, kendin gibi hissetmek.”
            </blockquote>
            <div className="mt-9">
              <TextLink href="#donusumler">Dönüşüm felsefesi</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="hizmetler" className="section-space bg-nude-light">
        <div className="page-shell">
          <Reveal className="max-w-4xl">
            <p className="mb-6 text-[0.61rem] uppercase tracking-[0.25em] text-gold-dark">
              Atelier ritüelleri
            </p>
            <h2 className="editorial-title">
              Güzelliğiniz için özenle seçilmiş ritüeller.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 0.05}>
                  <a href="#hizmetler" className="service-row group">
                    <span className="service-title">{service.title}</span>
                    <span className="max-w-xs text-sm leading-6 text-ink/54">
                      {service.description}
                    </span>
                    <span className="service-arrow" aria-hidden="true">↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal className="lg:sticky lg:top-28 lg:col-span-4" delay={0.12}>
              <ParallaxImage
                src="/images/leyla-services-reference.png"
                alt="Saç dokusu ve güzellik portresi"
                className="aspect-[4/5]"
                imageClassName="object-right"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="donusumler" className="section-space">
        <div className="page-shell">
          <Reveal className="max-w-3xl">
            <h2 className="editorial-title">
              Görünenden daha
              <span className="block italic text-gold-dark">fazlası değişir.</span>
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-ink/60">
              Her dönüşüm, kişinin kendini nasıl görmek istediğini dinlemekle başlar.
            </p>
          </Reveal>

          <div className="editorial-gallery mt-16">
            <Reveal className="gallery-main">
              <ParallaxImage
                src="/images/leyla-transformations-reference.png"
                alt="Hareketli, parlak kahverengi saç tasarımı"
                className="h-full min-h-[28rem]"
                imageClassName="object-[56%_18%]"
              />
            </Reveal>
            <Reveal className="gallery-portrait" delay={0.08}>
              <ParallaxImage
                src="/images/leyla-transformations-reference.png"
                alt="Katlı sarı saç tasarımı"
                className="h-full min-h-[34rem]"
                imageClassName="object-right"
              />
            </Reveal>
            <Reveal className="gallery-detail" delay={0.12}>
              <ParallaxImage
                src="/images/leyla-transformations-reference.png"
                alt="Saç dokusundan yakın plan"
                className="h-full min-h-[18rem]"
                imageClassName="object-[35%_75%]"
              />
            </Reveal>
            <Reveal className="gallery-quote" delay={0.16}>
              <blockquote className="font-editorial text-3xl leading-[1.05] sm:text-4xl">
                “Sonuç yeni biri değil, daha çok bendim.”
              </blockquote>
              <p className="mt-5 text-[0.61rem] uppercase tracking-[0.2em] text-gold-dark">
                Deniz K.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-nude-light">
        <div className="page-shell">
          <Reveal>
            <h2 className="editorial-title max-w-4xl">
              Aynı siz. <span className="italic text-gold-dark">Yeni bir enerji.</span>
            </h2>
          </Reveal>

          <Reveal className="mt-12" delay={0.08}>
            <div className="comparison-grid">
              <ParallaxImage
                src="/images/leyla-before-after-reference.png"
                alt="Dönüşüm öncesi doğal saç görünümü için editorial placeholder"
                className="aspect-[4/5] sm:aspect-[5/4]"
                imageClassName="object-left"
              />
              <ParallaxImage
                src="/images/leyla-before-after-reference.png"
                alt="Dönüşüm sonrası hacimli saç görünümü için editorial placeholder"
                className="aspect-[4/5] sm:aspect-[5/4]"
                imageClassName="object-right"
              />
            </div>
            <div className="comparison-caption">
              <span className="font-editorial text-2xl">Önce</span>
              <p className="max-w-xl text-sm leading-7 text-ink/58">
                Renk dengesi, form ve hareket yeniden yorumlandı. Doğal,
                zahmetsiz ve kişiye özgü.
              </p>
              <span className="font-editorial text-2xl sm:text-right">Sonra</span>
            </div>
            <div className="mt-8">
              <TextLink href="#randevu">Kendi dönüşümünü başlat</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="subeler" className="section-space">
        <div className="page-shell grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-5 gap-4">
              <ParallaxImage
                src="/images/leyla-locations-reference.png"
                alt="Leyla Tonya atelier iç mekanı"
                className="col-span-3 aspect-[3/4]"
                imageClassName="object-left"
              />
              <ParallaxImage
                src="/images/leyla-locations-reference.png"
                alt="Leyla Tonya atelier mimari detayı"
                className="col-span-2 mt-16 aspect-[3/5]"
                imageClassName="object-center"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pl-7" delay={0.1}>
            <h2 className="editorial-title">
              Size yakın bir
              <span className="block italic text-gold-dark">Leyla Tonya.</span>
            </h2>
            <div className="mt-10 space-y-9">
              {locations.map((location) => (
                <a href="#subeler" className="location-block group" key={location.name}>
                  <div>
                    <h3 className="font-editorial text-3xl sm:text-4xl">
                      {location.name}
                    </h3>
                    <p className="mt-3 text-sm text-ink/55">{location.address}</p>
                    <p className="mt-1 text-xs text-ink/42">{location.hours}</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="press-section">
        <Reveal className="page-shell">
          <p className="text-center text-[0.6rem] uppercase tracking-[0.28em] text-ink/42">
            Basında Leyla Tonya
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-16 lg:justify-between">
            {press.map((publication) => (
              <span key={publication} className="press-name">{publication}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="instagram-band bg-cream">
        <Reveal className="page-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[0.61rem] uppercase tracking-[0.24em] text-gold-dark">
              Instagram
            </p>
            <h2 className="mt-4 max-w-2xl font-editorial text-4xl leading-[0.95] tracking-[-0.035em] sm:text-5xl">
              Güncel çalışmalar ve salon anları.
            </h2>
          </div>
          <div className="flex flex-wrap gap-5">
            <TextLink href="https://www.instagram.com/leylatonya/">
              @leylatonyasalonmode
            </TextLink>
            <TextLink href="https://www.instagram.com/leylatonya/">
              @leylatonya
            </TextLink>
          </div>
        </Reveal>
      </section>

      <section id="randevu" className="booking-section">
        <ParallaxImage
          src="/images/leyla-closing-reference.png"
          alt="Leyla Tonya güzellik kampanyası için editorial placeholder"
          className="absolute inset-y-0 right-0 hidden w-[48%] lg:block"
          imageClassName="object-right"
        />
        <div className="booking-scrim" />
        <Reveal className="page-shell relative py-24 text-cream sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h2 className="font-editorial text-[clamp(3.8rem,7.2vw,7.4rem)] leading-[0.86] tracking-[-0.05em]">
              Kendinize ayırdığınız
              <span className="block italic text-gold">o anı planlayın.</span>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-cream/62">
              Size uygun şubeyi, hizmeti ve zamanı seçin. Deneyiminiz ilk görüşmeyle başlasın.
            </p>
            <a href="#randevu" className="primary-button group mt-9">
              <span>Online randevu oluştur</span>
              <ArrowMark />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="page-shell">
          <div className="footer-grid">
            <div>
              <Image
                src="/brand/leyla-tonya-wordmark.png"
                alt="Leyla Tonya"
                width={434}
                height={145}
                className="h-auto w-64"
              />
              <p className="mt-5 max-w-xs text-xs leading-6 text-cream/42">
                Kişisel güzelliği teknik, sezgi ve zamansız estetikle yorumlayan beauty atelier.
              </p>
            </div>
            <div>
              <div className="footer-label">Keşfet</div>
              <div className="mt-5 flex flex-col gap-3 text-sm text-cream/55">
                <a className="footer-link" href="#hikaye">Hikaye</a>
                <a className="footer-link" href="#hizmetler">Hizmetler</a>
                <a className="footer-link" href="#donusumler">Dönüşümler</a>
              </div>
            </div>
            <div>
              <div className="footer-label">Bize ulaşın</div>
              <div className="mt-5 flex flex-col gap-3 text-sm text-cream/55">
                <a className="footer-link" href="tel:+902120000000">+90 212 000 00 00</a>
                <a className="footer-link" href="mailto:hello@leylatonya.com">
                  hello@leylatonya.com
                </a>
              </div>
            </div>
            <div>
              <div className="footer-label">Instagram</div>
              <a
                href="https://www.instagram.com/leylatonya/"
                className="footer-instagram"
                aria-label="Leyla Tonya Instagram"
              >
                <span>@leylatonyasalonmode</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Leyla Tonya. Tüm hakları saklıdır.</span>
            <div className="flex gap-6">
              <span>Gizlilik</span>
              <span>KVKK</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
