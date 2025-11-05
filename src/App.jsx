import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  MousePointer2,
  Rocket,
  Code2,
  PenTool,
  Boxes,
  Cpu,
  Sparkles,
} from "lucide-react";

const PROFILE = {
  name: "Alison Fernando",
  role: "Desenvolvedor Front-end & Analista de Sistemas",
  location: "Viradouro, São Paulo, Brasil",
  photoUrl: "../src/assets/ali.jpg",
  about:
    "Crio experiências digitais com foco em clareza, velocidade e impacto visual. Curto resolver problemas complexos com interfaces simples, dados bem contados e microinterações que dão vida à página.",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "TailwindCSS",
    "Node.js",
    "Python",
    "ETL",
    "Power BI",
    "SQL",
  ],
  socials: {
    github: "https://github.com/AlisonFernando",
    linkedin: "https://www.linkedin.com/in/alison-fernando/",
    email: "mailto:alisonfernando.dev@gmail.com",
    cv: "/curriculo.pdf",
  },
};

const PROJECTS = [
  {
    title: "ETL de Commodities (Python)",
    blurb:
      "Pipeline para padronizar, deflacionar e versionar séries históricas.",
    stack: ["Python", "Pandas", "Parquet", "Airflow"],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    live: "#",
    repo: "#",
  },
  {
    title: "Portfolio Interativo",
    blurb:
      "Esta própria página: animações suaves, ícones flutuantes e timeline com progress bar de scroll.",
    stack: ["React", "Framer Motion", "Tailwind"],
    image: "../src/assets/portifolio.png",
    live: "#",
    repo: "#",
  },
  {
    title: "Site temático da moto Kawasaki H2R",
    blurb: "Lading page de exibição da moto Kawasaki H2R.",
    stack: ["HTML5", "CSS3", "JS"],
    image: "../src/assets/kawasaki.jpg",
    live: "#",
    repo: "https://github.com/AlisonFernando/Kawasaki-Ninja-H2",
  },
  {
    title: "Caléndario Web",
    blurb: "Calendário estilizado e dinâmico.",
    stack: ["HTML5", "CSS3", "JS"],
    image: "../src/assets/calendario-web.png",
    live: "#",
    repo: "https://github.com/AlisonFernando/Calendario",
  },
  {
    title: "Bot de música para Discord",
    blurb:
      "Bot que reproduz músicas em canais de voz do Discord a partir de links do YouTube, Spotify e Deezer.",
    stack: [
      "Python",
      "Discord.py",
      "YouTube API",
      "FFmpeg",
      "APIs",
      "Spotify",
      "Deezer",
    ],
    image: "../src/assets/triss.jpg",
    live: "#",
    repo: "https://github.com/AlisonFernando/Music-Bot-Discord",
  },
  {
    title: "Automações em python",
    blurb: "Script para automação de up de arquivos em pastas no Filezilla.",
    stack: ["Python", "Selenium", "Automação", "Filezilla", "Web Scraping"],
    image: "../src/assets/robo.jpg",
    live: "#",
    repo: "https://github.com/AlisonFernando/Automacoes-python",
  },
];

const TIMELINE = [
  {
    role: "Analista de Sistemas Junior",
    company: "Scot Consultoria",
    period: "2023 — atual",
    location: "Bebedouro • SP",
    bullets: [
      "Desenvolvimento e manutenção de soluções tecnológicas com foco em automação de processos",
      "Criação de rotinas de web scraping para coleta e tratamento de dados de preços do setor do agronegócio em múltiplas fontes",
      "Refatoração e manutenção de códigos em PHP, aprimorando performance, legibilidade e boas práticas de programação",
      "Colaboração com equipes multifuncionais para entender requisitos e entregar soluções eficazes",
      "Documentação técnica detalhada para facilitar a manutenção futura e o entendimento das soluções implementadas",
      "Desenvolvimento de APIs personalizadas para integração de sistemas e aumento da eficiência operacional dos clientes",
    ],
    tech: [
      "PHP",
      "JS",
      "Python",
      "MySQL",
      "PotsgreSQL",
      "Web Scraping",
      "APIs",
      "HTML",
      "CSS",
      "Github / Git",
    ],
  },
  {
    role: "Estagiário de TI",
    company: "Scot Consultoria",
    period: "2022 - 2023",
    location: "Bebedouro • SP",
    bullets: [
      "Suporte técnico a usuários internos e externos via acesso remoto, telefone, e-mail e atendimento presencial",
      "Manutenção e atualização do site institucional, incluindo publicações de notícias e ajustes de layout",
      "Alterações em banco de dados e código do site para correção de erros e implementação de melhorias",
      "Desenvolvimento de automações de processos em Python, otimizando tarefas repetitivas e operacionais",
      "Participação em projetos de melhoria contínua dos processos internos de TI",
    ],
    tech: [
      "PHP",
      "JS",
      "Python",
      "MySQL",
      "PotsgreSQL",
      "HTML",
      "CSS",
      "Github / Git",
      "AnyDesk",
      "Microsoft 365",
    ],
  },
  {
    role: "Lavador de automóveis",
    company: "Prefeitura de Viradouro",
    period: "2021 - 2021",
    location: "Viradouro • SP",
    bullets: [
      "Realização de lavagem e higienização completa de automóveis, incluindo carros, motos, ônibus, vans e peruas",
      "Aplicação de produtos adequados para limpeza interna e externa, garantindo preservação da pintura e do estofado",
      "Polimento, aspiração e acabamento final, assegurando alto padrão de qualidade e satisfação do cliente",
      "Atendimento ao cliente, esclarecendo dúvidas sobre os serviços e produtos utilizados",
      "Manutenção e organização do espaço de trabalho, garantindo um ambiente limpo e seguro",
    ],
    tech: ["Lavagem detalhada", "higienização interna", "enceramento manual"],
  },
  {
    role: "Entregador de alimentos",
    company: "Tchokas Burguer",
    period: "2020 - 2020",
    location: "Viradouro • SP",
    bullets: [
      "Entrega de alimentos no período noturno, garantindo pontualidade e bom atendimento ao cliente",
      "Organização e controle de estoque, reposição de produtos e verificação de validade",
      "Lavagem e preparo inicial de alimentos, seguindo normas de higiene e segurança alimentar",
      "Apoio nas rotinas operacionais da cozinha, contribuindo para um ambiente limpo e produtivo",
    ],
    tech: [
      "Controle de estoque",
      "Manipulação de Alimentos",
      "Organização",
      "Controle de validade",
    ],
  },
];

function Section({ id, title, subtitle, children }) {
  return (
    <section
      id={id}
      className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28"
    >
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-slate-300/90 md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <a
          href="#topo"
          className="hidden rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/5 md:block"
        >
          voltar ao topo
        </a>
      </div>
      {children}
    </section>
  );
}

function FloatingIcon({ Icon, className = "", delay = 0 }) {
  // ícones com leve flutuação
  return (
    <motion.div
      className={`pointer-events-none absolute opacity-70 ${className}`}
      initial={{ y: 0 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 4, delay, ease: "easeInOut" }}
    >
      <Icon className="h-6 w-6 md:h-8 md:w-8" />
    </motion.div>
  );
}

function ProjectCard({ p }) {
  const cardRef = useRef(null);

  // Efeito tilt simples baseado no cursor
  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -8; // rotação X
    const ry = ((x - rect.width / 2) / rect.width) * 8; // rotação Y
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur transition-transform [transform:perspective(800px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))]"
      whileHover={{ y: -4 }}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-xl md:h-56">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/20" />
      </div>
      <div className="mt-4 space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          {p.title}
          <Sparkles className="h-4 w-4 opacity-70" />
        </h3>
        <p className="text-sm text-slate-300/90">{p.blurb}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s, i) => (
            <span
              key={i}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          {p.live !== "#" && (
            <a
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
              href={p.live}
              target="_blank"
              rel="noreferrer"
            >
              Live <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {p.repo !== "#" && (
            <a
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
              href={p.repo}
              target="_blank"
              rel="noreferrer"
            >
              Código <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
      {/* brilho sutil */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-white/5" />
      </div>
    </motion.article>
  );
}

function TimelineItem({ item, i }) {
  return (
    <motion.li
      className="relative pl-8"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
    >
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h4 className="font-semibold">{item.role}</h4>
        <span className="text-slate-400">• {item.company}</span>
      </div>
      <div className="text-xs text-slate-400">
        {item.period} — {item.location}
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-300/90">
        {item.bullets.map((b, k) => (
          <li key={k}>{b}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tech.map((t, k) => (
          <span
            key={k}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.li>
  );
}

export default function Portfolio() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.2,
  });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  const bgGrad =
    "bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(16,185,129,0.18),rgba(10,10,10,0)_60%),linear-gradient(180deg,#050505,rgba(5,5,5,0.9),#0a0a0a)]";

  const iconPositions = useMemo(
    () => [
      {
        Icon: Rocket,
        className: "-left-6 top-10 md:-left-10 md:top-14",
        delay: 0,
      },
      {
        Icon: Code2,
        className: "left-6 -top-2 md:left-24 md:-top-2",
        delay: 0.3,
      },
      {
        Icon: Cpu,
        className: "-right-4 top-8 md:-right-8 md:top-10",
        delay: 0.6,
      },
      {
        Icon: PenTool,
        className: "right-6 -bottom-4 md:right-24 md:-bottom-2",
        delay: 0.9,
      },
      {
        Icon: Boxes,
        className: "-left-2 bottom-6 md:left-10 md:bottom-10",
        delay: 1.2,
      },
    ],
    []
  );

  return (
    <main
      id="topo"
      className={`min-h-screen scroll-smooth text-slate-100 ${bgGrad}`}
    >
      {/* Barra de progresso de scroll */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-emerald-400/90"
        style={{ scaleX }}
      />

      {/* HERO / ABOUT */}
      <header className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 pt-24 md:flex-row md:gap-14 md:pt-32">
        <div className="relative order-2 w-full md:order-1 md:w-1/2">
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="mt-3 text-lg text-emerald-300/90 md:text-xl">
            {PROFILE.role}
          </p>
          <p className="mt-3 max-w-xl text-sm text-slate-300/90 md:text-base">
            {PROFILE.about}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={PROFILE.socials.email}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              <Mail className="h-4 w-4" /> Fale comigo
            </a>
            <a
              href={PROFILE.socials.cv}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              <MousePointer2 className="h-4 w-4" /> Currículo
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {PROFILE.skills.map((s, i) => (
              <span
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative order-1 w-full md:order-2 md:w-1/2">
          <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2 shadow-2xl md:w-80">
            <img
              src={PROFILE.photoUrl}
              alt={`Foto de ${PROFILE.name}`}
              className="h-full w-full rounded-2xl object-cover"
            />
            {/* Ícones flutuantes */}
            {!prefersReduced && (
              <>
                {iconPositions.map((ic, idx) => (
                  <FloatingIcon
                    key={idx}
                    Icon={ic.Icon}
                    className={ic.className}
                    delay={ic.delay}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </header>

      {/* PROJETOS */}
      <Section
        id="projetos"
        title="Projetos em Destaque"
        subtitle="Uma amostra do que construo quando misturo dados, design e código."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard p={p} key={i} />
          ))}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section
        id="experiencia"
        title="Experiência"
        subtitle="Linha do tempo das principais etapas da minha jornada."
      >
        <div className="relative">
          <div className="absolute left-1.5 top-0 h-full w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/10 to-transparent" />
          <ol className="space-y-8">
            {TIMELINE.map((item, i) => (
              <TimelineItem item={item} i={i} key={i} />
            ))}
          </ol>
        </div>
      </Section>

      {/* CONTATO */}
      <footer className="relative mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
          <div className="mx-auto mb-4 h-10 w-10">
            <Sparkles className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-semibold">
            Vamos construir algo impactante?
          </h3>
          <p className="mt-2 text-slate-300/90">
            Estou aberto(a) a propostas, freelas e colaborações criativas.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href={PROFILE.socials.email}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-5 py-2.5 text-sm font-medium text-black hover:bg-emerald-400"
            >
              <Mail className="h-4 w-4" /> Enviar e-mail
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm hover:bg-white/5"
            >
              <Github className="h-4 w-4" /> Ver GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm hover:bg-white/5"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}. Feito com React, Tailwind
          e Motion.
        </div>
      </footer>

      {/* Glow de fundo */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            width: 800,
            height: 800,
            background:
              "radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)",
          }}
        />
      </div>

      {/* Botão flutuante voltar ao topo */}
      <a
        href="#topo"
        className="fixed bottom-6 right-6 z-40 rounded-full border border-white/10 bg-white/[0.06] p-3 backdrop-blur hover:bg-white/10"
        aria-label="Voltar ao topo"
      >
        <ArrowUpRight className="h-5 w-5 rotate-180" />
      </a>

      {/* Estilos extras (sem Tailwind config) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </main>
  );
}
