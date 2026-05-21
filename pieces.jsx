/* Pangea Pro — peças de UI reutilizáveis (floats do hero, mockups parciais) */

function PgLogo({ size = 28, color = "currentColor", word = true, wordColor }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, color }}>
      <img src="landing-pro/logo.png" alt="" style={{ width: size, height: size }} />
      {word && (
        <span style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 700, fontSize: size * 0.78, letterSpacing: "-0.035em",
          color: wordColor || "inherit",
        }}>pangea</span>
      )}
    </div>
  );
}

function StatusBadge({ kind = "vigente", children }) {
  const styles = {
    vigente:  { bg: "rgba(187,247,208,0.18)", fg: "#86efac", bd: "rgba(187,247,208,0.4)" },
    renovar:  { bg: "rgba(253,230,138,0.18)", fg: "#fcd34d", bd: "rgba(253,230,138,0.4)" },
    vencendo: { bg: "rgba(253,230,138,0.18)", fg: "#fcd34d", bd: "rgba(253,230,138,0.4)" },
    vencido:  { bg: "rgba(254,202,202,0.18)", fg: "#fca5a5", bd: "rgba(254,202,202,0.4)" },
    info:     { bg: "rgba(191,219,254,0.18)", fg: "#93c5fd", bd: "rgba(191,219,254,0.4)" },
  };
  const s = styles[kind] || styles.vigente;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: s.bg, color: s.fg, border: `1px solid ${s.bd}`,
      borderRadius: 9999, padding: "3px 10px",
      fontFamily: '"DM Sans", sans-serif', fontSize: 12, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: s.fg }} />
      {children}
    </span>
  );
}

/* Card flutuante — fragmento de tabela */
function FloatTableRow({ name = "Mineradora Aurora", kind = "LO · IBAMA", date = "23/04", status = "vigente", statusLabel = "Vigente" }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(201,223,138,0.18)", borderRadius: 14,
      padding: "16px 18px", display: "grid",
      gridTemplateColumns: "1.6fr 1fr auto auto", gap: 16, alignItems: "center",
      minWidth: 480, fontFamily: '"DM Sans", sans-serif',
      boxShadow: "0 24px 48px -16px rgba(0,0,0,0.4)",
    }}>
      <div>
        <div style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600,
          fontSize: 15, color: "#fff", letterSpacing: "-0.01em",
        }}>{name}</div>
        <div style={{ fontSize: 12, color: "#8aa085", marginTop: 2 }}>{kind}</div>
      </div>
      <div style={{ fontSize: 13, color: "#d4e0c8", fontVariantNumeric: "tabular-nums" }}>{date}</div>
      <StatusBadge kind={status}>{statusLabel}</StatusBadge>
      <span style={{ color: "#8aa085", fontSize: 16 }}>⋯</span>
    </div>
  );
}

/* Card flutuante — KPI */
function FloatKPI({ label = "Vencendo (30d)", value = "8", color = "#fcd34d" }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(201,223,138,0.18)", borderRadius: 14,
      padding: "18px 20px", fontFamily: '"DM Sans", sans-serif',
      minWidth: 220,
      boxShadow: "0 24px 48px -16px rgba(0,0,0,0.4)",
    }}>
      <div style={{
        fontSize: 10, color: "#8aa085", fontWeight: 600,
        letterSpacing: "0.12em", textTransform: "uppercase",
      }}>{label}</div>
      <div style={{
        marginTop: 6, fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontWeight: 700, fontSize: 44, color: "#fff",
        letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        {value}
        <span style={{
          width: 8, height: 8, borderRadius: 9999, background: color,
          boxShadow: `0 0 0 4px ${color}33`, animation: "pg-pulse 2s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

/* Card flutuante — alerta */
function FloatAlert({ text = "3 condicionantes vencem hoje", kind = "warning" }) {
  const colors = {
    warning: { fg: "#fcd34d", bg: "rgba(253,230,138,0.12)", bd: "rgba(253,230,138,0.3)" },
    success: { fg: "#86efac", bg: "rgba(187,247,208,0.12)", bd: "rgba(187,247,208,0.3)" },
  };
  const c = colors[kind];
  return (
    <div style={{
      background: c.bg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: `1px solid ${c.bd}`, borderRadius: 9999,
      padding: "12px 18px 12px 14px", display: "inline-flex", alignItems: "center", gap: 10,
      fontFamily: '"DM Sans", sans-serif', fontSize: 14, fontWeight: 500, color: c.fg,
      boxShadow: "0 12px 28px -12px rgba(0,0,0,0.4)",
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: 9999, background: c.fg,
        color: "#0b1a0b", fontWeight: 700, fontSize: 13,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>!</span>
      {text}
    </div>
  );
}

/* Mini calendar com prazo highlight */
function MiniCalendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const highlight = [7, 12, 19, 23, 28];
  const critical = [12, 23];
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,223,138,0.15)",
      borderRadius: 14, padding: 16, fontFamily: '"DM Sans", sans-serif',
      minWidth: 240,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: "#c9df8a", fontWeight: 600 }}>Abril · 2026</span>
        <span style={{ fontSize: 11, color: "#8aa085" }}>5 prazos</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {["S","T","Q","Q","S","S","D"].map((d, i) => (
          <div key={i} style={{ fontSize: 9, color: "#6b8068", textAlign: "center", fontWeight: 600 }}>{d}</div>
        ))}
        {days.map((d) => {
          const isCrit = critical.includes(d);
          const isHi = highlight.includes(d);
          return (
            <div key={d} style={{
              fontSize: 11, color: isCrit ? "#0b1a0b" : isHi ? "#fff" : "#8aa085",
              textAlign: "center", padding: "5px 0",
              background: isCrit ? "#fcd34d" : isHi ? "rgba(201,223,138,0.18)" : "transparent",
              borderRadius: 6, fontWeight: isCrit || isHi ? 600 : 400,
              fontVariantNumeric: "tabular-nums",
            }}>{d}</div>
          );
        })}
      </div>
    </div>
  );
}

/* Pequeno mockup do produto — versão compacta para tour horizontal */
function ScreenPreview({ title = "Licenças", children, badges = [] }) {
  return (
    <div style={{
      background: "#ffffff", color: "#1a1f16", borderRadius: 14,
      border: "1px solid #c4cbbf", overflow: "hidden",
      boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), 0 12px 24px -8px rgba(0,0,0,0.2)",
      width: "100%", maxWidth: 720,
    }}>
      <div style={{ height: 32, background: "#fafbf7", borderBottom: "1px solid #e5e8e0", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#fecaca" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#fde68a" }} />
        <span style={{ width: 9, height: 9, borderRadius: 9999, background: "#bbf7d0" }} />
        <span style={{ marginLeft: 12, fontSize: 11, color: "#6b7566" }}>app.pangea.com.br · {title.toLowerCase()}</span>
      </div>
      <div style={{ padding: 22, fontFamily: '"DM Sans", sans-serif' }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700,
            fontSize: 22, color: "#0f3a35", letterSpacing: "-0.015em",
          }}>{title}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {badges.map((b, i) => (
              <span key={i} style={{
                background: b.bg, color: b.fg, border: `1px solid ${b.bd || "transparent"}`,
                padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 600,
              }}>{b.text}</span>
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* Linha de tabela light (para os screens do tour) */
function LightRow({ cells = [], status }) {
  const sty = {
    vigente:  { bg: "#f0fdf4", fg: "#15803d", bd: "#bbf7d0" },
    renovar:  { bg: "#fefce8", fg: "#92400e", bd: "#fde68a" },
    vencido:  { bg: "#fef2f2", fg: "#b91c1c", bd: "#fecaca" },
  };
  return (
    <div style={{
      display: "grid", gridTemplateColumns: `repeat(${cells.length}, 1fr) auto`,
      gap: 12, padding: "10px 14px", borderTop: "1px solid #e5e8e0",
      fontSize: 13, alignItems: "center",
    }}>
      {cells.map((c, i) => (
        <span key={i} style={{
          color: i === 0 ? "#1a1f16" : "#3a4035",
          fontWeight: i === 0 ? 500 : 400,
          fontVariantNumeric: i > 0 ? "tabular-nums" : "normal",
        }}>{c}</span>
      ))}
      {status && (
        <span style={{
          background: sty[status.kind].bg, color: sty[status.kind].fg,
          border: `1px solid ${sty[status.kind].bd}`,
          padding: "2px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 600,
        }}>{status.label}</span>
      )}
    </div>
  );
}

Object.assign(window, {
  PgLogo, StatusBadge, FloatTableRow, FloatKPI, FloatAlert,
  MiniCalendar, ScreenPreview, LightRow,
});
