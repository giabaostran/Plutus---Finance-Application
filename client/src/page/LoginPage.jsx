import KpiCard from "../ui/KpiCard";
import SummaryRow from "../ui/SummaryRow";
import Pagination from "../ui/Pagination";
import Pill from "../ui/Pill";
import Modal from "../ui/Modal";
import FormGroup from "../ui/FormGroup";
import { THEMES, THEME_LABELS } from "../data/configData";

import { useState } from "react";
import { login } from "../api/login";

// ─────────────────────────────────────────────
// LoginPage
// ─────────────────────────────────────────────
export default function LoginPage({ onLogin, theme, onThemeChange }) {
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (tab === "signup" && !name) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      if (tab === "login") {
        await onLogin({ email, password });
      } else {
        await onRegister({ name, email, password });
      }
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      {/* Theme picker top-right */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 600 }}>
        <div className="theme-sw">
          {THEMES.map((t) => (
            <button key={t} className={`t-btn${theme === t ? " on" : ""}`} onClick={() => onThemeChange(t)}>
              {THEME_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          {/* <div className="login-mark">F</div> */}
          <div className="login-brand">Plutus</div>
        </div>
        <div className="login-tagline">Your intelligent financial dashboard</div>

        {/* Tab toggle */}
        <div className="theme-sw" style={{ alignSelf: "stretch" }}>
          <button
            className={`t-btn${tab === "login" ? " on" : ""}`}
            style={{ flex: 1 }}
            onClick={() => {
              setTab("login");
              setError("");
            }}
          >
            Sign In
          </button>
          <button
            className={`t-btn${tab === "signup" ? " on" : ""}`}
            style={{ flex: 1 }}
            onClick={() => {
              setTab("signup");
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && <div className="login-err">⚠ {error}</div>}

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tab === "signup" && (
            <FormGroup label="Full Name">
              <input
                className="f-input"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
            </FormGroup>
          )}
          <FormGroup label="Email">
            <input
              className="f-input"
              type="email"
              placeholder="plutus@plutus.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </FormGroup>
          <FormGroup label="Password">
            <div style={{ position: "relative" }}>
              <input
                className="f-input"
                type={showPass ? "text" : "password"}
                placeholder={tab === "login" ? "••••••••" : "Min. 8 characters"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                style={{ paddingRight: 40 }}
              />
              <button
                onClick={() => setShowPass((s) => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-3)",
                  fontSize: 14,
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </FormGroup>

          {/* {tab === "login" && (
            <div style={{ textAlign: "right", marginTop: -4 }}>
              <a style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer" }}>Forgot password?</a>
            </div>
          )} */}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "11px 0", fontSize: 14 }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Please wait…" : tab === "login" ? "Sign In →" : "Create Account →"}
        </button>

        {/* Demo hint */}
        {tab === "login" && (
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)", marginTop: -8 }}>
            Demo: <span style={{ fontFamily: "var(--fn-m)", color: "var(--text-2)" }}>demo@plutus.com</span> /{" "}
            <span style={{ fontFamily: "var(--fn-m)", color: "var(--text-2)" }}>plutusAdmin2026</span>
          </div>
        )}
        {/* 
        <div className="login-divider">or continue with</div>

        <div className="login-social">
          <button className="social-btn">
            <span style={{ fontSize: 16 }}>G</span> Google
          </button>
          <button className="social-btn">
            <span style={{ fontSize: 16 }}>⌘</span> Apple
          </button>
        </div> */}

        <div className="login-footer">
          {tab === "login" ? (
            <>
              Don't have an account?{" "}
              <a
                onClick={() => {
                  setTab("signup");
                  setError("");
                }}
              >
                Sign up free
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                onClick={() => {
                  setTab("login");
                  setError("");
                }}
              >
                Sign in
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
