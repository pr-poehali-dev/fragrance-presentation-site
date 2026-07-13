import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import LeadForm from '@/components/LeadForm';

const HERO_IMG = 'https://cdn.poehali.dev/projects/acd56529-1444-4bb4-b0ae-ee29374dadf4/files/87610b6b-b106-4488-98c7-2b875960332a.jpg';

const womenFragrances = [
  { name: 'Rose Éternelle', notes: 'Роза • Пион • Мускус', price: '18 900 ₽', vol: '90 ml' },
  { name: 'Nuit Dorée', notes: 'Жасмин • Ваниль • Амбра', price: '21 400 ₽', vol: '75 ml' },
  { name: 'Soie Blanche', notes: 'Бергамот • Ирис • Кашемир', price: '16 700 ₽', vol: '90 ml' },
];

const menFragrances = [
  { name: 'Cuir Noir', notes: 'Кожа • Табак • Ветивер', price: '19 800 ₽', vol: '100 ml' },
  { name: 'Bois Sauvage', notes: 'Кедр • Бергамот • Лаванда', price: '22 100 ₽', vol: '100 ml' },
  { name: 'Or Impérial', notes: 'Уд • Шафран • Сандал', price: '24 600 ₽', vol: '75 ml' },
];

const navLinks = [
  { id: 'home', label: 'Главная' },
  { id: 'women', label: 'Женская' },
  { id: 'men', label: 'Мужская' },
  { id: 'delivery', label: 'Доставка и оплата' },
  { id: 'contacts', label: 'Контакты' },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-noir text-stone-200 font-sans overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-noir/90 backdrop-blur-md py-4 border-b border-gold/15' : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-serif text-2xl tracking-luxe text-gold-gradient animate-shimmer">
            MAISON D'OR
          </button>
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-gold transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button className="lg:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="lg:hidden bg-noir/95 backdrop-blur-md border-t border-gold/15 mt-4 py-6 flex flex-col items-center gap-5 animate-fade-in">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm uppercase tracking-[0.2em] text-stone-300 hover:text-gold"
              >
                {l.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center grain">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Парфюм" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-gold text-xs uppercase tracking-luxe mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
              Парфюмерный дом · Основан в 1924
            </p>
            <h1
              className="font-serif text-6xl md:text-8xl leading-[0.95] mb-8 animate-fade-up opacity-0"
              style={{ animationDelay: '0.4s' }}
            >
              Искусство <span className="block text-gold-gradient animate-shimmer">аромата</span>
            </h1>
            <p
              className="text-stone-300 text-lg font-light leading-relaxed mb-10 max-w-lg animate-fade-up opacity-0"
              style={{ animationDelay: '0.6s' }}
            >
              Коллекция эксклюзивных мужских и женских ароматов, созданных вручную лучшими парфюмерами Грасса.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up opacity-0" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={() => scrollTo('women')}
                className="px-9 py-4 bg-gold text-noir text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-light transition-colors duration-300"
              >
                Женская коллекция
              </button>
              <button
                onClick={() => scrollTo('men')}
                className="px-9 py-4 border border-gold/40 text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold/10 transition-colors duration-300"
              >
                Мужская коллекция
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/60 animate-fade-in">
          <Icon name="ChevronDown" size={28} className="animate-bounce" />
        </div>
      </section>

      {/* WOMEN */}
      <Collection
        id="women"
        eyebrow="Pour Elle"
        title="Женская парфюмерия"
        subtitle="Изысканные цветочные и восточные аккорды, раскрывающие женственность"
        items={womenFragrances}
      />

      {/* MEN */}
      <Collection
        id="men"
        eyebrow="Pour Lui"
        title="Мужская парфюмерия"
        subtitle="Глубокие древесные и кожаные ноты для уверенных в себе"
        items={menFragrances}
        dark
      />

      {/* DELIVERY */}
      <section id="delivery" className="py-28 px-6 grain">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Сервис" title="Доставка и оплата" />
          <div className="grid md:grid-cols-3 gap-px bg-gold/15 mt-16">
            {[
              { icon: 'Truck', t: 'Бесплатная доставка', d: 'По всей России при заказе от 15 000 ₽. Курьер — в течение 1–3 дней.' },
              { icon: 'CreditCard', t: 'Удобная оплата', d: 'Картой онлайн, наличными при получении или в рассрочку без переплат.' },
              { icon: 'ShieldCheck', t: 'Гарантия подлинности', d: '100% оригинальная продукция с сертификатами и фирменной упаковкой.' },
            ].map((c) => (
              <div key={c.t} className="bg-noir p-10 group hover:bg-stone-950 transition-colors duration-500">
                <Icon name={c.icon} size={34} className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-serif text-2xl mb-4 text-stone-100">{c.t}</h3>
                <p className="text-stone-400 font-light leading-relaxed text-sm">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-14 text-stone-400 text-xs uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2"><Icon name="Gift" size={16} className="text-gold" /> Подарочная упаковка</span>
            <span className="flex items-center gap-2"><Icon name="RotateCcw" size={16} className="text-gold" /> Возврат 14 дней</span>
            <span className="flex items-center gap-2"><Icon name="Sparkles" size={16} className="text-gold" /> Пробники в подарок</span>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6 border-t border-gold/15 grain">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Свяжитесь с нами" title="Контакты" />
          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center border border-gold/30 shrink-0">
                  <Icon name="MapPin" size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1">Город</p>
                  <p className="font-serif text-xl text-stone-100">Новосибирск</p>
                </div>
              </div>

              <a href="https://clck.ru/3U5LRa" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center border border-gold/30 shrink-0 group-hover:bg-gold group-hover:text-noir transition-colors duration-300">
                  <Icon name="Send" size={20} className="text-gold group-hover:text-noir transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1">Наш Телеграм-канал</p>
                  <p className="font-serif text-xl text-stone-100 group-hover:text-gold transition-colors duration-300">
                    Перейти в канал
                  </p>
                </div>
              </a>

              <a href="mailto:orobey@inbox.ru" className="flex items-start gap-5 group">
                <div className="w-12 h-12 flex items-center justify-center border border-gold/30 shrink-0 group-hover:bg-gold group-hover:text-noir transition-colors duration-300">
                  <Icon name="Mail" size={20} className="text-gold group-hover:text-noir transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1">Почта</p>
                  <p className="font-serif text-xl text-stone-100 group-hover:text-gold transition-colors duration-300">
                    orobey@inbox.ru
                  </p>
                </div>
              </a>

              <a
                href="https://clck.ru/3U5LRa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-noir transition-colors duration-300"
              >
                <Icon name="Send" size={18} />
              </a>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-xl tracking-luxe text-gold-gradient">MAISON D'OR</span>
          <p className="text-stone-500 text-xs uppercase tracking-[0.15em]">© 2024 Maison d'Or. Парфюмерия высокого класса</p>
        </div>
      </footer>
    </div>
  );
};

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="text-center">
    <p className="text-gold text-xs uppercase tracking-luxe mb-5">{eyebrow}</p>
    <h2 className="font-serif text-5xl md:text-6xl text-stone-100">{title}</h2>
    <div className="gold-line h-px w-24 mx-auto mt-8" />
  </div>
);

type Fragrance = { name: string; notes: string; price: string; vol: string };

const Collection = ({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  dark,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Fragrance[];
  dark?: boolean;
}) => (
  <section id={id} className={`py-28 px-6 grain ${dark ? 'bg-stone-950/60' : ''} border-t border-gold/15`}>
    <div className="max-w-7xl mx-auto">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <p className="text-center text-stone-400 font-light mt-6 max-w-xl mx-auto">{subtitle}</p>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {items.map((f) => (
          <div
            key={f.name}
            className="group relative border border-gold/15 bg-noir/40 p-10 text-center hover:border-gold/50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="w-20 h-28 mx-auto mb-8 flex items-center justify-center border border-gold/20 group-hover:border-gold/60 transition-colors duration-500">
              <Icon name="Droplet" size={32} className="text-gold/70 group-hover:text-gold transition-colors duration-500" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-3">{f.vol}</p>
            <h3 className="font-serif text-3xl text-stone-100 mb-3">{f.name}</h3>
            <p className="text-stone-400 text-sm font-light mb-6">{f.notes}</p>
            <div className="gold-line h-px w-12 mx-auto mb-6" />
            <p className="font-serif text-2xl text-gold-gradient mb-6">{f.price}</p>
            <button className="w-full py-3 border border-gold/30 text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-noir transition-colors duration-300">
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Index;