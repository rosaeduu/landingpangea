/* Pangea Pro — Hero, Marquee, Antes/Depois pinned story */

/* ---------------- NAV PRO ---------------- */
function NavPro() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, padding: scrolled ? "10px 14px" : "12px 20px",
      background: scrolled ? "rgba(11,26,11,0.75)" : "rgba(11,26,11,0.35)",
      backdropFilter: "blur(20px) saturate(140%)",
      WebkitBackdropFilter: "blur(20px) saturate(140%)",
      border: "1px solid rgba(201,223,138,0.18)",
      borderRadius: 9999,
      display: "flex", alignItems: "center", gap: 32,
      transition: "all 250ms cubic-bezier(0.2,0.8,0.2,1)",
      maxWidth: "calc(100vw - 32px)",
    }}>
      <PgLogo size={22} color="#fff" wordColor="#fff" />
      <div style={{
        display: "flex", gap: 24, alignItems: "center",
        fontFamily: '"DM Sans", sans-serif', fontSize: 13,
        color: "#c9df8a",
      }}>
        <a href="#produto" style={{ color: "inherit", textDecoration: "none", fontWeight: 500 }}>Produto</a>
        <a href="#funciona" style={{ color: "inherit", textDecoration: "none", fontWeight: 500 }}>Como funciona</a>
        <a href="#numeros" style={{ color: "inherit", textDecoration: "none", fontWeight: 500 }}>Impacto</a>
      </div>
      <a href="#contato" style={{
        color: "#0b1a0b", background: "#c9df8a",
        padding: "8px 16px", borderRadius: 9999, textDecoration: "none",
        fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 600,
        display: "inline-flex", alignItems: "center", gap: 6,
      }}>
        Lista de espera
        <span style={{ fontSize: 12 }}>→</span>
      </a>
    </div>
  );
}

/* ---------------- HERO CINÉTICO ---------------- */
function HeroPro() {
  const heroRef = useRef(null);
  const cur = useCursor(heroRef);
  const scrollProg = useScrollProgress(heroRef, "exit");

  // floats positions com mouse parallax
  const px = (cur.inside ? cur.x : 0) * 14;
  const py = (cur.inside ? cur.y : 0) * 14;

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative", minHeight: "100vh",
        background: "var(--g900)", color: "#fff",
        overflow: "hidden", paddingTop: 200, paddingBottom: 100,
      }}
    >
      {/* cursor-aware radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: cur.inside
          ? `radial-gradient(circle 600px at ${cur.raw.x * 100}% ${cur.raw.y * 100}%, rgba(119,171,89,0.28), transparent 60%)`
          : "radial-gradient(circle 600px at 50% 30%, rgba(119,171,89,0.18), transparent 60%)",
        transition: "background 80ms linear",
      }} />

      {/* grain */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="pg-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.9  0 0 0 0 0.6  0 0 0 0.4 0" />
        </filter>
      </svg>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        filter: "url(#pg-grain)", opacity: 0.18, mixBlendMode: "overlay",
      }} />

      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "linear-gradient(rgba(201,223,138,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,223,138,0.06) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent)",
      }} />

      {/* texto central */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1100, margin: "0 auto",
        padding: "0 clamp(20px, 5vw, 48px)",
        textAlign: "center",
        transform: `translateY(${scrollProg * -80}px)`,
        opacity: 1 - scrollProg * 0.4,
      }}>
        <Reveal>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(201,223,138,0.10)", color: "#c9df8a",
            border: "1px solid rgba(201,223,138,0.25)",
            padding: "6px 14px", borderRadius: 9999,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13, fontWeight: 500, letterSpacing: "-0.005em",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 9999, background: "#c9df8a",
              boxShadow: "0 0 0 4px rgba(201,223,138,0.2)",
              animation: "pg-pulse 2s ease-in-out infinite",
            }} />
            Em construção · lançamento 2º sem · 2026
          </span>
        </Reveal>

        <h1 style={{
          margin: "32px 0 0", fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 700, fontSize: "clamp(56px, 9vw, 140px)",
          lineHeight: 0.92, letterSpacing: "-0.05em", color: "#fff",
          textWrap: "balance",
        }}>
          <div><SplitText delay={100} stagger={60}>Nunca mais perca</SplitText></div>
          <div style={{ color: "#c9df8a", fontStyle: "italic", fontWeight: 600 }}>
            <SplitText delay={400} stagger={80}>um prazo ambiental.</SplitText>
          </div>
        </h1>

        <Reveal delay={1200}>
          <p style={{
            margin: "32px auto 0", fontSize: 21, lineHeight: 1.5,
            color: "#d4e0c8", maxWidth: 640,
            fontFamily: '"DM Sans", sans-serif', textWrap: "pretty",
          }}>
            O ERP feito por consultoria ambiental, para consultoria ambiental.
            Clientes, licenças, condicionantes e financeiro em um único fluxo.
          </p>
        </Reveal>

        <Reveal delay={1400}>
          <HeroForm />
        </Reveal>

        <Reveal delay={1600}>
          <div style={{
            marginTop: 20, fontSize: 13, color: "#8aa085",
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: '"DM Sans", sans-serif',
          }}>
            <span style={{ display: "inline-flex" }}>
              {[1,2,3,4].map((i) => (
                <span key={i} style={{
                  width: 24, height: 24, borderRadius: 9999,
                  background: `hsl(${80 + i * 18}, 30%, ${40 + i * 4}%)`,
                  border: "2px solid var(--g900)", marginLeft: i > 1 ? -8 : 0,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#c9df8a",
                }}>{["E","R","M","C"][i-1]}</span>
              ))}
            </span>
            <span style={{ color: "#c9df8a", fontWeight: 600 }}>+100 consultorias</span>
            já garantiram acesso antecipado
          </div>
        </Reveal>
      </div>

      {/* floats com mouse parallax */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <Float style={{ top: "22%", left: "4%", transform: `translate(${-px * 1.4}px, ${-py * 1.4}px) rotate(-6deg)` }} delay={1800}>
          <FloatTableRow />
        </Float>
        <Float style={{ top: "30%", right: "3%", transform: `translate(${px * 1.6}px, ${-py * 1.2}px) rotate(5deg)` }} delay={2000}>
          <FloatKPI />
        </Float>
        <Float style={{ bottom: "18%", left: "6%", transform: `translate(${-px * 1.1}px, ${py * 1.4}px) rotate(3deg)` }} delay={2100}>
          <FloatAlert />
        </Float>
        <Float style={{ bottom: "22%", right: "5%", transform: `translate(${px * 1.2}px, ${py * 1.0}px) rotate(-4deg)` }} delay={2200}>
          <FloatKPI label="Vigentes" value="118" color="#86efac" />
        </Float>
      </div>

      {/* scroll hint */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        color: "#8aa085", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
        fontFamily: '"DM Sans", sans-serif', fontWeight: 600,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: 1 - scrollProg * 2,
      }}>
        role para baixo
        <span style={{
          width: 1, height: 24, background: "#77ab59",
          animation: "pg-scroll-hint 1.6s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

function Float({ children, style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0, true);
  return (
    <div ref={ref} style={{
      position: "absolute", transition: "transform 400ms cubic-bezier(0.2,0.8,0.2,1), opacity 800ms",
      opacity: inView ? 1 : 0, ...style,
    }}>
      <div style={{
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `transform 1000ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, opacity 1000ms ${delay}ms`,
        animation: inView ? `pg-float 6s ease-in-out ${delay}ms infinite` : "none",
      }}>
        {children}
      </div>
    </div>
  );
}

function HeroForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }}
      style={{
        margin: "40px auto 0", maxWidth: 520, width: "100%",
        display: "flex", gap: 6, padding: 6,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(201,223,138,0.28)",
        borderRadius: 14,
      }}
    >
      {done ? (
        <div style={{
          flex: 1, padding: "16px 20px", color: "#c9df8a", textAlign: "left",
          fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: 15,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{
            width: 24, height: 24, borderRadius: 9999, background: "#c9df8a",
            color: "#0b1a0b", display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 13,
          }}>✓</span>
          Pronto — avisamos quando liberarmos seu acesso.
        </div>
      ) : (
        <React.Fragment>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com.br"
            style={{
              flex: 1, minWidth: 0, height: 52, padding: "0 18px",
              background: "transparent", border: "none", outline: "none",
              fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: "#fff",
            }}
          />
          <style>{`input::placeholder { color: rgba(201,223,138,0.5); }`}</style>
          <button type="submit" style={{
            height: 52, padding: "0 22px",
            background: "#c9df8a", color: "#0b1a0b", border: "none",
            borderRadius: 10, cursor: "pointer", flexShrink: 0,
            fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 14,
            display: "inline-flex", alignItems: "center", gap: 8,
            transition: "transform 150ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Garantir vaga
            <span>→</span>
          </button>
        </React.Fragment>
      )}
    </form>
  );
}

/* ---------------- MARQUEE (sutil) ---------------- */
function MarqueeStrip() {
  const items = [
    "O sistema das ambientais",
    "Construído por consultoria, para consultoria",
    "IBAMA · CETESB · INEA · SEMAs",
    "Pantalassa evoluído",
    "Brasileiro, operacional, em produção desde 2020",
    "Nunca mais perca um prazo",
  ];
  return (
    <section style={{
      background: "var(--color-bg-page)",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
      padding: "20px 0", overflow: "hidden",
      position: "relative",
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
    }}>
      <Marquee speed={90}>
        {items.map((t, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 28,
            paddingRight: 28, fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500, fontSize: 15, letterSpacing: "0.01em",
            color: "var(--color-text-tertiary)",
          }}>
            {t}
            <span style={{
              width: 4, height: 4, background: "var(--g500)",
              display: "inline-block", borderRadius: 9999, opacity: 0.7,
            }} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------------- ANTES / DEPOIS — Pinned story ---------------- */
function AntesDepois() {
  const ref = useRef(null);
  const prog = useScrollProgress(ref, "pin");

  // chaos cards animate out, pangea card animates in
  const chaosOpacity = 1 - clamp((prog - 0.1) / 0.5, 0, 1);
  const chaosOffset = prog * 100;
  const pangeaProgress = clamp((prog - 0.3) / 0.5, 0, 1);

  // label crossfade
  const showAntes = prog < 0.5;

  return (
    <section ref={ref} style={{ height: "260vh", position: "relative", background: "var(--color-bg-page)" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}>
        {/* header */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, padding: "48px 0 0",
          textAlign: "center", zIndex: 5,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "6px 16px", borderRadius: 9999,
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
            fontFamily: '"DM Sans", sans-serif', fontSize: 13, fontWeight: 600,
            letterSpacing: "0.05em",
          }}>
            <span style={{
              color: showAntes ? "#b91c1c" : "var(--color-text-tertiary)",
              transition: "color 400ms",
            }}>ANTES</span>
            <span style={{ width: 24, height: 1, background: "var(--n300)" }} />
            <span style={{
              color: !showAntes ? "var(--color-primary)" : "var(--color-text-tertiary)",
              transition: "color 400ms",
            }}>DEPOIS</span>
          </div>
          <h2 style={{
            margin: "24px 0 0", fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700, fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 1, letterSpacing: "-0.04em",
            color: "var(--color-text-primary)", textWrap: "balance",
          }}>
            <span style={{
              display: "inline-block", position: "relative",
            }}>
              <span style={{
                position: "absolute", inset: 0,
                opacity: showAntes ? 1 : 0, transition: "opacity 500ms",
              }}>O caos de hoje.</span>
              <span style={{
                opacity: !showAntes ? 1 : 0, transition: "opacity 500ms",
                color: "var(--color-primary)",
              }}>Tudo no lugar.</span>
            </span>
          </h2>
        </div>

        {/* chaos canvas */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            position: "relative", width: "min(900px, 90vw)", height: 500,
            opacity: chaosOpacity,
            transform: `translateY(${chaosOffset * 0.4}px) scale(${1 - chaosOffset / 200})`,
          }}>
            <ChaosCard style={{ top: 30, left: 0, transform: "rotate(-8deg)" }} kind="planilha" />
            <ChaosCard style={{ top: 10, left: "20%", transform: "rotate(4deg)" }} kind="email" />
            <ChaosCard style={{ top: 100, left: "50%", transform: "rotate(-3deg)" }} kind="whatsapp" />
            <ChaosCard style={{ top: 220, left: "12%", transform: "rotate(7deg)" }} kind="postit" />
            <ChaosCard style={{ top: 200, left: "55%", transform: "rotate(-5deg)" }} kind="planilha2" />
            <ChaosCard style={{ top: 280, left: "30%", transform: "rotate(2deg)" }} kind="pdf" />
            <ChaosCard style={{ top: 320, left: "65%", transform: "rotate(-9deg)" }} kind="email2" />
          </div>
        </div>

        {/* pangea card sliding in */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          opacity: pangeaProgress,
          transform: `translateY(${(1 - pangeaProgress) * 60}px) scale(${0.92 + pangeaProgress * 0.08})`,
          pointerEvents: pangeaProgress > 0.5 ? "auto" : "none",
        }}>
          <CleanPanel />
        </div>

        {/* bottom caption */}
        <div style={{
          position: "absolute", bottom: 64, left: 0, right: 0,
          textAlign: "center", padding: "0 24px",
        }}>
          <p style={{
            margin: 0, fontFamily: '"DM Sans", sans-serif',
            fontSize: 17, color: "var(--color-text-secondary)",
            maxWidth: 560, marginInline: "auto", textWrap: "pretty",
            opacity: pangeaProgress > 0.3 ? 1 : 0.5,
            transition: "opacity 400ms",
          }}>
            {showAntes
              ? "12 planilhas, 6 grupos, 3 sistemas, centenas de PDFs perdidos."
              : "Clientes, licenças, condicionantes e financeiro em um único fluxo."}
          </p>
        </div>
      </div>
    </section>
  );
}

function ChaosCard({ style, kind }) {
  const baseStyle = {
    position: "absolute", padding: 14, borderRadius: 8,
    boxShadow: "0 12px 28px -12px rgba(26,31,22,0.25), 0 2px 4px rgba(26,31,22,0.1)",
    fontFamily: '"DM Sans", sans-serif', transition: "all 800ms cubic-bezier(0.2,0.8,0.2,1)",
    ...style,
  };
  if (kind === "planilha" || kind === "planilha2") {
    const rows = kind === "planilha"
      ? [["A1", "Cliente"], ["A2", "Aurora"], ["A3", "Verde"], ["A4", "Pampeano"]]
      : [["B1", "Status"], ["B2", "?"], ["B3", "ok"], ["B4", "vencer"]];
    return (
      <div style={{ ...baseStyle, background: "#fff", border: "1px solid #c4cbbf", width: 220 }}>
        <div style={{ fontSize: 10, color: "#15803d", fontWeight: 700, marginBottom: 8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          📊 controle_licenças_v17_FINAL.xlsx
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 1, fontSize: 11, color: "#3a4035" }}>
          {rows.map(([k, v], i) => (
            <React.Fragment key={i}>
              <div style={{ background: "#f0f7da", padding: "4px 8px", border: "1px solid #c4cbbf" }}>{k}</div>
              <div style={{ background: "#fff", padding: "4px 8px", border: "1px solid #c4cbbf" }}>{v}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "email" || kind === "email2") {
    return (
      <div style={{ ...baseStyle, background: "#fff", border: "1px solid #c4cbbf", width: 240 }}>
        <div style={{ fontSize: 10, color: "#6b7566", marginBottom: 4 }}>De: rh@cliente.com.br</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1f16", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          {kind === "email" ? "RE: RE: FW: Licença LO 23/04" : "Urgente: condicionante 7"}
        </div>
        <div style={{ fontSize: 11, color: "#6b7566", marginTop: 6 }}>
          Bom dia, alguém sabe se a renovação...
        </div>
      </div>
    );
  }
  if (kind === "whatsapp") {
    return (
      <div style={{ ...baseStyle, background: "#dcf8c6", border: "1px solid #b8e08a", width: 220, borderRadius: 14 }}>
        <div style={{ fontSize: 11, color: "#0f3a35", fontWeight: 600 }}>👷 Carlos · Campo</div>
        <div style={{ fontSize: 12, color: "#1a1f16", marginTop: 6, lineHeight: 1.3 }}>
          o cliente tá ligando aqui, perderam o prazo da condicionante 4??
        </div>
        <div style={{ fontSize: 9, color: "#6b7566", marginTop: 6, textAlign: "right" }}>14:32</div>
      </div>
    );
  }
  if (kind === "postit") {
    return (
      <div style={{
        ...baseStyle, background: "#fde68a", border: "none", width: 170, height: 130,
        boxShadow: "0 14px 30px -10px rgba(0,0,0,0.25)",
        fontFamily: "'Comic Sans MS', cursive",
      }}>
        <div style={{ fontSize: 13, color: "#92400e", fontWeight: 700 }}>NÃO ESQUECER</div>
        <div style={{ fontSize: 12, color: "#3a4035", marginTop: 8, lineHeight: 1.3 }}>
          ligar pro IBAMA<br/>renovar LO Aurora<br/>até 23/04 !!!
        </div>
      </div>
    );
  }
  if (kind === "pdf") {
    return (
      <div style={{ ...baseStyle, background: "#fef2f2", border: "1px solid #fecaca", width: 180 }}>
        <div style={{ fontSize: 10, color: "#b91c1c", fontWeight: 700, marginBottom: 6 }}>📄 PDF · 4.2MB</div>
        <div style={{ fontSize: 11, color: "#1a1f16", fontWeight: 600 }}>parecer_técnico_final_v3_corrigido_final2.pdf</div>
        <div style={{ fontSize: 10, color: "#6b7566", marginTop: 6 }}>baixado: pasta Downloads</div>
      </div>
    );
  }
  return null;
}

function CleanPanel() {
  return (
    <div style={{
      width: "min(820px, 90vw)",
      background: "var(--color-bg-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 40px 80px -20px rgba(15,58,53,0.25), 0 12px 24px -8px rgba(15,58,53,0.1)",
      fontFamily: '"DM Sans", sans-serif',
    }}>
      <div style={{
        height: 36, background: "#fafbf7", borderBottom: "1px solid var(--color-border)",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
      }}>
        <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#fecaca" }} />
        <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#fde68a" }} />
        <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#bbf7d0" }} />
        <span style={{ marginLeft: 14, fontSize: 12, color: "var(--color-text-tertiary)" }}>app.pangea.com.br/licencas</span>
      </div>
      <div style={{ padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
          <div>
            <div style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
              fontSize: 24, color: "var(--color-text-primary)", letterSpacing: "-0.015em",
            }}>Licenças</div>
            <div style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginTop: 4 }}>
              142 ativas · <span style={{ color: "#92400e", fontWeight: 500 }}>8 vencendo (30d)</span>
            </div>
          </div>
          <div style={{
            background: "var(--color-primary)", color: "#fff", borderRadius: 8,
            padding: "8px 14px", fontSize: 13, fontWeight: 500,
          }}>+ Nova licença</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[
            ["Vigentes", "118", "#15803d", "#f0fdf4"],
            ["Vencendo", "8", "#92400e", "#fefce8"],
            ["Vencidas", "2", "#b91c1c", "#fef2f2"],
            ["Renovação", "14", "#1d4ed8", "#eff6ff"],
          ].map(([l, v, c, bg]) => (
            <div key={l} style={{
              background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
              borderRadius: 8, padding: "12px 14px",
            }}>
              <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
              <div style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
                fontSize: 28, color: "var(--color-text-primary)", marginTop: 4,
                fontVariantNumeric: "tabular-nums",
                display: "flex", alignItems: "baseline", gap: 8,
              }}>
                {v}
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: c }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
          {[
            ["Mineradora Aurora Ltda.", "LO · IBAMA · 23/04/2026", "vigente", "Vigente"],
            ["Construtora Verde Horizonte", "LP · SEMA-PA · 15/06/2026", "vigente", "Vigente"],
            ["Frigorífico Pampeano S.A.", "LI · INEA-RJ · 02/05/2026", "renovar", "Renovar"],
            ["Posto Estrada Nova", "LO · IAP-PR · 28/04/2026", "renovar", "Vencendo"],
          ].map((r, i) => (
            <LightRow key={i} cells={[r[0], r[1]]} status={{ kind: r[2], label: r[3] }} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  NavPro, HeroPro, MarqueeStrip, AntesDepois,
});
