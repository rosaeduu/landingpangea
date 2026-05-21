/* Pangea Pro — hooks de scroll, cursor, reveal e contadores */

const { useState, useEffect, useRef, useCallback, useLayoutEffect } = React;

/* useScrollProgress — retorna progresso 0..1 conforme o elemento atravessa o viewport
   start: quando topo do elemento toca a parte de baixo do viewport (0)
   end: quando bottom do elemento sai pelo topo (1)
   options.range pode customizar ("enter" | "cover" | "exit") */
function useScrollProgress(ref, mode = "cover") {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p;
      if (mode === "cover") {
        // 0 quando topo entra; 1 quando bottom sai
        const total = vh + r.height;
        p = (vh - r.top) / total;
      } else if (mode === "pin") {
        // para sticky/pinned: 0 quando topo atinge topo; 1 quando bottom atinge bottom
        const total = r.height - vh;
        p = -r.top / Math.max(total, 1);
      } else {
        p = (vh - r.top) / vh;
      }
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);
  return progress;
}

/* useInView — true uma vez que o elemento entra no viewport (para revelar) */
function useInView(ref, threshold = 0.15, once = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold, once]);
  return inView;
}

/* useCursor — posição relativa (-1..1) ao elemento (não ao viewport) */
function useCursor(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0, inside: false });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
        setPos({ x: x * 2 - 1, y: y * 2 - 1, raw: { x, y }, inside });
      });
    };
    const onLeave = () => setPos((p) => ({ ...p, inside: false }));
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return pos;
}

/* useCountUp — anima um número 0→target quando o ref entra no viewport.
   Retorna o número formatado. */
function useCountUp(ref, target, { duration = 1600, format = (n) => Math.round(n).toLocaleString("pt-BR"), startWhen } = {}) {
  const inView = useInView(ref, 0.4, true);
  const triggered = startWhen ?? inView;
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);
  return format(val);
}

/* Reveal — wrapper de fade-up automático com delay */
function Reveal({ children, delay = 0, as = "div", style = {}, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.12, true);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 800ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 800ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* SplitText — anima palavras com staggered delay quando entra no viewport */
function SplitText({ children, delay = 0, stagger = 40, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2, true);
  const extract = (n) => {
    if (n == null || typeof n === "boolean") return "";
    if (typeof n === "string" || typeof n === "number") return String(n);
    if (Array.isArray(n)) return n.map(extract).join("");
    if (n.props) return extract(n.props.children);
    return "";
  };
  const words = extract(children).split(/\s+/).filter(Boolean);
  return (
    <span ref={ref} className={className} style={{ display: "inline", ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: "inline-block", overflow: "hidden", verticalAlign: "bottom",
          paddingBottom: "0.22em", paddingRight: "0.15em",
          marginRight: i < words.length - 1 ? "0.15em" : 0,
        }}>
          <span style={{
            display: "inline-block",
            transform: inView ? "translateY(0)" : "translateY(110%)",
            opacity: inView ? 1 : 0,
            transition: `transform 800ms cubic-bezier(0.2,0.8,0.2,1) ${delay + i * stagger}ms, opacity 600ms cubic-bezier(0.2,0.8,0.2,1) ${delay + i * stagger}ms`,
          }}>{w}</span>
        </span>
      ))}
    </span>
  );
}

/* Marquee — loop infinito horizontal, pausa no hover */
function Marquee({ children, speed = 60, direction = 1, style = {} }) {
  // duplica conteúdo para loop
  return (
    <div style={{ overflow: "hidden", display: "flex", ...style }}>
      <div style={{
        display: "flex", gap: 0, whiteSpace: "nowrap",
        animation: `pg-marquee ${speed}s linear infinite ${direction < 0 ? "reverse" : ""}`,
      }}>
        <div style={{ display: "flex", flexShrink: 0 }}>{children}</div>
        <div style={{ display: "flex", flexShrink: 0 }} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/* clamp/lerp helpers */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp  = (a, b, t) => a + (b - a) * t;
const map   = (v, a, b, c, d) => lerp(c, d, clamp((v - a) / (b - a), 0, 1));

Object.assign(window, {
  useScrollProgress, useInView, useCursor, useCountUp,
  Reveal, SplitText, Marquee, clamp, lerp, map,
});
