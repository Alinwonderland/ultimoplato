import { useState, useEffect, useRef } from "react";

const C = {
  yellow: "#F1C158",
  green: "#4C7038",
  black: "#1C1C1E",
  white: "#FAFAF6",
  gray: "#9CA3AF",
  darkGray: "#2A2A2C",
  lightGreen: "rgba(76,112,56,0.12)",
  lightYellow: "rgba(241,193,88,0.12)",
};

const useInView = () => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);
  return [setRef, inView];
};

const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500">
    <circle cx="250" cy="250" r="230" fill="none" stroke={C.green} strokeWidth="28"/>
    <rect x="52" y="80" width="18" height="200" rx="9" fill={C.green}/>
    <rect x="78" y="80" width="18" height="120" rx="9" fill={C.green}/>
    <rect x="104" y="80" width="18" height="200" rx="9" fill={C.green}/>
    <rect x="52" y="200" width="70" height="18" rx="9" fill={C.green}/>
    <rect x="378" y="80" width="18" height="320" rx="9" fill={C.green}/>
    <path d="M378 80 Q410 130 396 200 L378 200Z" fill={C.green}/>
    <circle cx="250" cy="250" r="155" fill="none" stroke={C.yellow} strokeWidth="28"/>
    <circle cx="250" cy="250" r="112" fill={C.black}/>
    <path d="M175 250 L225 305 L330 195" fill="none" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Stars = ({ n = 5 }) => (
  <span style={{ color: C.yellow, letterSpacing: "2px", fontSize: "14px" }}>
    {"★".repeat(n)}
  </span>
);

const Btn = ({ children, onClick, variant = "primary", style = {} }) => (
  <button onClick={onClick} style={{
    padding: "14px 28px", borderRadius: "10px", border: "none",
    fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: "600",
    cursor: "pointer", transition: "all 0.2s", letterSpacing: "-0.01em",
    background: variant === "primary" ? C.yellow : variant === "green" ? C.green : "transparent",
    color: variant === "primary" ? C.black : variant === "outline" ? C.yellow : "#fff",
    border: variant === "outline" ? `1.5px solid ${C.yellow}` : "none",
    ...style
  }}>{children}</button>
);

const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { id: "home", label: "Inicio" },
    { id: "como-funciona", label: "Cómo funciona" },
    { id: "precios", label: "Precios" },
    { id: "nosotros", label: "Nosotros" },
    { id: "contacto", label: "Contacto" },
  ];
  const go = (id) => { setPage(id); setMenuOpen(false); window.scrollTo(0, 0); };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(28,28,30,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s", padding: "0 40px",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <Logo size={36} />
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontWeight: "700", color: C.white, lineHeight: "1.1" }}>Último Plato</div>
            <div style={{ fontSize: "9px", color: C.yellow, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Review</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {links.filter(l => l.id !== "contacto").map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "8px 14px",
              fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: "500",
              color: page === l.id ? C.yellow : C.gray, transition: "color 0.2s"
            }}>{l.label}</button>
          ))}
          <Btn onClick={() => go("contacto")} style={{ marginLeft: "12px", padding: "10px 20px", fontSize: "14px" }}>
            Informe gratuito →
          </Btn>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };
  return (
    <footer style={{ background: C.black, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 40px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", marginBottom: "48px" }}>
          <div style={{ maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Logo size={40} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: "700", color: C.white }}>Último Plato</div>
                <div style={{ fontSize: "10px", color: C.yellow, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Review</div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: C.gray, lineHeight: "1.7", fontFamily: "Inter, sans-serif" }}>
              El sistema de gestión de reseñas diseñado exclusivamente para restaurantes que quieren llenar mesas con la confianza de sus clientes.
            </p>
            <div style={{ marginTop: "16px" }}>
              <Stars />
            </div>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: C.yellow, fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "Inter, sans-serif" }}>Navegación</div>
            {[["home","Inicio"],["como-funciona","Cómo funciona"],["precios","Precios"],["nosotros","Nosotros"],["contacto","Contacto"]].map(([id, label]) => (
              <div key={id} onClick={() => go(id)} style={{ fontSize: "14px", color: C.gray, cursor: "pointer", marginBottom: "10px", fontFamily: "Inter, sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.white}
                onMouseLeave={e => e.target.style.color = C.gray}>
                {label}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "11px", color: C.yellow, fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "Inter, sans-serif" }}>Contacto</div>
            <div style={{ fontSize: "14px", color: C.gray, marginBottom: "10px", fontFamily: "Inter, sans-serif" }}>hola@ultimoplato.com</div>
            <div style={{ fontSize: "14px", color: C.gray, marginBottom: "10px", fontFamily: "Inter, sans-serif" }}>605 158 994</div>
            <div style={{ fontSize: "14px", color: C.gray, fontFamily: "Inter, sans-serif" }}>Alicante, España</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontSize: "13px", color: "#4B5563", fontFamily: "Inter, sans-serif" }}>© 2026 Último Plato Review · Todos los derechos reservados</div>
          <div style={{ fontSize: "13px", color: "#4B5563", fontFamily: "Inter, sans-serif" }}>ultimoplato.com</div>
        </div>
      </div>
    </footer>
  );
};

const SectionTitle = ({ badge, title, subtitle, center = true, inView }) => (
  <div style={{ textAlign: center ? "center" : "left", marginBottom: "56px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
    {badge && <div style={{ display: "inline-block", background: C.lightYellow, border: `1px solid rgba(241,193,88,0.25)`, borderRadius: "100px", padding: "5px 16px", fontSize: "11px", color: C.yellow, fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "Inter, sans-serif" }}>{badge}</div>}
    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "700", color: C.white, lineHeight: "1.15", letterSpacing: "-0.02em", marginBottom: subtitle ? "16px" : "0" }} dangerouslySetInnerHTML={{ __html: title }} />
    {subtitle && <p style={{ fontSize: "17px", color: C.gray, lineHeight: "1.7", maxWidth: "560px", margin: center ? "0 auto" : "0", fontFamily: "Inter, sans-serif" }}>{subtitle}</p>}
  </div>
);

// ===================== HOME PAGE =====================
const Home = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };
  const [heroRef, heroIn] = useInView();
  const [statsRef, statsIn] = useInView();
  const [problemRef, problemIn] = useInView();
  const [howRef, howIn] = useInView();
  const [whoRef, whoIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  return (
    <div>
      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, #0D1F0A 0%, ${C.black} 60%)`, minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: "68px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(76,112,56,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(241,193,88,0.08) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234C7038' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div ref={heroRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px", opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(32px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.lightGreen, border: `1px solid rgba(76,112,56,0.3)`, borderRadius: "100px", padding: "6px 18px", marginBottom: "32px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.green }} />
              <span style={{ fontSize: "12px", color: "#7CB87A", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>La revolución de las reseñas ha llegado</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(44px, 6vw, 76px)", fontWeight: "700", lineHeight: "1.08", letterSpacing: "-0.03em", color: C.white, marginBottom: "24px" }}>
              El último plato<br />
              que sirves puede ser<br />
              <span style={{ color: C.yellow }}>el primero que te<br />recomiende.</span>
            </h1>
            <p style={{ fontSize: "19px", color: C.gray, lineHeight: "1.7", marginBottom: "40px", maxWidth: "580px", fontFamily: "Inter, sans-serif" }}>
              Último Plato Review es el sistema de gestión de reseñas diseñado exclusivamente para restaurantes que quieren llenar mesas con la confianza de sus clientes.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Btn onClick={() => go("contacto")} style={{ fontSize: "16px", padding: "16px 32px" }}>
                Quiero mi informe gratuito →
              </Btn>
              <Btn variant="outline" onClick={() => go("como-funciona")} style={{ fontSize: "16px", padding: "16px 32px" }}>
                Cómo funciona
              </Btn>
            </div>
            <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "16px" }}>
              <Stars />
              <span style={{ fontSize: "13px", color: "#4B5563", fontFamily: "Inter, sans-serif" }}>Más reseñas. Mejor posición. Más clientes.</span>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
          <span style={{ fontSize: "11px", color: C.gray, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Descubre más</span>
          <div style={{ fontSize: "20px", animation: "float 2s ease-in-out infinite" }}>↓</div>
        </div>
      </section>

      {/* STATS BAR */}
      <section ref={statsRef} style={{ background: C.green, padding: "48px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0" }}>
          {[
            { num: "93%", label: "de clientes consulta reseñas antes de elegir dónde comer" },
            { num: "3,4×", label: "más reservas consiguen negocios con reseñas recientes" },
            { num: "0,3★", label: "más de media respondiendo el 100% de las reseñas" },
            { num: "40%", label: "de clientes descarta un negocio sin respuesta a reseñas" },
          ].map((st, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "16px 24px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none",
              opacity: statsIn ? 1 : 0, transform: statsIn ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ease ${i * 100}ms`
            }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "40px", fontWeight: "700", color: C.yellow, lineHeight: "1", marginBottom: "8px" }}>{st.num}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.5", fontFamily: "Inter, sans-serif" }}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EL PROBLEMA */}
      <section ref={problemRef} style={{ background: C.white, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle
            badge="Por qué ahora"
            title="Internet ha cambiado.<br/>¿Lo sabe tu restaurante?"
            subtitle="La forma en que los clientes eligen dónde comer ha cambiado radicalmente. Las reseñas ya no son un extra — son el nuevo boca a boca, y la IA las usa para decidir a quién recomendar."
            inView={problemIn}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🤖", title: "La IA elige por tus clientes", text: "Cuando alguien pregunta a ChatGPT o Google ^¿dónde ceno esta noche?^ la respuesta depende de tus reseñas. Sin reseñas recientes, tu restaurante no existe para la inteligencia artificial.", color: C.black },
              { icon: "📉", title: "Cada reseña ignorada es una mesa vacía", text: "El 40% de los clientes descarta un restaurante con reseñas negativas sin responder. Cada reseña sin contestar es un cliente que elige a tu competencia.", color: C.green },
              { icon: "🏆", title: "Tu competencia ya se está moviendo", text: "La diferencia entre aparecer en el Top 3 o en el puesto 8 es de apenas 15 reseñas al mes. Eso es exactamente lo que Último Plato consigue.", color: C.black },
            ].map((card, i) => (
              <div key={i} style={{
                background: i === 1 ? C.green : C.black, borderRadius: "20px", padding: "36px",
                opacity: problemIn ? 1 : 0, transform: problemIn ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ease ${i * 120}ms`
              }}>
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: "700", color: C.white, marginBottom: "12px" }}>{card.title}</h3>
                <p style={{ fontSize: "15px", color: i === 1 ? "rgba(255,255,255,0.8)" : C.gray, lineHeight: "1.7", fontFamily: "Inter, sans-serif" }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA PREVIEW */}
      <section ref={howRef} style={{ background: C.black, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle
            badge="El sistema"
            title="Hemos reinventado cómo<br/>los restaurantes consiguen reseñas"
            subtitle="Un sistema físico y digital que trabaja por ti en cada servicio — sin que muevas un dedo."
            inView={howIn}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "20px", overflow: "hidden" }}>
            {[
              { num: "01", title: "El momento perfecto", text: "Al entregar la cuenta, tu cliente recibe un flyer personalizado con su nombre y un QR. \"Gracias, María — ¿qué tal tu experiencia hoy?\" Ese detalle lo cambia todo.", icon: "🍽️" },
              { num: "02", title: "El filtro inteligente", text: "2-3 preguntas determinan si la experiencia fue positiva o negativa. Si fue buena → Google. Si fue mala → la capturamos en privado para que puedas resolverlo antes de que sea público.", icon: "🔍" },
              { num: "03", title: "Tú solo recibes resultados", text: "Alertas en tiempo real. Respuestas redactadas por IA. Informe mensual con tu evolución vs competencia. Cada mes, más reseñas y mejor posición en Google.", icon: "📈" },
            ].map((step, i) => (
              <div key={i} style={{
                background: C.darkGray, padding: "40px 36px",
                opacity: howIn ? 1 : 0, transform: howIn ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ease ${i * 150}ms`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "52px", fontWeight: "700", color: "rgba(241,193,88,0.15)", lineHeight: "1" }}>{step.num}</span>
                  <span style={{ fontSize: "28px" }}>{step.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: "700", color: C.white, marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontSize: "15px", color: C.gray, lineHeight: "1.7", fontFamily: "Inter, sans-serif" }}>{step.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Btn variant="outline" onClick={() => { go("como-funciona"); }}>Ver cómo funciona en detalle →</Btn>
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section ref={whoRef} style={{ background: C.black, padding: "100px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle
            badge="Para quién"
            title="Diseñado para el restaurante<br/>que quiere crecer de verdad"
            inView={whoIn}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { icon: "🍽️", title: "Restaurantes independientes", text: "Tienes buena cocina pero pocas reseñas. Te mereces más visibilidad." },
              { icon: "👨‍🍳", title: "Nuevos locales", text: "Acabas de abrir y necesitas construir reputación rápido desde el primer día." },
              { icon: "🏘️", title: "Locales de barrio", text: "Tus clientes te adoran pero no dejan reseñas. Nosotros se lo ponemos fácil." },
              { icon: "📈", title: "Los que quieren el Top 3", text: "Estás cerca pero no terminas de subir. 15 reseñas más al mes marcan la diferencia." },
            ].map((card, i) => (
              <div key={i} style={{
                background: C.lightGreen, border: `1px solid rgba(76,112,56,0.2)`, borderRadius: "16px", padding: "28px",
                opacity: whoIn ? 1 : 0, transform: whoIn ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 100}ms`
              }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "17px", fontWeight: "700", color: C.white, marginBottom: "8px" }}>{card.title}</h3>
                <p style={{ fontSize: "14px", color: C.gray, lineHeight: "1.6", fontFamily: "Inter, sans-serif" }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section ref={ctaRef} style={{ background: C.green, padding: "100px 40px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", opacity: ctaIn ? 1 : 0, transform: ctaIn ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>🍽️</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "700", color: C.white, lineHeight: "1.15", marginBottom: "20px" }}>
            Descubre dónde está<br />tu restaurante ahora mismo
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", marginBottom: "36px", fontFamily: "Inter, sans-serif" }}>
            Analizamos tu perfil real de Google y te enviamos un informe personalizado con tu posición, tus puntos débiles y el plan para mejorarlos. Gratis. En menos de 24 horas.
          </p>
          <Btn onClick={() => go("contacto")} style={{ fontSize: "17px", padding: "18px 36px", background: C.yellow, color: C.black }}>
            Quiero mi informe gratuito →
          </Btn>
          <div style={{ marginTop: "20px", fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>
            Sin registro. Sin compromiso. Respuesta en 24h.
          </div>
        </div>
      </section>
    </div>
  );
};

// ===================== CÓMO FUNCIONA =====================
const ComoFunciona = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };
  const [s1Ref, s1In] = useInView();
  const [s2Ref, s2In] = useInView();
  const [s3Ref, s3In] = useInView();
  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ background: `linear-gradient(160deg, #0D1F0A, ${C.black})`, padding: "100px 40px 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div ref={s1Ref} style={{ opacity: s1In ? 1 : 0, transform: s1In ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <div style={{ display: "inline-block", background: C.lightGreen, border: `1px solid rgba(76,112,56,0.3)`, borderRadius: "100px", padding: "5px 16px", fontSize: "11px", color: "#7CB87A", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "Inter, sans-serif" }}>El sistema</div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: "700", color: C.white, lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "24px" }}>
              El último plato que<br />entregas tiene mucho<br /><span style={{ color: C.yellow }}>que decir.</span>
            </h1>
            <p style={{ fontSize: "18px", color: C.gray, lineHeight: "1.7", maxWidth: "600px", fontFamily: "Inter, sans-serif" }}>
              Aprovechamos el momento exacto en que el cliente recibe la cuenta para convertir su experiencia en una reseña pública — o en feedback privado si algo falló.
            </p>
          </div>
        </div>
      </section>

      <section ref={s2Ref} style={{ background: C.white, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle badge="El proceso" title="3 pasos que lo cambian todo" inView={s2In} />
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {[
              { num: "01", icon: "🍽️", title: "El momento perfecto", color: C.black, detail: [
                "Al entregar la cuenta, tu camarero entrega también un flyer personalizado con el nombre del cliente.",
                "\"Gracias, María — ¿qué tal tu experiencia hoy?\" Ese detalle personalizado dispara la tasa de respuesta.",
                "El flyer incluye un QR único para tu restaurante que lleva al chatbot de valoración.",
                "Opcional: captamos el nombre del cliente via sistema de reservas, TPV o WiFi del local."
              ]},
              { num: "02", icon: "🔍", title: "El filtro inteligente (review gating)", color: C.green, detail: [
                "2-3 preguntas simples determinan el nivel de satisfacción del cliente.",
                "Si la experiencia fue positiva (4-5 estrellas) → le llevamos directamente a Google para dejar su reseña pública.",
                "Si la experiencia fue negativa (1-3 estrellas) → capturamos su feedback en privado. Tú recibes una alerta inmediata por WhatsApp con los detalles.",
                "Resultado: más reseñas positivas en Google y menos negativas públicas."
              ]},
              { num: "03", icon: "📊", title: "Gestión y crecimiento continuo", color: C.black, detail: [
                "Recibes alertas en tiempo real por WhatsApp cada vez que llega una nueva reseña.",
                "Redactamos por ti las respuestas a cada reseña — positivas y negativas — personalizadas para tu restaurante.",
                "Informe mensual con tu evolución: reseñas nuevas, puntuación media, posición vs competencia.",
                "Acceso al Índice de Reputación Local: tu posición real frente a los restaurantes de tu zona."
              ]},
            ].map((step, i) => (
              <div key={i} style={{
                background: step.color, borderRadius: i === 0 ? "20px 20px 4px 4px" : i === 2 ? "4px 4px 20px 20px" : "4px",
                padding: "48px", display: "grid", gridTemplateColumns: "80px 1fr",
                gap: "32px", alignItems: "start",
                opacity: s2In ? 1 : 0, transform: s2In ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ease ${i * 150}ms`
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "56px", fontWeight: "700", color: `rgba(241,193,88,${step.color === C.green ? "0.5" : "0.2"})`, lineHeight: "1" }}>{step.num}</div>
                  <div style={{ fontSize: "28px", marginTop: "8px" }}>{step.icon}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", fontWeight: "700", color: C.white, marginBottom: "20px" }}>{step.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {step.detail.map((d, j) => (
                      <div key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.yellow, marginTop: "8px", flexShrink: 0 }} />
                        <span style={{ fontSize: "15px", color: step.color === C.green ? "rgba(255,255,255,0.85)" : C.gray, lineHeight: "1.6", fontFamily: "Inter, sans-serif" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={s3Ref} style={{ background: C.black, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle badge="Comparativa" title="Sin nosotros vs con nosotros" inView={s3In} />
          <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: C.darkGray }}>
              {["", "Sin Último Plato", "Con Último Plato ✓"].map((h, i) => (
                <div key={i} style={{ padding: "18px 24px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: "700", color: i === 2 ? C.yellow : C.white, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>{h}</div>
              ))}
            </div>
            {[
              ["Reseñas nuevas al mes", "1-2", "10-20"],
              ["Reseñas negativas", "En Google públicas", "Capturadas antes"],
              ["Tiempo que dedicas", "Ninguno, sin resultados", "Ninguno, con resultados"],
              ["Posición en Google", "Estancada", "Subiendo cada mes"],
              ["Visibilidad en ChatGPT", "Invisible", "Recomendado"],
              ["Respuesta a reseñas", "Sin responder", "Respondidas por IA"],
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ padding: "16px 24px", fontSize: "14px", color: C.gray, fontFamily: "Inter, sans-serif", borderRight: "1px solid rgba(255,255,255,0.06)" }}>{row[0]}</div>
                <div style={{ padding: "16px 24px", fontSize: "14px", color: "#EF4444", fontFamily: "Inter, sans-serif", borderRight: "1px solid rgba(255,255,255,0.06)" }}>{row[1]}</div>
                <div style={{ padding: "16px 24px", fontSize: "14px", color: "#10B981", fontFamily: "Inter, sans-serif", fontWeight: "600" }}>{row[2]}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Btn onClick={() => go("contacto")} style={{ fontSize: "16px", padding: "16px 32px" }}>Quiero empezar →</Btn>
          </div>
        </div>
      </section>
    </div>
  );
};

// ===================== PRECIOS =====================
const Precios = ({ setPage }) => {
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };
  const [s1Ref, s1In] = useInView();
  const [s2Ref, s2In] = useInView();
  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ background: `linear-gradient(160deg, #0D1F0A, ${C.black})`, padding: "100px 40px 80px" }}>
        <div ref={s1Ref} style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", opacity: s1In ? 1 : 0, transform: s1In ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-block", background: C.lightYellow, border: `1px solid rgba(241,193,88,0.25)`, borderRadius: "100px", padding: "5px 16px", fontSize: "11px", color: C.yellow, fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "Inter, sans-serif" }}>Planes</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(40px, 5vw, 60px)", fontWeight: "700", color: C.white, lineHeight: "1.1", marginBottom: "20px" }}>
            Simple, transparente,<br /><span style={{ color: C.yellow }}>sin sorpresas.</span>
          </h1>
          <p style={{ fontSize: "17px", color: C.gray, lineHeight: "1.7", fontFamily: "Inter, sans-serif" }}>
            Dos planes diseñados para que empieces a ver resultados desde el primer mes. Sin permanencia. Sin letra pequeña.
          </p>
        </div>
      </section>

      <section ref={s2Ref} style={{ background: C.black, padding: "80px 40px 100px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", marginBottom: "60px" }}>
            {[
              {
                name: "Básico", price: "49", setup: "97", popular: false,
                desc: "Todo lo que necesitas para empezar a conseguir más reseñas de forma sistemática.",
                features: [
                  "Flyer QR personalizado con tu logo (100 uds.)",
                  "Formulario inteligente de pre-reseña",
                  "Redirección automática a Google si positivo",
                  "Captura privada de feedback negativo",
                  "Alertas WhatsApp en tiempo real",
                  "Panel de seguimiento mensual",
                  "Soporte por email",
                ]
              },
              {
                name: "Profesional", price: "99", setup: "97", popular: true,
                desc: "El sistema completo con gestión activa de tu reputación y análisis de competencia.",
                features: [
                  "Todo lo del plan Básico",
                  "Respuestas redactadas por IA a todas las reseñas",
                  "Informe mensual detallado de reputación",
                  "Comparativa con tus 3 competidores principales",
                  "Posición en el Índice de Reputación Local",
                  "Reseñas convertidas en contenido para redes",
                  "Soporte prioritario por WhatsApp",
                ]
              }
            ].map((plan, i) => (
              <div key={i} style={{
                background: plan.popular ? C.green : C.darkGray,
                borderRadius: "24px", padding: "40px", position: "relative",
                border: plan.popular ? `2px solid ${C.yellow}` : "1px solid rgba(255,255,255,0.06)",
                opacity: s2In ? 1 : 0, transform: s2In ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ease ${i * 150}ms`
              }}>
                {plan.popular && (
                  <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: C.yellow, color: C.black, fontSize: "11px", fontWeight: "700", padding: "4px 16px", borderRadius: "100px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}>
                    Más popular
                  </div>
                )}
                <div style={{ fontSize: "13px", fontWeight: "600", color: plan.popular ? "rgba(255,255,255,0.7)" : C.gray, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "Inter, sans-serif" }}>{plan.name}</div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "56px", fontWeight: "700", color: C.white }}>{plan.price}€</span>
                  <span style={{ fontSize: "15px", color: plan.popular ? "rgba(255,255,255,0.6)" : C.gray, fontFamily: "Inter, sans-serif" }}>/mes</span>
                </div>
                <div style={{ fontSize: "13px", color: plan.popular ? "rgba(255,255,255,0.5)" : "#4B5563", marginBottom: "20px", fontFamily: "Inter, sans-serif" }}>+ {plan.setup}€ alta única</div>
                <p style={{ fontSize: "14px", color: plan.popular ? "rgba(255,255,255,0.75)" : C.gray, lineHeight: "1.6", marginBottom: "28px", fontFamily: "Inter, sans-serif" }}>{plan.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: C.yellow, fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>✓</span>
                      <span style={{ fontSize: "14px", color: plan.popular ? "rgba(255,255,255,0.85)" : C.gray, lineHeight: "1.5", fontFamily: "Inter, sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go("contacto")} style={{
                  width: "100%", padding: "16px", borderRadius: "12px", border: "none",
                  background: plan.popular ? C.yellow : "rgba(241,193,88,0.15)",
                  color: plan.popular ? C.black : C.yellow,
                  fontSize: "15px", fontWeight: "600", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", transition: "all 0.2s"
                }}>
                  Empezar con {plan.name} →
                </button>
              </div>
            ))}
          </div>

          <div style={{ background: C.darkGray, borderRadius: "20px", padding: "36px 40px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: "700", color: C.white, marginBottom: "20px" }}>Preguntas frecuentes</div>
            {[
              { q: "¿Hay permanencia?", a: "No. Puedes cancelar cuando quieras sin penalización. Creemos tanto en nuestro sistema que no necesitamos atarte." },
              { q: "¿Qué incluye el alta única de 97€?", a: "La configuración completa del sistema: diseño y envío de los flyers personalizados, configuración del formulario inteligente, integración con tu perfil de Google Business y onboarding completo." },
              { q: "¿Cuánto tarda en verse resultados?", a: "La mayoría de restaurantes empieza a recibir reseñas nuevas en los primeros 7-10 días. En 60 días se notan resultados claros en posición y volumen." },
              { q: "¿Necesito hacer algo yo?", a: "Solo que tus camareros entreguen el flyer con la cuenta. Todo lo demás lo gestionamos nosotros." },
            ].map((faq, i) => (
              <div key={i} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", paddingTop: i > 0 ? "20px" : "0", marginTop: i > 0 ? "20px" : "0" }}>
                <div style={{ fontSize: "15px", fontWeight: "600", color: C.white, marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>{faq.q}</div>
                <div style={{ fontSize: "14px", color: C.gray, lineHeight: "1.7", fontFamily: "Inter, sans-serif" }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ===================== NOSOTROS =====================
const Nosotros = () => {
  const [s1Ref, s1In] = useInView();
  const [s2Ref, s2In] = useInView();
  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ background: `linear-gradient(160deg, #0D1F0A, ${C.black})`, padding: "100px 40px 80px" }}>
        <div ref={s1Ref} style={{ maxWidth: "800px", margin: "0 auto", opacity: s1In ? 1 : 0, transform: s1In ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <div style={{ display: "inline-block", background: C.lightGreen, border: `1px solid rgba(76,112,56,0.3)`, borderRadius: "100px", padding: "5px 16px", fontSize: "11px", color: "#7CB87A", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "Inter, sans-serif" }}>Nosotros</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(40px, 5vw, 60px)", fontWeight: "700", color: C.white, lineHeight: "1.1", marginBottom: "28px" }}>
            Nacimos con una<br />obsesión:<br /><span style={{ color: C.yellow }}>que los buenos<br />restaurantes ganen.</span>
          </h1>
          <p style={{ fontSize: "18px", color: C.gray, lineHeight: "1.8", fontFamily: "Inter, sans-serif" }}>
            Último Plato Review nació de una observación simple: los mejores restaurantes no siempre son los más conocidos. Y la razón suele ser la misma — no gestionan sus reseñas.
          </p>
        </div>
      </section>
      <section ref={s2Ref} style={{ background: C.white, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div style={{ opacity: s2In ? 1 : 0, transform: s2In ? "translateX(0)" : "translateX(-24px)", transition: "all 0.8s ease" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", fontWeight: "700", color: C.black, lineHeight: "1.2", marginBottom: "24px" }}>
                La IA ya recomienda negocios como el tuyo.<br />
                <span style={{ color: C.green }}>Las reseñas deciden quién aparece.</span>
              </h2>
              <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: "1.8", marginBottom: "20px", fontFamily: "Inter, sans-serif" }}>
                Nos encargamos de conseguir más reseñas positivas, proteger tu imagen y responder a cada cliente en tu nombre.
              </p>
              <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: "1.8", fontFamily: "Inter, sans-serif" }}>
                Quien controle sus reseñas, controlará su reputación y sus ventas. La IA está cambiando el futuro de los negocios. Asegúrate de que hable bien del tuyo.
              </p>
            </div>
            <div style={{ opacity: s2In ? 1 : 0, transform: s2In ? "translateX(0)" : "translateX(24px)", transition: "all 0.8s ease 0.2s" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { num: "100%", label: "Enfocados en restaurantes", text: "No somos una agencia generalista. Cada herramienta, cada proceso y cada informe está diseñado exclusivamente para el sector de la hostelería." },
                  { num: "24h", label: "Tiempo de respuesta garantizado", text: "Cuando solicitas tu informe gratuito, lo recibes en menos de 24 horas. Sin bots, sin respuestas automáticas — análisis real de tu restaurante." },
                  { num: "0€", label: "Para empezar a conocernos", text: "Tu primer informe de reputación es completamente gratuito. Sin tarjeta, sin registro, sin compromiso. Queremos que veas el valor antes de decidir." },
                ].map((v, i) => (
                  <div key={i} style={{ background: C.black, borderRadius: "16px", padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: "700", color: C.yellow, flexShrink: 0, minWidth: "64px" }}>{v.num}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: C.white, marginBottom: "6px", fontFamily: "Inter, sans-serif" }}>{v.label}</div>
                      <div style={{ fontSize: "13px", color: C.gray, lineHeight: "1.6", fontFamily: "Inter, sans-serif" }}>{v.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ===================== CONTACTO =====================
const Contacto = () => {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [s1Ref, s1In] = useInView();

  const handleSubmit = async () => {
    if (!name || !business || !city || !email) return;
    setSending(true);
    try {
      await fetch("https://hook.eu1.make.com/XXXXXXXXXXXXXXXX", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name, negocio: business, ciudad: city, email, telefono: phone })
      });
    } catch {}
    setSending(false);
    setSent(true);
  };

  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ background: `linear-gradient(160deg, #0D1F0A, ${C.black})`, padding: "100px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div ref={s1Ref} style={{ opacity: s1In ? 1 : 0, transform: s1In ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
            <div style={{ display: "inline-block", background: C.lightYellow, border: `1px solid rgba(241,193,88,0.25)`, borderRadius: "100px", padding: "5px 16px", fontSize: "11px", color: C.yellow, fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "Inter, sans-serif" }}>Informe gratuito</div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "700", color: C.white, lineHeight: "1.15", marginBottom: "24px" }}>
              Descubre cómo está<br />la reputación de<br /><span style={{ color: C.yellow }}>tu restaurante.</span>
            </h1>
            <p style={{ fontSize: "16px", color: C.gray, lineHeight: "1.8", marginBottom: "40px", fontFamily: "Inter, sans-serif" }}>
              Analizamos tu perfil real de Google — número de reseñas, puntuación, posición vs competencia — y te enviamos un informe personalizado con el plan de acción. Gratis. En menos de 24 horas.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: "📊", title: "Análisis real de Google", text: "Tu posición actual, puntuación media y volumen de reseñas." },
                { icon: "🏆", title: "Comparativa de competencia", text: "Cómo estás frente a los 3 restaurantes más cercanos." },
                { icon: "🎯", title: "Plan de acción personalizado", text: "Qué hacer para subir posiciones en los próximos 60 días." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "24px", width: "40px", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: C.white, marginBottom: "4px", fontFamily: "Inter, sans-serif" }}>{item.title}</div>
                    <div style={{ fontSize: "14px", color: C.gray, fontFamily: "Inter, sans-serif" }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "13px", color: C.gray, marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>¿Prefieres hablar directamente?</div>
              <div style={{ fontSize: "16px", color: C.yellow, fontWeight: "600", fontFamily: "Inter, sans-serif" }}>605 158 994</div>
              <div style={{ fontSize: "14px", color: C.gray, fontFamily: "Inter, sans-serif" }}>hola@ultimoplato.com</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "40px", backdropFilter: "blur(10px)" }}>
            {!sent ? (
              <>
                <div style={{ fontSize: "18px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: "700", color: C.white, marginBottom: "28px" }}>Solicita tu informe gratuito</div>
                {[
                  { label: "Tu nombre", placeholder: "¿Cómo te llamamos?", value: name, set: setName, type: "text" },
                  { label: "Nombre del restaurante", placeholder: "Nombre exacto en Google", value: business, set: setBusiness, type: "text" },
                  { label: "Ciudad", placeholder: "Madrid, Alicante, Barcelona...", value: city, set: setCity, type: "text" },
                  { label: "Tu email", placeholder: "Para enviarte el informe", value: email, set: setEmail, type: "email" },
                  { label: "Teléfono (opcional)", placeholder: "Por si queremos llamarte", value: phone, set: setPhone, type: "tel" },
                ].map((field, i) => (
                  <div key={i} style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: C.gray, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} value={field.value}
                      onChange={e => field.set(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      style={{ width: "100%", padding: "13px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: C.white, fontSize: "15px", fontFamily: "Inter, sans-serif", transition: "all 0.2s", boxSizing: "border-box" }} />
                  </div>
                ))}
                <button onClick={handleSubmit} disabled={!name || !business || !city || !email || sending}
                  style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", marginTop: "8px",
                    background: (!name || !business || !city || !email) ? "rgba(241,193,88,0.3)" : C.yellow,
                    color: (!name || !business || !city || !email) ? "rgba(0,0,0,0.4)" : C.black,
                    fontSize: "16px", fontWeight: "600", cursor: (!name || !business || !city || !email) ? "not-allowed" : "pointer",
                    fontFamily: "Inter, sans-serif", transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                  }}>
                  {sending ? (
                    <><div style={{ width: 18, height: 18, border: "2px solid rgba(0,0,0,0.3)", borderTop: `2px solid ${C.black}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Enviando...</>
                  ) : "Quiero mi informe gratuito →"}
                </button>
                <p style={{ fontSize: "12px", color: "#4B5563", textAlign: "center", marginTop: "14px", fontFamily: "Inter, sans-serif" }}>Sin spam. Sin compromiso. Respuesta garantizada en 24h.</p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "56px", marginBottom: "20px" }}>✅</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: "700", color: C.white, marginBottom: "12px" }}>¡Perfecto, {name}!</h3>
                <p style={{ fontSize: "15px", color: C.gray, lineHeight: "1.7", fontFamily: "Inter, sans-serif" }}>
                  Hemos recibido tu solicitud para <strong style={{ color: C.white }}>{business}</strong>. En menos de 24 horas tendrás en tu email el informe completo con tu posición real en Google y el plan de acción.
                </p>
                <div style={{ marginTop: "28px", fontSize: "13px", color: "#4B5563", fontFamily: "Inter, sans-serif" }}>
                  ¿Tienes dudas? Llámanos al <span style={{ color: C.yellow }}>605 158 994</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ===================== MAIN APP =====================
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ background: C.black, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        input::placeholder { color: #4B5563; }
        input:focus { outline: none !important; border-color: rgba(241,193,88,0.5) !important; background: rgba(241,193,88,0.04) !important; }
        button:hover { opacity: 0.88; transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        @media(max-width:768px) {
          nav > div > div:last-child > button:not(:last-child) { display: none; }
        }
      `}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "como-funciona" && <ComoFunciona setPage={setPage} />}
      {page === "precios" && <Precios setPage={setPage} />}
      {page === "nosotros" && <Nosotros />}
      {page === "contacto" && <Contacto />}
      <Footer setPage={setPage} />
    </div>
  );
}
