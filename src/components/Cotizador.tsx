import { useEffect, useMemo, useState } from "react";
import { BUSINESS, COBERTURA_FORANEA, COBERTURA_LOCAL, FLOTA, initialQuote, type QuoteForm } from "../config";
import { mailtoLink, whatsappLink } from "../lib/quote";
import { getCotizarPrefill } from "../lib/router";

const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";
const inputCls =
  "w-full rounded-lg border border-[#dce4ed] bg-white px-3.5 py-2.5 text-[15px] text-[#0f1e2e] placeholder:text-slate-400 focus:border-[#0077c8] focus:outline-none focus:ring-2 focus:ring-[#0077c8]/15 transition";

const DESTINOS_SUGERIDOS = [...COBERTURA_FORANEA];
const ORIGENES_SUGERIDOS = [...COBERTURA_LOCAL, ...COBERTURA_FORANEA];

function mergePrefill(base: QuoteForm): QuoteForm {
  const p = getCotizarPrefill();
  const next = { ...base };
  if (p.origen) next.origen = p.origen;
  if (p.destino) next.destino = p.destino;
  if (p.mensaje) next.mensaje = p.mensaje;
  if (p.tipo === "Local" || p.tipo === "Foráneo") next.tipo = p.tipo;
  if (p.unidad) {
    // Acepta nombre completo o fragmento (ej. "3.5T", "Rabón")
    const found = FLOTA.find(
      (u) => u.nombre.toLowerCase() === p.unidad!.toLowerCase() || u.nombre.toLowerCase().includes(p.unidad!.toLowerCase()),
    );
    if (found) next.unidad = found.nombre;
  }
  return next;
}

const PASOS = ["Ruta", "Carga", "Contacto"];

export default function Cotizador() {
  const [form, setForm] = useState<QuoteForm>(() => mergePrefill(initialQuote));
  const [error, setError] = useState("");
  const [paso, setPaso] = useState(0);
  const [maxPaso, setMaxPaso] = useState(0);

  // Si el usuario navega desde una ruta/flota (cambia el ?origen=&destino=), re-prellenar
  useEffect(() => {
    const onHash = () => setForm((f) => mergePrefill({ ...f, origen: f.origen, destino: f.destino } as QuoteForm));
    // Solo re-aplicar lo que venga en URL, sin borrar nombre/teléfono ya escritos
    const applyUrl = () => {
      const p = getCotizarPrefill();
      setForm((f) => {
        const n = { ...f };
        if (p.origen) n.origen = p.origen;
        if (p.destino) n.destino = p.destino;
        if (p.mensaje) n.mensaje = p.mensaje;
        if (p.tipo === "Local" || p.tipo === "Foráneo") n.tipo = p.tipo;
        if (p.unidad) {
          const found = FLOTA.find(
            (u) => u.nombre.toLowerCase() === p.unidad!.toLowerCase() || u.nombre.toLowerCase().includes(p.unidad!.toLowerCase()),
          );
          if (found) n.unidad = found.nombre;
        }
        return n;
      });
    };
    applyUrl();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const prefilled = useMemo(() => {
    const p = getCotizarPrefill();
    return Boolean(p.origen || p.destino || p.unidad);
  }, []);

  const set = (k: keyof QuoteForm, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const irAPaso = (n: number) => {
    setError("");
    setPaso(n);
    setMaxPaso((m) => Math.max(m, n));
  };

  const continuar = () => {
    if (paso === 0 && (!form.origen.trim() || !form.destino.trim())) {
      setError("Escribe el origen y el destino para continuar.");
      return;
    }
    setError("");
    irAPaso(Math.min(paso + 1, 2));
  };

  const elegirDestino = (d: string) => {
    set("destino", d);
    // Si el destino es local, sugerir tipo Local; si no, Foráneo
    if (COBERTURA_LOCAL.some((m) => m.toLowerCase() === d.toLowerCase())) set("tipo", "Local");
    else set("tipo", "Foráneo");
  };

  const elegirTipo = (t: "Local" | "Foráneo") => {
    set("tipo", t);
    // Sin borrar nada; si el origen está vacío en Local, sugerir Guadalajara
    setForm((f) => ({
      ...f,
      tipo: t,
      origen: t === "Local" && !f.origen.trim() ? "Guadalajara" : f.origen,
    }));
  };

  const valid = form.nombre.trim() && form.telefono.trim() && form.origen.trim() && form.destino.trim();

  const handle = (via: "wa" | "mail") => {
    if (!valid) {
      setError("Completa nombre, teléfono, origen y destino para continuar.");
      return;
    }
    setError("");
    window.open(via === "wa" ? whatsappLink(form) : mailtoLink(form), via === "wa" ? "_blank" : "_self");
  };

  const unidadActiva = FLOTA.find((u) => u.nombre === form.unidad) ?? FLOTA[0];

  return (
    <section id="cotizar" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[#0077c8]">Cotizador</p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-[#0b2a4a] sm:text-4xl">
              Cotiza en 1 minuto
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Tres pasos y se abre tu WhatsApp o correo con todo pre-llenado hacia {BUSINESS.email}.
              Respuesta en menos de 3 horas (Lun–Vie 8–18).
            </p>
            {prefilled && (form.origen || form.destino || form.unidad) && (
              <div className="mt-4 rounded-lg border border-[#0077c8]/30 bg-[#e6f3fa] px-4 py-3 text-sm text-[#0b2a4a]">
                <span className="font-semibold">Pre-llenado desde la página:</span>{" "}
                {[form.origen && `Origen ${form.origen}`, form.destino && `Destino ${form.destino}`, form.unidad].filter(Boolean).join(" · ")}
              </div>
            )}
            {/* Resumen en vivo */}
            <div className="mt-6 rounded-xl border border-[#dce4ed] bg-[#0b2a4a] p-5 text-sm text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">Tu cotización</p>
              <p className="font-heading mt-2 text-lg font-bold">
                {form.origen.trim() || "¿Origen?"} <span className="text-sky-300">→</span> {form.destino.trim() || "¿Destino?"}
              </p>
              <p className="mt-1 text-white/70">
                {form.tipo} · {unidadActiva.nombre} · {unidadActiva.capacidad}
              </p>
            </div>
            <div className="mt-4 space-y-2 rounded-xl border border-[#dce4ed] bg-[#f2f5f9] p-5 text-sm">
              <p className="flex items-center gap-3">
                <img src={BUSINESS.logoIcon} alt="LS NEXOR" className="h-9 w-9 rounded-lg bg-white object-contain" loading="lazy" />
                <span><span className="font-semibold text-[#0b2a4a]">WhatsApp:</span> {BUSINESS.whatsappDisplay}</span>
              </p>
              <p><span className="font-semibold text-[#0b2a4a]">Correo:</span> {BUSINESS.email}</p>
              <p><span className="font-semibold text-[#0b2a4a]">Base:</span> {BUSINESS.base} · {BUSINESS.hours}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#dce4ed] bg-white p-6 shadow-[0_8px_30px_rgba(11,42,74,0.08)] sm:p-8">
            {/* Pasos */}
            <ol className="flex items-center gap-2" aria-label="Pasos del cotizador">
              {PASOS.map((p, i) => {
                const done = i < paso;
                const active = i === paso;
                return (
                  <li key={p} className="flex flex-1 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => i <= maxPaso && irAPaso(i)}
                      disabled={i > maxPaso}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold transition ${
                        done
                          ? "bg-emerald-500 text-white"
                          : active
                            ? "bg-[#0077c8] text-white"
                            : "bg-[#f2f5f9] text-slate-400"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      {done ? "✓" : i + 1}
                    </button>
                    <span className={`text-[13px] font-semibold ${active ? "text-[#0b2a4a]" : "text-slate-400"}`}>{p}</span>
                    {i < PASOS.length - 1 && <span className="mx-1 h-px flex-1 bg-[#dce4ed]" />}
                  </li>
                );
              })}
            </ol>

            <div className="mt-6">
              {/* PASO 1 — Ruta */}
              {paso === 0 && (
                <div className="grid gap-4">
                  <div>
                    <span className={labelCls}>¿Tu servicio es local o foráneo?</span>
                    <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#f2f5f9] p-1.5">
                      {(["Local", "Foráneo"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => elegirTipo(t)}
                          className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                            form.tipo === t ? "bg-white text-[#0b2a4a] shadow" : "text-slate-500 hover:text-[#0b2a4a]"
                          }`}
                        >
                          {t === "Local" ? "Local · dentro de ZMG" : "Foráneo · fuera de ZMG"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.tipo === "Local" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelCls}>Origen *</span>
                        <input
                          className={inputCls}
                          value={form.origen}
                          onChange={(e) => set("origen", e.target.value)}
                          placeholder="Elige o escribe el municipio"
                          list="origenes-zmg"
                          autoComplete="off"
                        />
                        <datalist id="origenes-zmg">
                          {COBERTURA_LOCAL.map((o) => (
                            <option key={o} value={o} />
                          ))}
                        </datalist>
                        <span className="mt-1 block text-xs text-slate-400">ZMG o cualquier municipio de Jalisco</span>
                      </label>
                      <label className="block">
                        <span className={labelCls}>Destino *</span>
                        <input
                          className={inputCls}
                          value={form.destino}
                          onChange={(e) => set("destino", e.target.value)}
                          placeholder="Elige o escribe el municipio"
                          list="destinos-zmg"
                          autoComplete="off"
                        />
                        <datalist id="destinos-zmg">
                          {COBERTURA_LOCAL.map((d) => (
                            <option key={d} value={d} />
                          ))}
                        </datalist>
                        <span className="mt-1 block text-xs text-slate-400">ZMG o cualquier municipio de Jalisco</span>
                      </label>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className={labelCls}>Origen *</span>
                          <input
                            className={inputCls}
                            value={form.origen}
                            onChange={(e) => set("origen", e.target.value)}
                            placeholder="Ej. Guadalajara"
                            list="origenes-sugeridos"
                            autoComplete="off"
                          />
                          <datalist id="origenes-sugeridos">
                            {ORIGENES_SUGERIDOS.map((o) => (
                              <option key={o} value={o} />
                            ))}
                          </datalist>
                        </label>
                        <label className="block">
                          <span className={labelCls}>Destino *</span>
                          <input
                            className={inputCls}
                            value={form.destino}
                            onChange={(e) => set("destino", e.target.value)}
                            placeholder="Ej. Querétaro, CDMX, León…"
                            list="destinos-sugeridos"
                            autoComplete="off"
                          />
                          <datalist id="destinos-sugeridos">
                            {DESTINOS_SUGERIDOS.map((d) => (
                              <option key={d} value={d} />
                            ))}
                          </datalist>
                        </label>
                      </div>
                      <div>
                        <span className={labelCls}>Destinos frecuentes (toca uno)</span>
                        <div className="flex flex-wrap gap-2">
                          {DESTINOS_SUGERIDOS.map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => elegirDestino(d)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                form.destino === d
                                  ? "border-[#0077c8] bg-[#e6f3fa] font-semibold text-[#0b2a4a]"
                                  : "border-[#dce4ed] bg-white text-slate-600 hover:border-[#0077c8]/50"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <label className="block">
                    <span className={labelCls}>Fecha tentativa</span>
                    <input type="date" className={inputCls} value={form.fecha} onChange={(e) => set("fecha", e.target.value)} />
                  </label>
                </div>
              )}

              {/* PASO 2 — Carga */}
              {paso === 1 && (
                <div className="grid gap-4">
                  <div>
                    <span className={labelCls}>Elige tu unidad (toca una)</span>
                    <div className="grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Unidad">
                      {FLOTA.map((u) => {
                        const sel = form.unidad === u.nombre;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            role="radio"
                            aria-checked={sel}
                            onClick={() => set("unidad", u.nombre)}
                            className={`rounded-lg border p-4 text-left transition ${
                              sel
                                ? "border-[#0077c8] bg-[#e6f3fa] shadow-[0_4px_16px_rgba(0,119,200,0.15)]"
                                : "border-[#dce4ed] bg-white hover:border-[#0077c8]/50"
                            }`}
                          >
                            <p className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0077c8]">{u.capacidad}</span>
                              <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 text-[11px] font-bold text-white ${sel ? "border-[#0077c8] bg-[#0077c8]" : "border-[#dce4ed] bg-white"}`}>
                                {sel ? "✓" : ""}
                              </span>
                            </p>
                            <p className="mt-1.5 text-sm font-bold leading-snug text-[#0b2a4a]">{u.nombre}</p>
                            <p className="mt-1 text-xs text-slate-500">{u.medidas} · {u.volumen}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#dce4ed] bg-[#f2f5f9] px-4 py-3 text-sm text-slate-600">
                    <input type="checkbox" checked={form.factura} onChange={(e) => set("factura", e.target.checked)} className="h-5 w-5 accent-[#0077c8]" />
                    <span className="font-semibold text-[#0b2a4a]">Requiero factura</span>
                  </label>
                </div>
              )}

              {/* PASO 3 — Contacto */}
              {paso === 2 && (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelCls}>Tu nombre *</span>
                      <input className={inputCls} value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Tu nombre" autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className={labelCls}>Teléfono / WhatsApp *</span>
                      <input className={inputCls} value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="33 ..." inputMode="tel" autoComplete="tel" />
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelCls}>Email (opcional)</span>
                    <input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="tucorreo@..." inputMode="email" autoComplete="email" />
                  </label>
                  <div className="rounded-lg bg-[#f2f5f9] p-4 text-sm text-slate-600">
                    Revisa tu resumen a la izquierda. Al enviar se abre WhatsApp o tu correo con todo pre-llenado.
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button onClick={() => handle("wa")} className="flex-1 rounded-lg bg-[#0077c8] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#005a97]">
                      Enviar por WhatsApp
                    </button>
                    <button onClick={() => handle("mail")} className="flex-1 rounded-lg border border-[#dce4ed] px-6 py-3.5 text-sm font-semibold text-[#0b2a4a] transition hover:border-[#0b2a4a]">
                      Enviar por correo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {error && <p className="mt-4 text-sm font-medium text-red-700">{error}</p>}

            {/* Navegación */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              {paso > 0 ? (
                <button
                  onClick={() => irAPaso(paso - 1)}
                  className="text-sm font-semibold text-[#0b2a4a] transition hover:text-[#0077c8]"
                >
                  ← Atrás
                </button>
              ) : (
                <span />
              )}
              {paso < 2 ? (
                <button onClick={continuar} className="rounded-lg bg-[#0b2a4a] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#071d34]">
                  Continuar →
                </button>
              ) : (
                <span className="text-[13px] text-slate-400">Paso final · envía por WhatsApp o correo</span>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
