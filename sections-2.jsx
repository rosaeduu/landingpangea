/* Pangea Pro — Bento grid, Horizontal product tour, Counters, CTA, Footer */

/* ---------------- BENTO GRID ---------------- */
function BentoGrid() {
  return (
    <section id="produto" style={{
      background: "var(--g900)", color: "#fff",
      padding: "140px 0", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(119,171,89,0.18), transparent 60%)",
      }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 5vw, 48px)", position: "relative" }}>
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <Reveal>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#77ab59",
            }}>
              <span style={{ width: 22, height: 1, background: "currentColor", opacity: 0.5 }} />
              o que está dentro
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{
              margin: "20px 0 0", fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700, fontSize: "clamp(44px, 6vw, 80px)",
              lineHeight: 1, letterSpacing: "-0.04em", textWrap: "balance",
            }}>
              Pensado para o ritmo de quem<br/>
              <span style={{ color: "#c9df8a" }}>trabalha com prazo.</span>
            </h2>
          </Reveal>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridAutoRows: "minmax(220px, auto)",
          gap: 16,
        }}>
          <BentoTile span={3} rowSpan={2} title="Alertas antes do prazo" desc="A Pangea calcula vencimentos e avisa 90, 60 e 30 dias antes. Cada licença, cada condicionante, cada renovação." accent>
            <BentoCalendarDemo />
          </BentoTile>

          <BentoTile span={3} title="Números que somam" desc="Tabular-nums em toda parte. Comparar valores em coluna deixa de ser exercício de paciência.">
            <BentoNumbersDemo />
          </BentoTile>

          <BentoTile span={2} title="Status calmos" desc="Pastel, nunca alarme. Em sistema operacional, vermelho saturado constante anestesia.">
            <BentoBadgesDemo />
          </BentoTile>

          <BentoTile span={4} title="Workflow regulatório" desc="Orçamento vira processo, processo vira licença, licença vira condicionantes. O fluxo da consultoria modelado dentro do produto.">
            <BentoWorkflowDemo />
          </BentoTile>

          <BentoTile span={2} title="Permissões granulares" desc="Cargos custom estilo Discord. Quem vê o quê, quem aprova o quê.">
            <BentoPermsDemo />
          </BentoTile>

          <BentoTile span={2} title="Brasileiro de origem" desc="CNPJ, CEP, R$, dd/mm/aaaa. Microcopy em PT-BR.">
            <BentoBrasilDemo />
          </BentoTile>

          <BentoTile span={2} title="Dark mode nativo" desc="Verde profundo para trabalho noturno. Sem dor de olho, sem hack de tema.">
            <BentoThemeDemo />
          </BentoTile>
        </div>
      </div>
    </section>
  );
}

function BentoTile({ children, title, desc, span = 2, rowSpan = 1, accent = false }) {
  const tileRef = useRef(null);
  const cur = useCursor(tileRef);
  const tx = cur.inside ? cur.x * 4 : 0;
  const ty = cur.inside ? cur.y * 4 : 0;
  return (
    <Reveal style={{
      gridColumn: `span ${span}`, gridRow: `span ${rowSpan}`,
      minWidth: 0,
    }}>
      <div ref={tileRef} style={{
        background: accent
          ? "linear-gradient(160deg, #13301a 0%, #1a3a22 100%)"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${accent ? "rgba(201,223,138,0.25)" : "rgba(201,223,138,0.12)"}`,
        borderRadius: 20, padding: 28, height: "100%",
        display: "flex", flexDirection: "column", gap: 16,
        position: "relative", overflow: "hidden",
        transform: `perspective(1200px) rotateX(${-ty * 0.3}deg) rotateY(${tx * 0.3}deg)`,
        transition: "transform 200ms cubic-bezier(0.2,0.8,0.2,1)",
      }}>
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "stretch" }}>{children}</div>
        <div>
          <div style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
            fontSize: 20, color: "#fff", letterSpacing: "-0.015em",
          }}>{title}</div>
          <p style={{
            margin: "6px 0 0", fontSize: 14, lineHeight: 1.5,
            color: "#d4e0c8", fontFamily: '"DM Sans", sans-serif',
            maxWidth: 480, textWrap: "pretty",
          }}>{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* Bento demos */
function BentoCalendarDemo() {
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "8px 0",
    }}>
      <MiniCalendar />
    </div>
  );
}

function BentoNumbersDemo() {
  const rows = [
    ["Aurora", "R$ 47.231,80", "▲"],
    ["Verde Horizonte", "R$ 12.480,00", "▼"],
    ["Pampeano", "R$ 89.000,00", "▲"],
    ["Estrada Nova", "R$  3.218,40", "—"],
  ];
  return (
    <div style={{ flex: 1, alignSelf: "stretch" }}>
      <div style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: 11, color: "#8aa085", letterSpacing: "0.1em",
        textTransform: "uppercase", marginBottom: 8, fontWeight: 600,
      }}>À receber · Abril</div>
      <div style={{
        background: "rgba(0,0,0,0.2)", borderRadius: 10,
        border: "1px solid rgba(201,223,138,0.12)", overflow: "hidden",
      }}>
        {rows.map(([n, v, a], i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr auto auto", gap: 10,
            padding: "10px 14px", borderTop: i ? "1px solid rgba(201,223,138,0.08)" : "none",
            fontFamily: '"DM Sans", sans-serif', fontSize: 13, alignItems: "center",
          }}>
            <span style={{ color: "#fff", fontWeight: 500 }}>{n}</span>
            <span style={{
              color: "#c9df8a", fontVariantNumeric: "tabular-nums",
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 12,
            }}>{v}</span>
            <span style={{ color: a === "▲" ? "#86efac" : a === "▼" ? "#fca5a5" : "#8aa085", fontSize: 11 }}>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoBadgesDemo() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10,
    }}>
      <StatusBadge kind="vigente">Vigente</StatusBadge>
      <StatusBadge kind="renovar">Renovar em 30d</StatusBadge>
      <StatusBadge kind="vencido">Vencido</StatusBadge>
      <StatusBadge kind="info">Em análise</StatusBadge>
    </div>
  );
}

function BentoWorkflowDemo() {
  const nodes = ["Orçamento", "Processo", "Licença", "Condicionantes"];
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center",
      gap: 8, fontFamily: '"DM Sans", sans-serif',
    }}>
      {nodes.map((n, i) => (
        <React.Fragment key={n}>
          <div style={{
            padding: "10px 14px", borderRadius: 10,
            background: i === 2 ? "rgba(201,223,138,0.18)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${i === 2 ? "rgba(201,223,138,0.4)" : "rgba(201,223,138,0.15)"}`,
            color: i === 2 ? "#c9df8a" : "#d4e0c8",
            fontSize: 13, fontWeight: 500, flex: 1, textAlign: "center", minWidth: 0,
          }}>{n}</div>
          {i < nodes.length - 1 && (
            <span style={{ color: "#77ab59", fontSize: 14, flexShrink: 0 }}>→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function BentoPermsDemo() {
  const roles = [
    ["Sócio", "#c9df8a"],
    ["Coordenador", "#86efac"],
    ["Analista", "#93c5fd"],
    ["Campo", "#fcd34d"],
    ["Externo", "#fca5a5"],
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
      {roles.map(([r, c]) => (
        <div key={r} style={{
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: "#d4e0c8",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: c }} />
          {r}
        </div>
      ))}
    </div>
  );
}

function BentoBrasilDemo() {
  const tokens = ["CNPJ", "R$", "dd/mm/aaaa", "IBAMA", "CEP"];
  return (
    <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 8, alignContent: "center" }}>
      {tokens.map((t, i) => (
        <span key={t} style={{
          background: "rgba(201,223,138,0.10)", color: "#c9df8a",
          border: "1px solid rgba(201,223,138,0.2)", padding: "5px 12px",
          borderRadius: 9999, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 12, fontWeight: 600,
        }}>{t}</span>
      ))}
    </div>
  );
}

function BentoThemeDemo() {
  return (
    <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "stretch" }}>
      {[
        { bg: "#fff", fg: "#0f3a35", border: "#c4cbbf", label: "Claro" },
        { bg: "#0b1a0b", fg: "#c9df8a", border: "#1f3a1f", label: "Verde" },
      ].map((t) => (
        <div key={t.label} style={{
          flex: 1, background: t.bg, color: t.fg, border: `1px solid ${t.border}`,
          borderRadius: 10, padding: "14px 12px",
          display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 8,
        }}>
          <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 500 }}>theme</div>
          <div style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
            fontSize: 16, letterSpacing: "-0.01em",
          }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- HORIZONTAL PRODUCT TOUR ---------------- */
function ProductTour() {
  const ref = useRef(null);
  const prog = useScrollProgress(ref, "pin");
  const panels = [
    {
      title: "Dashboard",
      copy: "Visão consolidada da operação — prazos críticos, financeiro do mês, processos em andamento.",
      screen: <ScreenPreview title="Dashboard" badges={[{ text: "Abril 2026", bg: "#f0f7da", fg: "#234d20" }]}>
        <DashboardPreview />
      </ScreenPreview>,
    },
    {
      title: "Clientes",
      copy: "Cadastro completo de empresas, RTs, contatos e contratos. CNPJ validado, histórico unificado.",
      screen: <ScreenPreview title="Clientes" badges={[{ text: "47 ativos", bg: "#f0fdf4", fg: "#15803d" }]}>
        {[
          ["Mineradora Aurora Ltda.", "CNPJ 12.345.678/0001-90"],
          ["Construtora Verde Horizonte", "CNPJ 23.456.789/0001-01"],
          ["Frigorífico Pampeano S.A.", "CNPJ 34.567.890/0001-12"],
          ["Posto Estrada Nova", "CNPJ 45.678.901/0001-23"],
          ["Indústria Têxtil Capivara", "CNPJ 56.789.012/0001-34"],
        ].map((c, i) => <LightRow key={i} cells={c} status={{ kind: "vigente", label: "Ativo" }} />)}
      </ScreenPreview>,
    },
    {
      title: "Licenças",
      copy: "Vigência, órgão emissor, renovação. Cada licença com timeline e alertas configuráveis por equipe.",
      screen: <ScreenPreview title="Licenças" badges={[{ text: "8 vencendo", bg: "#fefce8", fg: "#92400e" }]}>
        {[
          ["Mineradora Aurora", "LO · IBAMA · 23/04/2026", "vigente", "Vigente"],
          ["Construtora Verde", "LP · SEMA-PA · 15/06/2026", "vigente", "Vigente"],
          ["Frigorífico Pampeano", "LI · INEA-RJ · 02/05/2026", "renovar", "Renovar"],
          ["Posto Estrada Nova", "LO · IAP-PR · 28/04/2026", "renovar", "Vencendo"],
          ["Têxtil Capivara", "AA · CETESB-SP · 11/05/2026", "vigente", "Vigente"],
        ].map((r, i) => <LightRow key={i} cells={[r[0], r[1]]} status={{ kind: r[2], label: r[3] }} />)}
      </ScreenPreview>,
    },
    {
      title: "Condicionantes",
      copy: "Cada obrigação imposta vira tarefa rastreável: prazo, responsável, evidência. Nada fica em e-mail.",
      screen: <ScreenPreview title="Condicionantes" badges={[{ text: "3 hoje", bg: "#fefce8", fg: "#92400e" }]}>
        {[
          ["Cond. 7 · Monitoramento fauna", "Responsável: Carlos · 23/04"],
          ["Cond. 12 · PRAD", "Responsável: Marina · 28/04"],
          ["Cond. 19 · Outorga", "Responsável: Rafael · 02/05"],
          ["Cond. 23 · Sondagem", "Responsável: Ana · 11/05"],
        ].map((c, i) => <LightRow key={i} cells={c} status={{ kind: i < 2 ? "renovar" : "vigente", label: i < 2 ? "Hoje" : "Em prazo" }} />)}
      </ScreenPreview>,
    },
    {
      title: "Financeiro",
      copy: "À receber, à pagar, fechamento mensal. Conta corrente por organização, conciliação simples.",
      screen: <ScreenPreview title="Financeiro" badges={[{ text: "Fechado Mar", bg: "#f0fdf4", fg: "#15803d" }, { text: "Aberto Abr", bg: "#fefce8", fg: "#92400e" }]}>
        {[
          ["Aurora · NF 1247", "R$ 47.231,80 · 23/04"],
          ["Verde · NF 1248", "R$ 12.480,00 · 25/04"],
          ["Pampeano · NF 1249", "R$ 89.000,00 · 28/04"],
          ["Estrada Nova · NF 1250", "R$ 3.218,40 · 30/04"],
        ].map((c, i) => <LightRow key={i} cells={c} status={{ kind: i < 2 ? "vigente" : "renovar", label: i < 2 ? "Pago" : "Aberto" }} />)}
      </ScreenPreview>,
    },
  ];

  // 4 transições entre 5 panels — progress 0..1 mapeia para -(panels.length-1)*screenWidth
  // queremos 8% buffer no início + fim
  const eff = clamp((prog - 0.05) / 0.9, 0, 1);
  const translateX = -eff * (panels.length - 1) * 100; // em vw

  return (
    <section id="funciona" ref={ref} style={{
      height: `${panels.length * 100}vh`, position: "relative",
      background: "var(--color-bg-page)",
    }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* header */}
        <div style={{
          padding: "48px clamp(20px,5vw,48px) 24px", flexShrink: 0,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32,
        }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--color-primary)",
            }}>
              <span style={{ width: 22, height: 1, background: "currentColor", opacity: 0.5 }} />
              tour pelo produto
            </span>
            <h2 style={{
              margin: "12px 0 0", fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1, letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
            }}>
              {panels[Math.round(eff * (panels.length - 1))].title}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {panels.map((p, i) => {
              const active = Math.round(eff * (panels.length - 1)) === i;
              return (
                <div key={i} style={{
                  height: 4, width: active ? 28 : 18,
                  background: active ? "var(--color-primary)" : "var(--n300)",
                  borderRadius: 9999, transition: "all 300ms",
                }} />
              );
            })}
          </div>
        </div>

        {/* track */}
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <div style={{
            display: "flex", height: "100%",
            transform: `translateX(${translateX}vw)`,
            transition: "transform 80ms linear",
            willChange: "transform",
          }}>
            {panels.map((p, i) => (
              <div key={i} style={{
                width: "100vw", flexShrink: 0, height: "100%",
                display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48,
                alignItems: "center", padding: "0 clamp(20px,5vw,80px) 48px",
                boxSizing: "border-box",
              }}>
                <div>
                  <div style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
                    fontSize: 96, lineHeight: 1, letterSpacing: "-0.05em",
                    color: "var(--g200)", marginBottom: 16,
                    fontVariantNumeric: "tabular-nums",
                  }}>{String(i + 1).padStart(2, "0")}</div>
                  <p style={{
                    margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 500, fontSize: 24, lineHeight: 1.35,
                    color: "var(--color-text-primary)", letterSpacing: "-0.015em",
                    maxWidth: 440, textWrap: "pretty",
                  }}>{p.copy}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  {p.screen}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <React.Fragment>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          ["Licenças", "142", "#15803d"],
          ["À receber", "R$ 248k", "#1d4ed8"],
          ["Vencendo (30d)", "8", "#92400e"],
        ].map(([l, v, c]) => (
          <div key={l} style={{
            background: "#fafbf7", border: "1px solid #e5e8e0", borderRadius: 8, padding: "12px 14px",
          }}>
            <div style={{ fontSize: 10, color: "#6b7566", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
            <div style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 22,
              color: "#1a1f16", marginTop: 4, fontVariantNumeric: "tabular-nums",
              display: "flex", alignItems: "baseline", gap: 6,
            }}>
              {v}<span style={{ width: 6, height: 6, borderRadius: 9999, background: c }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        background: "#fafbf7", border: "1px solid #e5e8e0", borderRadius: 8, padding: 14,
        fontFamily: '"DM Sans", sans-serif',
      }}>
        <div style={{ fontSize: 11, color: "#6b7566", fontWeight: 600, marginBottom: 8 }}>Próximos prazos</div>
        {[
          ["Aurora · Cond. 7", "hoje", "#b91c1c"],
          ["Verde · LO renovar", "5d", "#92400e"],
          ["Pampeano · NF 1249", "12d", "#15803d"],
        ].map(([n, d, c], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderTop: i ? "1px solid #ededed" : "none", fontSize: 12 }}>
            <span style={{ color: "#1a1f16" }}>{n}</span>
            <span style={{ color: c, fontWeight: 600 }}>{d}</span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

/* ---------------- COUNTERS ---------------- */
function CountersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.3, true);

  const Counter = ({ target, suffix = "", prefix = "", label, divider }) => {
    const cref = useRef(null);
    const fmt = (n) => Math.round(n).toLocaleString("pt-BR");
    const val = useCountUp(cref, target, { startWhen: inView, format: fmt, duration: 2200 });
    return (
      <div ref={cref} style={{ position: "relative", padding: "32px 24px", textAlign: "center" }}>
        {divider && (
          <div style={{
            position: "absolute", left: 0, top: "20%", bottom: "20%", width: 1,
            background: "var(--color-border)",
          }} />
        )}
        <div style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800,
          fontSize: "clamp(52px, 6.5vw, 96px)", lineHeight: 1,
          letterSpacing: "-0.05em", color: "var(--color-text-primary)",
          fontVariantNumeric: "tabular-nums",
          display: "inline-flex", alignItems: "baseline", gap: "0.1em",
          justifyContent: "center",
        }}>
          {prefix && (
            <span style={{
              fontSize: "0.42em", fontWeight: 600, color: "var(--color-text-tertiary)",
              letterSpacing: "0", alignSelf: "center", transform: "translateY(-0.45em)",
            }}>{prefix}</span>
          )}
          <span>{val}</span>
          {suffix && (
            <span style={{
              fontSize: "0.5em", fontWeight: 700, color: "var(--color-primary)",
              letterSpacing: "-0.02em",
            }}>{suffix}</span>
          )}
        </div>
        <div style={{
          marginTop: 16, fontFamily: '"DM Sans", sans-serif', fontSize: 14,
          color: "var(--color-text-tertiary)", maxWidth: 220, marginInline: "auto",
          textWrap: "pretty", lineHeight: 1.45,
        }}>{label}</div>
      </div>
    );
  };

  return (
    <section id="numeros" ref={ref} style={{
      background: "var(--color-bg-page)", padding: "120px 0",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>
        <div style={{ maxWidth: 720, marginBottom: 56, textAlign: "center", marginInline: "auto" }}>
          <Reveal>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--color-primary)", justifyContent: "center",
            }}>
              <span style={{ width: 22, height: 1, background: "currentColor", opacity: 0.5 }} />
              o porquê
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 style={{
              margin: "20px 0 0", fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.02, letterSpacing: "-0.03em",
              color: "var(--color-text-primary)", textWrap: "balance",
            }}>
              O ROI de não esquecer<br/>
              <span style={{ color: "var(--color-primary)" }}>um único prazo.</span>
            </h2>
          </Reveal>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 20, overflow: "hidden",
        }}>
          <Counter target={50000} prefix="R$" label="em multa evitada, em média, por consultoria a cada ano." />
          <Counter target={100} suffix="+" label="consultorias garantiram acesso antecipado." divider />
          <Counter target={90} suffix="d" label="alertas configuráveis antes de cada vencimento." divider />
          <Counter target={100} suffix="%" label="dos prazos rastreáveis num único fluxo." divider />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA FINAL ---------------- */
function CTAFinalPro() {
  const ref = useRef(null);
  const cur = useCursor(ref);
  return (
    <section
      id="contato" ref={ref}
      style={{
        background: "var(--g900)", color: "#fff", padding: "140px 0 120px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* mesh gradient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(circle 700px at ${cur.inside ? cur.raw.x * 100 : 30}% ${cur.inside ? cur.raw.y * 100 : 30}%, rgba(119,171,89,0.35), transparent 60%),
          radial-gradient(circle 500px at ${cur.inside ? (1 - cur.raw.x) * 100 : 80}% ${cur.inside ? (1 - cur.raw.y) * 100 : 70}%, rgba(15,58,53,0.6), transparent 60%)
        `,
        transition: "background 100ms linear",
      }} />
      {/* grain */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        filter: "url(#pg-grain)", opacity: 0.14, mixBlendMode: "overlay",
      }} />

      <div style={{
        maxWidth: 880, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)",
        textAlign: "center", position: "relative",
      }}>
        <Reveal>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(201,223,138,0.10)", color: "#c9df8a",
            border: "1px solid rgba(201,223,138,0.25)",
            padding: "6px 14px", borderRadius: 9999,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13, fontWeight: 500,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: 9999, background: "#c9df8a",
              boxShadow: "0 0 0 4px rgba(201,223,138,0.2)",
              animation: "pg-pulse 2s ease-in-out infinite",
            }} />
            teste grátis por 7 dias · sem cartão
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 style={{
            margin: "32px 0 0", fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700, fontSize: "clamp(56px, 8vw, 120px)",
            lineHeight: 0.92, letterSpacing: "-0.05em", color: "#fff",
            textWrap: "balance",
          }}>
            Comece antes<br/>
            <span style={{ color: "#c9df8a", fontStyle: "italic", fontWeight: 600 }}>de todos.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={{
            margin: "32px auto 0", fontSize: 20, lineHeight: 1.5,
            color: "#d4e0c8", maxWidth: 580,
            fontFamily: '"DM Sans", sans-serif',
          }}>
            Teste a Pangea por 7 dias gratuitos. Sem cartão de crédito,
            sem ginástica para cancelar — só a Pangea no seu fluxo de trabalho.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <HeroForm />
        </Reveal>
        <Reveal delay={400}>
          <div style={{
            marginTop: 24, fontSize: 13, color: "#8aa085",
            fontFamily: '"DM Sans", sans-serif',
          }}>
            <span style={{ color: "#c9df8a" }}>●</span> sem cartão de crédito · cancele quando quiser
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function FooterPro() {
  return (
    <footer style={{
      background: "#091508", color: "#8aa085",
      padding: "80px 0 40px", borderTop: "1px solid #1d3f1a",
      fontFamily: '"DM Sans", sans-serif', position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,48px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 48, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 380 }}>
            <PgLogo size={36} color="#c9df8a" wordColor="#c9df8a" />
            <p style={{
              margin: "16px 0 0", fontSize: 14, lineHeight: 1.6, color: "#6b8068",
            }}>
              O sistema das ambientais. ERP B2B para consultorias ambientais brasileiras,
              evolução do Pantalassa em produção desde 2020.
            </p>
          </div>
          <div style={{ display: "flex", gap: 64 }}>
            <FooterCol title="Produto" links={["Funcionalidades", "Tour", "Preços", "Roadmap"]} />
            <FooterCol title="Empresa" links={["Origem", "Equipe", "Blog", "Contato"]} />
            <FooterCol title="Legal" links={["Termos", "Privacidade", "LGPD"]} />
          </div>
        </div>

        {/* divider */}
        <div style={{ marginTop: 64, borderTop: "1px solid #1d3f1a" }} />

        <div style={{
          marginTop: 24, display: "flex", justifyContent: "space-between",
          gap: 16, flexWrap: "wrap",
          fontSize: 12, color: "#6b8068",
        }}>
          <span>© Pangea · 2026 · construído no Brasil</span>
          <span>contato@pangea.com.br · v0.9 beta</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{
        fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
        fontSize: 13, color: "#c9df8a", marginBottom: 16,
        letterSpacing: "0.04em", textTransform: "uppercase",
      }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l) => (
          <li key={l}>
            <a href="#" style={{
              color: "#d4e0c8", textDecoration: "none", fontSize: 14,
            }}>{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, {
  BentoGrid, ProductTour, CountersSection, CTAFinalPro, FooterPro,
});
