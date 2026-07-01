import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../../constants/profile";
import SocialLinks from "../shared/SocialLinks";

// Calendly widget pulls in ~500KB (widget bundle + Datadog RUM + Airbrake +
// reCAPTCHA). Defer injection until the Connect section is about to scroll
// into view so it stays off the initial-load waterfall.
function loadCalendlyOnce() {
  if (document.getElementById("calendly-script")) return;
  const s = document.createElement("script");
  s.id = "calendly-script";
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  document.body.appendChild(s);
  const link = document.createElement("link");
  link.id = "calendly-css";
  link.rel = "stylesheet";
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.appendChild(link);
}

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = {
  from_name: "",
  from_email: "",
  from_phone: "",
  about_self: "",
  met_before: "",
  met_where: "",
  message: "",
  website: "", // honeypot
};

function validEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default function Connect() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [calendlyReady, setCalendlyReady] = useState(false);
  const calendlyRef = useRef(null);

  // Init EmailJS once (tiny — safe to do up-front).
  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
  }, []);

  // Inject Calendly only when the Connect section is within ~600px of the
  // viewport. Falls back to immediate load if IntersectionObserver isn't
  // available (very old browsers).
  useEffect(() => {
    if (calendlyReady) return;
    if (typeof IntersectionObserver === "undefined") {
      loadCalendlyOnce();
      setCalendlyReady(true);
      return;
    }
    const el = calendlyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadCalendlyOnce();
          setCalendlyReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [calendlyReady]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    if (form.website) return; // honeypot triggered → silently drop

    if (!form.from_name.trim()) return fail("Name is required.");
    if (!validEmail(form.from_email)) return fail("Please enter a valid email.");
    if (!form.about_self.trim()) return fail("Please tell me a bit about yourself.");
    if (form.message.trim().length < 10) return fail("Your message is too short — give me a bit more.");

    if (!SERVICE || !TEMPLATE || !PUBLIC_KEY) {
      return fail("Form not configured yet. Email me directly at " + profile.email);
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      await emailjs.send(
        SERVICE,
        TEMPLATE,
        {
          ...form,
          sent_at: new Date().toISOString(),
          source: "Portfolio Connect Form",
        },
        PUBLIC_KEY // v3 API: key as 4th arg string
      );
      setStatus("success");
    } catch (err) {
      // err.status + err.text reveal what EmailJS rejected
      console.error("EmailJS error:", err);
      const detail = err?.text ? ` (${err.status}: ${err.text})` : "";
      fail(`Couldn't send${detail}. Email me directly at ${profile.email}`);
    }
  }

  function fail(msg) {
    setStatus("error");
    setErrorMsg(msg);
  }

  return (
    <section id="connect" className="relative text-text-dark py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(201,162,39,0.15), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(58,107,58,0.12), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Let's talk
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Connect</h2>
          <p className="mt-4 text-text-dark/70 max-w-2xl mx-auto">
            Two paths: tell me what you're exploring and I'll write back personally, or pick a 30-minute slot directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT — Form */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 md:p-8">
            <h3 className="font-serif text-xl text-accent-gold mb-5">Tell me what you're exploring</h3>

            {status === "success" ? (
              <SuccessPanel metBefore={form.met_before} onReset={() => { setForm(INITIAL); setStatus("idle"); }} />
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <Field label="Name" required>
                  <input type="text" value={form.from_name} onChange={update("from_name")} className={inputCls} />
                </Field>

                <Field label="Email" required>
                  <input type="email" value={form.from_email} onChange={update("from_email")} className={inputCls} />
                </Field>

                <Field label="Phone (optional)">
                  <input type="tel" value={form.from_phone} onChange={update("from_phone")} className={inputCls} />
                </Field>

                <Field label="About yourself" required>
                  <textarea value={form.about_self} onChange={update("about_self")} rows={3}
                    placeholder="Who you are, what you do, where you are." className={inputCls} />
                </Field>

                <fieldset>
                  <legend className="block text-sm text-text-dark/80 mb-2">Have we met before?</legend>
                  <div className="flex gap-5">
                    {["Yes", "No"].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2 text-sm text-text-dark/85 cursor-pointer">
                        <input
                          type="radio"
                          name="met_before"
                          value={v}
                          checked={form.met_before === v}
                          onChange={update("met_before")}
                          className="accent-accent-gold"
                        />
                        {v}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {form.met_before === "Yes" && (
                  <Field label="Where did we meet?">
                    <input type="text" value={form.met_where} onChange={update("met_where")} className={inputCls} />
                  </Field>
                )}

                <Field label="What do you want to talk about?" required>
                  <textarea value={form.message} onChange={update("message")} rows={4} className={inputCls} />
                </Field>

                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={update("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] opacity-0"
                />

                {status === "error" && (
                  <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
                    {errorMsg || "Something went wrong."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-accent-gold text-bg-dark font-medium py-3 rounded-full hover:bg-accent-gold/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending…" : "Send"}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — Calendly */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 md:p-8">
            <h3 className="font-serif text-xl text-accent-gold mb-5">Pick a 30-min slot directly</h3>
            <div
              ref={calendlyRef}
              className={calendlyReady ? "calendly-inline-widget rounded-lg overflow-hidden" : "rounded-lg overflow-hidden flex items-center justify-center text-text-dark/50 text-sm"}
              data-url={calendlyReady ? profile.calendly : undefined}
              style={{ minWidth: 320, height: 630 }}
            >
              {!calendlyReady && "Loading scheduler…"}
            </div>
            <a
              href={profile.calendly}
              target="_blank"
              rel="noreferrer"
              className="block mt-3 text-sm text-accent-gold/90 hover:text-accent-gold underline underline-offset-4"
            >
              Or open Calendly in a new tab →
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg">{profile.name}</p>
            <a href={`mailto:${profile.email}`} className="text-sm text-text-dark/60 hover:text-accent-gold transition-colors">
              {profile.email}
            </a>
          </div>
          <SocialLinks links={profile.social} variant="dark" />
          <p className="text-xs text-text-dark/40">© {new Date().getFullYear()} Nandhu Kishore</p>
        </footer>
      </div>
    </section>
  );
}

const inputCls =
  "w-full bg-bg-dark/60 border border-white/10 focus:border-accent-gold/60 focus:outline-none rounded-md px-3 py-2 text-sm text-text-dark placeholder:text-text-dark/40 transition-colors";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-text-dark/80 mb-1.5">
        {label} {required && <span className="text-accent-gold">*</span>}
      </span>
      {children}
    </label>
  );
}

function SuccessPanel({ metBefore, onReset }) {
  const msg =
    metBefore === "Yes"
      ? "Good to reconnect. I'll write back personally within 48 hours."
      : "Thanks for reaching out. I'll write back personally within 48 hours.";
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-gold/20 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 text-accent-gold">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-text-dark/90 leading-relaxed mb-2">{msg}</p>
      <p className="text-text-dark/60 text-sm">— Nandhu</p>
      <button onClick={onReset} className="mt-5 text-xs text-accent-gold/80 hover:text-accent-gold underline underline-offset-4">
        Send another message
      </button>
    </div>
  );
}
