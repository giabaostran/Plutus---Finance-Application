// // ═══════════════════════════════════════════════════════════════
// // FINSIGHT — Complete React Application
// // All components in one file. Split by the section comments.
// //
// // Sections:
// //   1. CSS (injected into <head>)
// //   2. JSON Data
// //   3. Utility / shared helpers
// //   4. Primitive UI components (KpiCard, Modal, ProgressBar…)
// //   5. Chart components (Sparkline, BarChart, DonutChart)
// //   6. Page components (Dashboard, Transactions, Assets, Goals, Intelligence)
// //   7. Layout components (Sidebar, Topbar, BottomNav)
// //   8. App root
// // ═══════════════════════════════════════════════════════════════

// import { useState, useEffect, useRef, useCallback } from "react";

// // ─────────────────────────────────────────────
// // 1. CSS — injected once into document.head
// // ─────────────────────────────────────────────
// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Syne:wght@400;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@300;400;600;700&family=Nunito:wght@300;400;600;700;800&display=swap');

// :root {
//   --bg:#F5F2ED; --surface:#FFFFFF; --surface-2:#EDEAE4;
//   --border:rgba(0,0,0,0.07); --border-2:rgba(0,0,0,0.13);
//   --text-1:#100F0D; --text-2:#6C6862; --text-3:#B4B0AB;
//   --sidebar-bg:#18181E; --sidebar-t:#E8E5F0; --sidebar-m:#6E6C80;
//   --accent:#5B4EE8; --accent-h:#4A3DD4;
//   --green:#22A06B; --red:#D14040; --amber:#C47D1A;
//   --c1:#5B4EE8; --c2:#E8541A; --c3:#22A06B; --c4:#C4A240;
//   --r:10px; --r-sm:6px; --sw:240px;
//   --fn-d:'Syne',sans-serif; --fn-b:'IBM Plex Sans',sans-serif; --fn-m:'DM Mono',monospace;
//   --ease:0.2s ease;
// }
// [data-theme="dark"] {
//   --bg:#0D0D14; --surface:#14141F; --surface-2:#1C1C2A;
//   --border:rgba(255,255,255,0.07); --border-2:rgba(255,255,255,0.14);
//   --text-1:#EEEAFF; --text-2:#8886A6; --text-3:#44435A;
//   --sidebar-bg:#09090F; --sidebar-t:#CCCAEE; --sidebar-m:#55546E;
//   --accent:#7C6EF5; --accent-h:#9080FF;
//   --green:#34D48A; --red:#E05A42; --amber:#E8A030;
//   --c1:#7C6EF5; --c2:#F07040; --c3:#34D48A; --c4:#5A5880;
// }
// [data-theme="retro"] {
//   --bg:#080D08; --surface:#0C120C; --surface-2:#101810;
//   --border:rgba(74,192,94,0.12); --border-2:rgba(74,192,94,0.26);
//   --text-1:#7EE08E; --text-2:#3A8A4A; --text-3:#18401E;
//   --sidebar-bg:#050905; --sidebar-t:#7EE08E; --sidebar-m:#204828;
//   --accent:#4AC05E; --accent-h:#64D478;
//   --green:#4AC05E; --red:#E04848; --amber:#C8902A;
//   --c1:#4AC05E; --c2:#C8902A; --c3:#46C0C0; --c4:#8050C0;
//   --r:2px; --r-sm:2px;
// }

// /* ── RETRO-FUTURISM: chrome, neon orange, deep space ── */
// [data-theme="retrofuture"] {
//   --bg:#0A0612; --surface:#100A1E; --surface-2:#180F2C;
//   --border:rgba(255,100,0,0.14); --border-2:rgba(255,100,0,0.30);
//   --text-1:#FFE8C0; --text-2:#A0608A; --text-3:#402848;
//   --sidebar-bg:#060310; --sidebar-t:#FFD090; --sidebar-m:#5A3060;
//   --accent:#FF6400; --accent-h:#FF8030;
//   --green:#40E0A0; --red:#FF3060; --amber:#FFB830;
//   --c1:#FF6400; --c2:#FF3060; --c3:#40E0A0; --c4:#A060FF;
//   --r:0px; --r-sm:0px;
//   --fn-d:'Orbitron',monospace; --fn-b:'Exo 2',sans-serif; --fn-m:'DM Mono',monospace;
// }
// [data-theme="retrofuture"] .sb-mark{color:#000}
// [data-theme="retrofuture"] .sb-item.active{background:rgba(255,100,0,0.1);color:var(--accent)}
// [data-theme="retrofuture"] .sb-item:hover{background:rgba(255,100,0,0.06)}
// [data-theme="retrofuture"] .sb-badge{color:#000}
// [data-theme="retrofuture"] .sb-avatar{color:#000;border-radius:0}
// [data-theme="retrofuture"] .sb-active-bar{border-radius:0}
// [data-theme="retrofuture"] .kpi:hover{box-shadow:0 0 20px rgba(255,100,0,0.12)}
// [data-theme="retrofuture"] .card:hover{border-color:rgba(255,100,0,0.3)}
// [data-theme="retrofuture"] .btn-primary{color:#000}
// [data-theme="retrofuture"] .f-chip.on{color:#000}
// [data-theme="retrofuture"] .pg.on{color:#000}
// [data-theme="retrofuture"] .pill.ok{background:rgba(64,224,160,0.1)}
// [data-theme="retrofuture"] .pill.fail{background:rgba(255,48,96,0.1)}
// [data-theme="retrofuture"] .tag-info{background:rgba(255,100,0,0.1);color:var(--accent)}
// [data-theme="retrofuture"] .insight-action{color:var(--accent)}
// [data-theme="retrofuture"] .msg-user .msg-bubble{color:#000}
// [data-theme="retrofuture"] .bn-item.on{color:var(--accent)}
// /* Scanline grid overlay */
// [data-theme="retrofuture"] body::before{
//   content:'';position:fixed;inset:0;pointer-events:none;z-index:9998;
//   background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,100,0,0.015) 3px,rgba(255,100,0,0.015) 4px);
// }
// /* Perspective grid on bg */
// [data-theme="retrofuture"] body::after{
//   content:'';position:fixed;bottom:0;left:0;right:0;height:40vh;pointer-events:none;z-index:0;
//   background:
//     linear-gradient(rgba(255,100,0,0.06) 1px,transparent 1px),
//     linear-gradient(90deg,rgba(255,100,0,0.06) 1px,transparent 1px);
//   background-size:60px 60px;
//   transform:perspective(400px) rotateX(60deg);
//   transform-origin:bottom;
//   opacity:0.5;
// }

// /* ── FRUTIGER AERO: glossy glass, sky blue, lush greens ── */
// [data-theme="aero"] {
//   --bg:linear-gradient(135deg,#A8D8EA 0%,#E8F4FD 40%,#C8EED8 100%);
//   --bg-solid:#B8DCF0;
//   --surface:rgba(255,255,255,0.72); --surface-2:rgba(255,255,255,0.45);
//   --border:rgba(255,255,255,0.6); --border-2:rgba(100,180,240,0.5);
//   --text-1:#0A2840; --text-2:#2A6080; --text-3:#7AAAC8;
//   --sidebar-bg:rgba(10,40,80,0.82); --sidebar-t:#E8F4FF; --sidebar-m:#6090B8;
//   --accent:#0078D4; --accent-h:#005FA3;
//   --green:#2E8B57; --red:#C0392B; --amber:#E67E22;
//   --c1:#0078D4; --c2:#E67E22; --c3:#2E8B57; --c4:#8E44AD;
//   --r:14px; --r-sm:10px;
//   --fn-d:'Nunito',sans-serif; --fn-b:'Nunito',sans-serif; --fn-m:'DM Mono',monospace;
// }
// [data-theme="aero"] body{background:var(--bg);background-attachment:fixed}
// [data-theme="aero"] .card{
//   background:rgba(255,255,255,0.65);
//   backdrop-filter:blur(16px) saturate(180%);
//   -webkit-backdrop-filter:blur(16px) saturate(180%);
//   border:1px solid rgba(255,255,255,0.7);
//   box-shadow:0 4px 24px rgba(0,100,200,0.08),inset 0 1px 0 rgba(255,255,255,0.8);
// }
// [data-theme="aero"] .kpi{
//   background:rgba(255,255,255,0.60);
//   backdrop-filter:blur(12px) saturate(160%);
//   -webkit-backdrop-filter:blur(12px) saturate(160%);
//   border:1px solid rgba(255,255,255,0.75);
//   box-shadow:0 2px 16px rgba(0,100,200,0.07),inset 0 1px 0 rgba(255,255,255,0.9);
// }
// [data-theme="aero"] .sidebar{
//   background:rgba(10,40,80,0.80);
//   backdrop-filter:blur(20px);
//   -webkit-backdrop-filter:blur(20px);
//   border-right:1px solid rgba(255,255,255,0.15);
// }
// [data-theme="aero"] .topbar{
//   background:rgba(255,255,255,0.60);
//   backdrop-filter:blur(16px);
//   -webkit-backdrop-filter:blur(16px);
//   border-bottom:1px solid rgba(255,255,255,0.6);
//   box-shadow:0 1px 0 rgba(0,100,200,0.08);
// }
// [data-theme="aero"] .sb-badge{color:#fff}
// [data-theme="aero"] .sb-item.active{background:rgba(255,255,255,0.12)}
// [data-theme="aero"] .sb-avatar{color:#fff;border-radius:50%}
// [data-theme="aero"] .btn-primary{
//   background:linear-gradient(180deg,#2090E8 0%,#0060C0 100%);
//   border:1px solid rgba(0,60,140,0.4);
//   box-shadow:0 2px 8px rgba(0,100,200,0.3),inset 0 1px 0 rgba(255,255,255,0.4);
//   color:#fff;
// }
// [data-theme="aero"] .btn-primary:hover{
//   background:linear-gradient(180deg,#30A0F0 0%,#0070D0 100%);
// }
// [data-theme="aero"] .f-input,[data-theme="aero"] .f-select,[data-theme="aero"] .f-textarea{
//   background:rgba(255,255,255,0.7);
//   border:1px solid rgba(100,160,220,0.5);
//   box-shadow:inset 0 1px 3px rgba(0,80,160,0.08);
// }
// [data-theme="aero"] .modal{
//   background:rgba(240,248,255,0.90);
//   backdrop-filter:blur(20px);
//   -webkit-backdrop-filter:blur(20px);
//   border:1px solid rgba(255,255,255,0.8);
//   box-shadow:0 12px 48px rgba(0,80,180,0.2);
// }
// [data-theme="aero"] .prog-fill{
//   background:linear-gradient(90deg,#40B0F0,#0078D4);
//   box-shadow:0 0 6px rgba(0,120,212,0.4);
// }
// [data-theme="aero"] .ai-dot{box-shadow:0 0 6px var(--green)}
// [data-theme="aero"] .t-btn.on{
//   background:rgba(255,255,255,0.7);
//   box-shadow:0 1px 4px rgba(0,100,200,0.15),inset 0 1px 0 rgba(255,255,255,0.9);
// }
// [data-theme="aero"] .theme-sw{background:rgba(255,255,255,0.4);backdrop-filter:blur(8px)}
// [data-theme="aero"] .bot-nav{background:rgba(10,40,80,0.80);backdrop-filter:blur(20px)}
// [data-theme="aero"] .bn-item.on{color:#A8D8FF}

// /* ══ AUTH PAGES (Login + 404) ═══════════════════════════════ */
// .auth-shell{
//   position:fixed;inset:0;
//   display:flex;align-items:center;justify-content:center;
//   background:var(--bg);
//   background-attachment:fixed;
//   z-index:500;
//   transition:background var(--ease);
//   padding:20px;
// }
// [data-theme="aero"] .auth-shell{background:linear-gradient(135deg,#A8D8EA 0%,#E8F4FD 40%,#C8EED8 100%)}
// [data-theme="retrofuture"] .auth-shell{
//   background:radial-gradient(ellipse at 50% 0%,#1A0A2E 0%,#0A0612 60%);
// }
// [data-theme="retrofuture"] .auth-shell::before{
//   content:'';position:absolute;bottom:0;left:0;right:0;height:50vh;
//   background:
//     linear-gradient(rgba(255,100,0,0.08) 1px,transparent 1px),
//     linear-gradient(90deg,rgba(255,100,0,0.08) 1px,transparent 1px);
//   background-size:60px 60px;
//   transform:perspective(500px) rotateX(65deg);
//   transform-origin:bottom;
// }

// /* Login card */
// .login-card{
//   background:var(--surface);
//   border:1px solid var(--border-2);
//   border-radius:var(--r);
//   padding:40px 40px 36px;
//   width:100%;max-width:420px;
//   display:flex;flex-direction:column;gap:24px;
//   position:relative;z-index:1;
//   box-shadow:0 8px 40px rgba(0,0,0,0.12);
//   transition:background var(--ease);
// }
// [data-theme="aero"] .login-card{
//   background:rgba(255,255,255,0.72);
//   backdrop-filter:blur(20px);
//   -webkit-backdrop-filter:blur(20px);
//   border:1px solid rgba(255,255,255,0.8);
//   box-shadow:0 8px 48px rgba(0,100,200,0.15),inset 0 1px 0 rgba(255,255,255,0.9);
// }
// [data-theme="retrofuture"] .login-card{
//   background:rgba(16,10,30,0.95);
//   border:1px solid rgba(255,100,0,0.35);
//   box-shadow:0 0 40px rgba(255,100,0,0.08),0 0 1px rgba(255,100,0,0.6);
// }
// .login-logo{display:flex;align-items:center;gap:12px;justify-content:center}
// .login-mark{
//   width:40px;height:40px;
//   background:var(--accent);
//   border-radius:var(--r-sm);
//   display:flex;align-items:center;justify-content:center;
//   font-family:var(--fn-d);font-size:20px;font-weight:800;
//   color:#fff;flex-shrink:0;
// }
// [data-theme="retrofuture"] .login-mark{color:#000}
// [data-theme="aero"] .login-mark{
//   background:linear-gradient(180deg,#2090E8,#0060C0);
//   box-shadow:0 2px 10px rgba(0,100,200,0.4);
//   color:#fff;
// }
// .login-brand{font-family:var(--fn-d);font-size:24px;font-weight:800;color:var(--text-1);letter-spacing:-0.5px}
// .login-tagline{text-align:center;font-size:13px;color:var(--text-2);margin-top:-16px}
// .login-divider{
//   display:flex;align-items:center;gap:12px;
//   font-size:11px;color:var(--text-3);letter-spacing:0.5px;
// }
// .login-divider::before,.login-divider::after{content:'';flex:1;height:1px;background:var(--border-2)}
// .login-footer{text-align:center;font-size:12px;color:var(--text-2)}
// .login-footer a{color:var(--accent);cursor:pointer;text-decoration:none;font-weight:600}
// .login-footer a:hover{text-decoration:underline}
// .login-social{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .social-btn{
//   display:flex;align-items:center;justify-content:center;gap:8px;
//   padding:9px 14px;
//   border-radius:var(--r-sm);
//   border:1px solid var(--border-2);
//   background:var(--surface-2);
//   font-size:13px;color:var(--text-1);
//   cursor:pointer;font-weight:500;
//   transition:all 0.15s;font-family:var(--fn-b);
// }
// .social-btn:hover{border-color:var(--accent);color:var(--accent)}
// [data-theme="aero"] .social-btn{background:rgba(255,255,255,0.6);backdrop-filter:blur(8px)}
// .login-err{
//   background:rgba(209,64,64,0.08);
//   border:1px solid rgba(209,64,64,0.25);
//   border-radius:var(--r-sm);
//   padding:10px 14px;
//   font-size:13px;color:var(--red);
//   display:flex;align-items:center;gap:8px;
// }
// [data-theme="retrofuture"] .login-err{border-radius:0}

// /* ── retrofuture login glow input ── */
// [data-theme="retrofuture"] .f-input:focus{
//   border-color:var(--accent);
//   box-shadow:0 0 0 2px rgba(255,100,0,0.15),0 0 8px rgba(255,100,0,0.1);
// }
// [data-theme="retrofuture"] .btn-primary{
//   color:#000;
//   box-shadow:0 0 12px rgba(255,100,0,0.3);
// }
// [data-theme="retrofuture"] .btn-primary:hover{box-shadow:0 0 20px rgba(255,100,0,0.5)}

// /* 404 page */
// .e404-shell{
//   position:fixed;inset:0;
//   display:flex;flex-direction:column;align-items:center;justify-content:center;
//   background:var(--bg);
//   background-attachment:fixed;
//   z-index:500;
//   gap:0;
//   text-align:center;padding:24px;
//   transition:background var(--ease);
// }
// [data-theme="aero"] .e404-shell{background:linear-gradient(135deg,#A8D8EA 0%,#E8F4FD 40%,#C8EED8 100%)}
// [data-theme="retrofuture"] .e404-shell{background:radial-gradient(ellipse at 50% 0%,#1A0A2E 0%,#0A0612 60%)}
// [data-theme="retrofuture"] .e404-shell::before{
//   content:'';position:absolute;bottom:0;left:0;right:0;height:50vh;
//   background:linear-gradient(rgba(255,100,0,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,100,0,0.08) 1px,transparent 1px);
//   background-size:60px 60px;transform:perspective(500px) rotateX(65deg);transform-origin:bottom;
// }
// .e404-code{
//   font-family:var(--fn-d);
//   font-size:clamp(80px,18vw,160px);
//   font-weight:800;
//   color:var(--accent);
//   line-height:1;
//   letter-spacing:-4px;
//   opacity:0.18;
//   pointer-events:none;
//   user-select:none;
//   position:relative;z-index:1;
// }
// [data-theme="retrofuture"] .e404-code{
//   opacity:1;
//   text-shadow:0 0 30px rgba(255,100,0,0.5),0 0 60px rgba(255,100,0,0.2);
//   letter-spacing:4px;
//   font-size:clamp(60px,14vw,130px);
// }
// [data-theme="aero"] .e404-code{
//   background:linear-gradient(180deg,#2090E8,#0050A0);
//   -webkit-background-clip:text;-webkit-text-fill-color:transparent;
//   background-clip:text;opacity:0.25;
// }
// .e404-title{
//   font-family:var(--fn-d);
//   font-size:clamp(20px,4vw,32px);
//   font-weight:700;
//   color:var(--text-1);
//   margin-top:-24px;
//   position:relative;z-index:1;
// }
// [data-theme="retrofuture"] .e404-title{color:var(--accent);text-shadow:0 0 16px rgba(255,100,0,0.4)}
// .e404-sub{font-size:15px;color:var(--text-2);margin-top:10px;max-width:380px;line-height:1.6;position:relative;z-index:1}
// .e404-actions{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
// .e404-card{
//   background:var(--surface);
//   border:1px solid var(--border-2);
//   border-radius:var(--r);
//   padding:20px 24px;
//   margin-top:28px;
//   position:relative;z-index:1;
//   max-width:360px;width:100%;
//   box-shadow:0 4px 20px rgba(0,0,0,0.06);
// }
// [data-theme="aero"] .e404-card{background:rgba(255,255,255,0.65);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.7)}
// [data-theme="retrofuture"] .e404-card{background:rgba(16,10,30,0.95);border:1px solid rgba(255,100,0,0.25)}
// .e404-nav-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--text-3);margin-bottom:12px}
// .e404-nav-links{display:flex;flex-direction:column;gap:8px}
// .e404-nav-link{
//   display:flex;align-items:center;gap:12px;
//   padding:9px 12px;
//   border-radius:var(--r-sm);
//   background:var(--surface-2);
//   border:1px solid var(--border);
//   cursor:pointer;
//   transition:all 0.15s;
//   font-size:13px;color:var(--text-1);
//   font-family:var(--fn-b);
// }
// .e404-nav-link:hover{border-color:var(--border-2);background:var(--surface)}
// [data-theme="retrofuture"] .e404-nav-link:hover{border-color:var(--accent);color:var(--accent)}
// [data-theme="aero"] .e404-nav-link{background:rgba(255,255,255,0.5)}
// .e404-nav-link-icon{font-size:15px;width:20px;text-align:center}
// .e404-glitch{
//   position:relative;display:inline-block;
// }
// [data-theme="retrofuture"] .e404-glitch::before,[data-theme="retrofuture"] .e404-glitch::after{
//   content:attr(data-text);
//   position:absolute;top:0;left:0;right:0;
//   font-family:var(--fn-d);
//   font-size:inherit;font-weight:800;
//   letter-spacing:4px;
// }
// [data-theme="retrofuture"] .e404-glitch::before{
//   color:#FF3060;clip-path:polygon(0 0,100% 0,100% 45%,0 45%);
//   animation:glitch-top 3s infinite;text-shadow:none;opacity:0.6;
// }
// [data-theme="retrofuture"] .e404-glitch::after{
//   color:#40E0A0;clip-path:polygon(0 55%,100% 55%,100% 100%,0 100%);
//   animation:glitch-bot 3s infinite;text-shadow:none;opacity:0.6;
// }
// @keyframes glitch-top{
//   0%,90%,100%{transform:translate(0)}
//   92%{transform:translate(-3px,0)}
//   94%{transform:translate(3px,0)}
//   96%{transform:translate(-1px,0)}
// }
// @keyframes glitch-bot{
//   0%,90%,100%{transform:translate(0)}
//   92%{transform:translate(3px,0)}
//   94%{transform:translate(-3px,0)}
//   96%{transform:translate(2px,0)}
// }

// *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
// html,body,#root{height:100%;overflow:hidden}
// body{font-family:var(--fn-b);background:var(--bg);color:var(--text-1);display:flex;transition:background var(--ease),color var(--ease)}
// button,select,input{font-family:inherit;outline:none}

// /* Layout */
// .sidebar{width:var(--sw);height:100vh;background:var(--sidebar-bg);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;z-index:100;transition:transform var(--ease),background var(--ease);overflow:hidden}
// .sb-logo{padding:28px 22px 24px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0}
// .sb-mark{width:30px;height:30px;background:var(--accent);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-family:var(--fn-d);font-size:15px;font-weight:800;color:#fff;flex-shrink:0}
// [data-theme="retro"] .sb-mark{color:#000}
// .sb-name{font-family:var(--fn-d);font-size:18px;font-weight:800;color:var(--sidebar-t);letter-spacing:-0.3px}
// .sb-nav{flex:1;overflow-y:auto;padding:16px 12px;display:flex;flex-direction:column;gap:2px}
// .sb-nav::-webkit-scrollbar{width:0}
// .sb-section{font-size:9px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:var(--sidebar-m);padding:14px 10px 6px}
// .sb-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r-sm);color:var(--sidebar-m);font-size:13px;font-weight:400;cursor:pointer;transition:all 0.15s;position:relative;user-select:none}
// .sb-item:hover{background:rgba(255,255,255,0.04);color:var(--sidebar-t)}
// .sb-item.active{background:rgba(255,255,255,0.07);color:var(--sidebar-t)}
// [data-theme="retro"] .sb-item.active{background:rgba(74,192,94,0.08);color:var(--accent)}
// [data-theme="retro"] .sb-item:hover{background:rgba(74,192,94,0.05)}
// .sb-item-icon{width:16px;text-align:center;font-size:14px;flex-shrink:0}
// .sb-badge{margin-left:auto;background:var(--accent);color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:20px;font-family:var(--fn-m)}
// [data-theme="retro"] .sb-badge{color:#000;border-radius:2px}
// .sb-active-bar{position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:60%;background:var(--accent);border-radius:0 2px 2px 0;opacity:0;transition:opacity 0.15s}
// .sb-item.active .sb-active-bar{opacity:1}
// .sb-foot{padding:16px 12px;border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0}
// .sb-user{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:var(--r-sm);cursor:pointer}
// .sb-avatar{width:32px;height:32px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
// [data-theme="retro"] .sb-avatar{border-radius:2px;color:#000}
// .sb-uname{font-size:13px;font-weight:600;color:var(--sidebar-t)}
// .sb-urole{font-size:11px;color:var(--sidebar-m)}
// .sb-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:90;opacity:0;transition:opacity var(--ease)}
// .sb-backdrop.on{opacity:1;display:block}

// .shell{margin-left:var(--sw);flex:1;height:100vh;display:flex;flex-direction:column;overflow:hidden;min-width:0}
// .topbar{height:58px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 28px;gap:14px;flex-shrink:0;transition:background var(--ease)}
// .tb-hamburger{display:none;flex-direction:column;gap:4px;cursor:pointer;padding:4px;flex-shrink:0;background:none;border:none}
// .tb-hamburger span{display:block;width:18px;height:1.5px;background:var(--text-2);border-radius:2px}
// .tb-title{font-family:var(--fn-d);font-size:16px;font-weight:700;color:var(--text-1);flex:1;letter-spacing:-0.2px}
// .tb-right{display:flex;align-items:center;gap:10px}
// .theme-sw{display:flex;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);overflow:hidden}
// .t-btn{padding:5px 13px;font-size:11px;font-weight:500;font-family:var(--fn-b);color:var(--text-2);background:none;border:none;cursor:pointer;transition:all 0.15s}
// .t-btn:hover{color:var(--text-1)}
// .t-btn.on{background:var(--surface);color:var(--text-1);box-shadow:0 1px 3px rgba(0,0,0,0.08)}
// [data-theme="dark"] .t-btn.on,[data-theme="retro"] .t-btn.on{background:var(--surface-2);box-shadow:none}
// .tb-icon{width:32px;height:32px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--surface-2);display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;color:var(--text-2);transition:all 0.15s;flex-shrink:0}
// .tb-icon:hover{color:var(--text-1);border-color:var(--border-2)}
// .pages{flex:1;overflow:hidden;position:relative}
// .page{position:absolute;inset:0;overflow-y:auto;padding:28px;display:none;flex-direction:column;gap:20px}
// .page.on{display:flex}
// .page::-webkit-scrollbar{width:4px}
// .page::-webkit-scrollbar-thumb{background:var(--border-2);border-radius:2px}

// /* Cards */
// .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:background var(--ease),border-color var(--ease)}
// .card-hd{padding:18px 22px 14px;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid var(--border);gap:12px}
// .card-title{font-family:var(--fn-d);font-size:14px;font-weight:700;color:var(--text-1);letter-spacing:-0.1px}
// .card-sub{font-size:11px;color:var(--text-2);margin-top:2px}
// .card-bd{padding:20px 22px}
// .card-act{font-size:11px;color:var(--text-2);padding:5px 10px;border:1px solid var(--border);border-radius:var(--r-sm);cursor:pointer;background:none;transition:all 0.15s;white-space:nowrap;flex-shrink:0}
// .card-act:hover{color:var(--text-1);border-color:var(--border-2)}

// /* Grids */
// .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
// .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
// .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
// .g-main{display:grid;grid-template-columns:1.65fr 1fr;gap:16px}

// /* KPI */
// .kpi{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px;display:flex;flex-direction:column;gap:12px;transition:border-color 0.15s,background var(--ease);position:relative;overflow:hidden}
// .kpi:hover{border-color:var(--border-2)}
// .kpi-top{display:flex;justify-content:space-between;align-items:flex-start}
// .kpi-label{font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-2)}
// .kpi-ico{width:30px;height:30px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:13px;background:var(--surface-2);flex-shrink:0}
// .kpi-val{font-family:var(--fn-d);font-size:28px;font-weight:800;color:var(--text-1);letter-spacing:-1px;line-height:1}
// .kpi-foot{display:flex;align-items:center;gap:7px}
// .delta{font-size:11px;font-weight:600;font-family:var(--fn-m);padding:2px 7px;border-radius:4px}
// .delta.up{color:var(--green);background:rgba(34,160,107,0.1)}
// .delta.dn{color:var(--red);background:rgba(209,64,64,0.1)}
// [data-theme="dark"] .delta.up{background:rgba(52,212,138,0.1)}
// [data-theme="dark"] .delta.dn{background:rgba(224,90,66,0.1)}
// [data-theme="retro"] .delta.up{background:rgba(74,192,94,0.1)}
// [data-theme="retro"] .delta.dn{background:rgba(224,72,72,0.1)}
// .kpi-sub{font-size:11px;color:var(--text-3)}

// /* Sparkline */
// .spark{width:100%;height:32px}
// .sp-line-g{fill:none;stroke:var(--green);stroke-width:1.5}
// .sp-line-r{fill:none;stroke:var(--red);stroke-width:1.5}
// .sp-area-g{fill:var(--green);opacity:.08}
// .sp-area-r{fill:var(--red);opacity:.08}

// /* Table */
// .tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
// table{width:100%;border-collapse:collapse;font-size:13px}
// thead th{padding:10px 20px;text-align:left;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--text-2);background:var(--surface-2);border-bottom:1px solid var(--border);white-space:nowrap;cursor:default}
// thead th.sort{cursor:pointer;user-select:none}
// thead th.sort:hover{color:var(--text-1)}
// tbody tr{border-bottom:1px solid var(--border);transition:background 0.1s}
// tbody tr:hover{background:var(--surface-2)}
// tbody tr:last-child{border-bottom:none}
// tbody td{padding:13px 20px;color:var(--text-1);vertical-align:middle}
// .tx-ico{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
// [data-theme="retro"] .tx-ico{border-radius:2px}
// .tx-name{font-weight:500;font-size:13px}
// .tx-sub{font-size:11px;color:var(--text-2);margin-top:1px}
// .pill{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:600;padding:3px 9px;border-radius:20px;font-family:var(--fn-m);white-space:nowrap}
// [data-theme="retro"] .pill{border-radius:2px}
// .pill.ok{color:var(--green);background:rgba(34,160,107,0.1)}
// .pill.pend{color:var(--amber);background:rgba(196,125,26,0.1)}
// .pill.fail{color:var(--red);background:rgba(209,64,64,0.1)}
// [data-theme="dark"] .pill.ok{background:rgba(52,212,138,0.1)}
// [data-theme="dark"] .pill.fail{background:rgba(224,90,66,0.1)}
// [data-theme="retro"] .pill.ok{background:rgba(74,192,94,0.1)}
// [data-theme="retro"] .pill.fail{background:rgba(224,72,72,0.1)}
// .amt-pos{color:var(--green);font-weight:600;font-family:var(--fn-m)}
// .amt-neg{color:var(--red);font-weight:600;font-family:var(--fn-m)}
// .amt-neu{color:var(--text-1);font-weight:600;font-family:var(--fn-m)}
// .cat-chip{display:inline-flex;align-items:center;font-size:11px;padding:3px 9px;border-radius:20px;background:var(--surface-2);border:1px solid var(--border);color:var(--text-2);white-space:nowrap}
// [data-theme="retro"] .cat-chip{border-radius:2px}

// /* Forms */
// .f-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
// .f-group{display:flex;flex-direction:column;gap:5px}
// .f-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-2)}
// .f-input,.f-select,.f-textarea{padding:9px 12px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--surface-2);font-size:13px;font-family:var(--fn-b);color:var(--text-1);transition:border-color 0.15s;width:100%}
// .f-input:focus,.f-select:focus,.f-textarea:focus{border-color:var(--accent)}
// .f-input::placeholder,.f-textarea::placeholder{color:var(--text-3)}
// .f-textarea{resize:vertical;min-height:80px}
// .f-select option{background:var(--surface)}

// /* Buttons */
// .btn{padding:9px 18px;border-radius:var(--r-sm);border:1px solid var(--border);font-size:13px;font-weight:500;font-family:var(--fn-b);cursor:pointer;transition:all 0.15s;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}
// .btn-ghost{background:var(--surface-2);color:var(--text-2)}
// .btn-ghost:hover{color:var(--text-1);border-color:var(--border-2)}
// .btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
// [data-theme="retro"] .btn-primary{color:#000}
// .btn-primary:hover{background:var(--accent-h);border-color:var(--accent-h)}
// .btn-danger{background:rgba(209,64,64,0.1);color:var(--red);border-color:rgba(209,64,64,0.2)}
// .btn-sm{padding:6px 12px;font-size:12px}

// /* Modal */
// .modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:300;align-items:center;justify-content:center;padding:20px}
// .modal-bg.on{display:flex}
// .modal{background:var(--surface);border:1px solid var(--border-2);border-radius:var(--r);width:100%;max-width:500px;box-shadow:0 20px 60px rgba(0,0,0,0.25);overflow:hidden}
// .modal-hd{padding:20px 24px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
// .modal-title{font-family:var(--fn-d);font-size:16px;font-weight:700;color:var(--text-1)}
// .modal-x{width:28px;height:28px;border-radius:var(--r-sm);border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--text-2);transition:all 0.15s}
// .modal-x:hover{color:var(--text-1);border-color:var(--border-2)}
// .modal-bd{padding:20px 24px;display:flex;flex-direction:column;gap:14px}
// .modal-ft{padding:16px 24px;border-top:1px solid var(--border);display:flex;gap:10px;justify-content:flex-end}

// /* Toolbar / Filter */
// .toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:16px 22px;border-bottom:1px solid var(--border)}
// .tb-search{flex:1;min-width:160px;display:flex;align-items:center;gap:8px;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);padding:7px 12px}
// .tb-search input{background:none;border:none;font-size:13px;color:var(--text-1);width:100%;font-family:var(--fn-b)}
// .tb-search input::placeholder{color:var(--text-3)}
// .filter-row{display:flex;gap:6px;flex-wrap:wrap;padding:12px 22px;border-bottom:1px solid var(--border)}
// .f-chip{padding:5px 13px;border-radius:20px;border:1px solid var(--border);background:none;font-size:11px;font-weight:500;color:var(--text-2);cursor:pointer;transition:all 0.15s}
// [data-theme="retro"] .f-chip{border-radius:2px}
// .f-chip:hover{border-color:var(--border-2);color:var(--text-1)}
// .f-chip.on{background:var(--accent);color:#fff;border-color:var(--accent)}
// [data-theme="retro"] .f-chip.on{color:#000}
// .tb-sel{padding:7px 10px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--surface-2);font-size:12px;color:var(--text-2);cursor:pointer;font-family:var(--fn-b)}

// /* Pagination */
// .pager{display:flex;align-items:center;justify-content:space-between;padding:13px 22px;border-top:1px solid var(--border);flex-wrap:wrap;gap:8px}
// .pager-info{font-size:11px;color:var(--text-2);font-family:var(--fn-m)}
// .pager-btns{display:flex;gap:3px}
// .pg{min-width:30px;height:30px;border-radius:var(--r-sm);border:1px solid var(--border);background:var(--surface-2);font-size:12px;font-family:var(--fn-m);color:var(--text-2);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 8px;transition:all 0.15s}
// .pg:hover{border-color:var(--border-2);color:var(--text-1)}
// .pg.on{background:var(--accent);color:#fff;border-color:var(--accent)}
// [data-theme="retro"] .pg.on{color:#000}
// .pg:disabled{opacity:.3;cursor:default;pointer-events:none}

// /* Progress */
// .prog-track{height:6px;background:var(--surface-2);border-radius:3px;overflow:hidden;border:1px solid var(--border)}
// [data-theme="retro"] .prog-track{border-radius:0}
// .prog-fill{height:100%;border-radius:3px;transition:width 0.4s ease}
// [data-theme="retro"] .prog-fill{border-radius:0}

// /* Donut */
// .donut-wrap{position:relative;width:130px;height:130px;flex-shrink:0}
// .donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none}
// .donut-val{font-family:var(--fn-d);font-size:18px;font-weight:800;color:var(--text-1);line-height:1}
// .donut-lbl{font-size:10px;color:var(--text-2);margin-top:3px}
// .legend-row{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--text-2)}
// .leg-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
// [data-theme="retro"] .leg-dot{border-radius:0}

// /* Bar chart */
// svg.chart{width:100%;display:block}
// .cg{stroke:var(--border);stroke-width:0.5}
// .ct text{fill:var(--text-3);font-size:10px;font-family:var(--fn-m)}
// .br{fill:var(--c1)}
// .be{fill:var(--c2);opacity:.72}
// .lp{fill:none;stroke:var(--c3);stroke-width:2;stroke-linejoin:round}
// .dp{fill:var(--c3)}
// .chart-legend{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:14px}

// /* Asset */
// .asset-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
// .asset-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px;display:flex;flex-direction:column;gap:14px;transition:border-color 0.15s,background var(--ease);cursor:pointer}
// .asset-card:hover{border-color:var(--border-2)}
// .asset-top{display:flex;align-items:flex-start;gap:12px}
// .asset-icon{width:40px;height:40px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
// .asset-name{font-size:14px;font-weight:600;color:var(--text-1)}
// .asset-type{font-size:11px;color:var(--text-2);margin-top:2px}
// .asset-val{font-family:var(--fn-d);font-size:22px;font-weight:800;color:var(--text-1);letter-spacing:-0.5px}
// .asset-change{display:flex;align-items:center;gap:8px;margin-top:4px}
// .asset-foot{display:flex;justify-content:space-between;align-items:center}
// .asset-meta{font-size:11px;color:var(--text-2)}
// .asset-add{background:var(--surface);border:1px dashed var(--border-2);border-radius:var(--r);padding:18px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:160px;cursor:pointer;transition:border-color 0.15s,background 0.15s;text-align:center}
// .asset-add:hover{border-color:var(--accent);background:var(--surface-2)}
// .asset-add-icon{font-size:28px;opacity:.4}
// .asset-add-label{font-size:13px;color:var(--text-2)}

// /* Goal */
// .goal-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px 22px;display:flex;flex-direction:column;gap:14px;transition:border-color 0.15s,background var(--ease)}
// .goal-card:hover{border-color:var(--border-2)}
// .goal-top{display:flex;justify-content:space-between;align-items:flex-start}
// .goal-info{display:flex;align-items:center;gap:12px}
// .goal-icon{width:38px;height:38px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
// .goal-name{font-size:14px;font-weight:600;color:var(--text-1)}
// .goal-deadline{font-size:11px;color:var(--text-2);margin-top:2px}
// .goal-amounts{display:flex;justify-content:space-between;align-items:baseline}
// .goal-current{font-family:var(--fn-d);font-size:20px;font-weight:800;color:var(--text-1)}
// .goal-target{font-size:12px;color:var(--text-2);font-family:var(--fn-m)}
// .goal-pct{font-size:12px;font-weight:600;font-family:var(--fn-m)}
// .goal-foot{display:flex;justify-content:space-between;align-items:center}
// .goal-rate{font-size:12px;color:var(--text-2)}

// /* Intelligence */
// .intel-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
// .insight-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px;display:flex;flex-direction:column;gap:10px;transition:border-color 0.15s,background var(--ease)}
// .insight-card:hover{border-color:var(--border-2)}
// .insight-tag{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:3px 9px;border-radius:20px;font-family:var(--fn-m);width:fit-content}
// [data-theme="retro"] .insight-tag{border-radius:2px}
// .tag-warn{background:rgba(196,125,26,0.12);color:var(--amber)}
// .tag-tip{background:rgba(34,160,107,0.1);color:var(--green)}
// .tag-alert{background:rgba(209,64,64,0.1);color:var(--red)}
// .tag-info{background:rgba(91,78,232,0.1);color:var(--accent)}
// [data-theme="retro"] .tag-info{background:rgba(74,192,94,0.1);color:var(--accent)}
// .insight-title{font-size:14px;font-weight:600;color:var(--text-1)}
// .insight-body{font-size:13px;color:var(--text-2);line-height:1.6}
// .insight-foot{display:flex;justify-content:space-between;align-items:center;margin-top:4px}
// .insight-action{font-size:12px;font-weight:500;color:var(--accent);cursor:pointer;background:none;border:none}

// /* Chat */
// .ai-chat{display:flex;flex-direction:column;min-height:300px}
// .chat-msgs{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;max-height:280px}
// .chat-msgs::-webkit-scrollbar{width:0}
// .msg{display:flex;gap:10px;align-items:flex-start}
// .msg-avatar{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:2px}
// [data-theme="retro"] .msg-avatar{border-radius:2px}
// .msg-ai .msg-avatar{background:var(--accent);color:#fff}
// [data-theme="retro"] .msg-ai .msg-avatar{color:#000}
// .msg-user .msg-avatar{background:var(--surface-2);color:var(--text-2)}
// .msg-bubble{background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r-sm);padding:10px 14px;font-size:13px;color:var(--text-1);line-height:1.5;max-width:88%}
// .msg-user .msg-bubble{background:var(--accent);color:#fff;border-color:var(--accent)}
// [data-theme="retro"] .msg-user .msg-bubble{color:#000}
// .msg-user{flex-direction:row-reverse}
// .chat-input{padding:12px 20px;border-top:1px solid var(--border);display:flex;gap:8px}
// .chat-input .f-input{flex:1}
// .ai-status{display:flex;align-items:center;gap:8px;padding:0 20px 12px;font-size:11px;color:var(--text-2);font-family:var(--fn-m)}
// .ai-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
// @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

// /* Misc */
// .spend-bar{display:flex;flex-direction:column;gap:10px;padding:4px 0}
// .spend-item{display:flex;flex-direction:column;gap:5px}
// .spend-row{display:flex;justify-content:space-between;align-items:center}
// .spend-label{font-size:12px;color:var(--text-2)}
// .spend-val{font-size:12px;font-weight:600;font-family:var(--fn-m);color:var(--text-1)}
// .sum-row{display:flex;border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
// .sum-cell{flex:1;padding:14px 16px;border-right:1px solid var(--border);display:flex;flex-direction:column;gap:3px}
// .sum-cell:last-child{border-right:none}
// .sum-label{font-size:10px;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-2);font-weight:500}
// .sum-val{font-family:var(--fn-d);font-size:20px;font-weight:800;color:var(--text-1);letter-spacing:-0.5px}
// .sum-val.pos{color:var(--green)}
// .sum-val.neg{color:var(--red)}
// .sum-sub{font-size:11px;color:var(--text-3);font-family:var(--fn-m)}

// /* Bottom Nav */
// .bot-nav{display:none;position:fixed;bottom:0;left:0;right:0;height:58px;background:var(--sidebar-bg);border-top:1px solid var(--border);z-index:80;padding:0 8px;align-items:center;justify-content:space-around}
// .bn-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 10px;border-radius:var(--r-sm);cursor:pointer;color:var(--sidebar-m);font-size:9px;transition:color 0.15s;min-width:48px;background:none;border:none;font-family:var(--fn-b)}
// .bn-ico{font-size:16px;line-height:1.2}
// .bn-item.on{color:var(--sidebar-t)}
// [data-theme="retro"] .bn-item.on{color:var(--accent)}

// /* Responsive */
// @media(max-width:1023px){
//   .sidebar{transform:translateX(-100%);z-index:95}
//   .sidebar.on{transform:translateX(0)}
//   .shell{margin-left:0}
//   .tb-hamburger{display:flex}
//   .topbar{padding:0 18px}
//   .g4{grid-template-columns:1fr 1fr}
//   .g-main{grid-template-columns:1fr}
//   .intel-grid{grid-template-columns:1fr}
//   .theme-sw{display:none}
//   .page{padding:20px}
// }
// @media(max-width:639px){
//   .g4{grid-template-columns:1fr 1fr;gap:10px}
//   .g2{grid-template-columns:1fr}
//   .g3{grid-template-columns:1fr}
//   .g-main{grid-template-columns:1fr}
//   .intel-grid{grid-template-columns:1fr}
//   .kpi-val{font-size:22px}
//   .page{padding:14px 14px 72px}
//   .topbar{padding:0 14px;height:52px}
//   .bot-nav{display:flex}
//   .f-row{grid-template-columns:1fr}
//   .sum-row{flex-wrap:wrap}
//   .sum-cell{min-width:50%}
//   thead th:nth-child(4),tbody td:nth-child(4),
//   thead th:nth-child(3),tbody td:nth-child(3){display:none}
// }
// `;

// // Inject CSS once
// const styleEl = document.createElement("style");
// styleEl.textContent = CSS;
// document.head.appendChild(styleEl);

// // ─────────────────────────────────────────────
// // 2. JSON DATA
// // ─────────────────────────────────────────────

// export const INITIAL_DATA = {
//   user: {
//     name: "Alex Kim",
//     initials: "AK",
//     plan: "Pro Plan",
//   },

//   kpis: [
//     {
//       id: "net-worth",
//       label: "Net Worth",
//       value: "$248,540",
//       icon: "💼",
//       delta: "▲ 8.4%",
//       deltaDir: "up",
//       sub: "vs last month",
//       sparkPoints: "0,28 20,22 40,20 60,16 80,18 100,10 120,6",
//       sparkAreaPoints: "0,28 20,22 40,20 60,16 80,18 100,10 120,6 120,32 0,32",
//       sparkColor: "green",
//     },
//     {
//       id: "income",
//       label: "Monthly Income",
//       value: "$14,280",
//       icon: "↑",
//       delta: "▲ 3.2%",
//       deltaDir: "up",
//       sub: "vs last month",
//       sparkPoints: "0,26 20,22 40,24 60,18 80,16 100,12 120,10",
//       sparkAreaPoints: "0,26 20,22 40,24 60,18 80,16 100,12 120,10 120,32 0,32",
//       sparkColor: "green",
//     },
//     {
//       id: "expenses",
//       label: "Total Expenses",
//       value: "$6,842",
//       icon: "↓",
//       delta: "▲ 5.1%",
//       deltaDir: "dn",
//       sub: "vs last month",
//       sparkPoints: "0,12 20,16 40,14 60,20 80,17 100,22 120,26",
//       sparkAreaPoints: "0,12 20,16 40,14 60,20 80,17 100,22 120,26 120,32 0,32",
//       sparkColor: "red",
//     },
//     {
//       id: "savings",
//       label: "Savings Rate",
//       value: "52.1%",
//       icon: "◈",
//       delta: "▲ 2.8pp",
//       deltaDir: "up",
//       sub: "vs last month",
//       sparkPoints: "0,20 20,18 40,22 60,14 80,16 100,10 120,8",
//       sparkAreaPoints: "0,20 20,18 40,22 60,14 80,16 100,10 120,8 120,32 0,32",
//       sparkColor: "green",
//     },
//   ],

//   revenueChart: {
//     months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     revenueBars: [
//       { x: 68,  y: 40, h: 130 },
//       { x: 148, y: 30, h: 140 },
//       { x: 228, y: 25, h: 145 },
//       { x: 308, y: 20, h: 150 },
//       { x: 388, y: 28, h: 142 },
//       { x: 468, y: 22, h: 148 },
//     ],
//     expenseBars: [
//       { x: 100, y: 85,  h: 85  },
//       { x: 180, y: 90,  h: 80  },
//       { x: 260, y: 82,  h: 88  },
//       { x: 340, y: 80,  h: 90  },
//       { x: 420, y: 86,  h: 84  },
//       { x: 500, y: 78,  h: 92  },
//     ],
//     profitLine: "100,74 180,66 260,54 340,46 420,60 500,44",
//     profitDots: [
//       { cx: 100, cy: 74 },
//       { cx: 180, cy: 66 },
//       { cx: 260, cy: 54 },
//       { cx: 340, cy: 46 },
//       { cx: 420, cy: 60 },
//       { cx: 500, cy: 44 },
//     ],
//     xCenters: [100, 180, 260, 340, 420, 500],
//   },

//   allocation: [
//     { label: "Equities",    pct: 45, colorVar: "var(--c1)", dashArray: "141.4 172.8", dashOffset: "78.5"   },
//     { label: "Bonds",       pct: 25, colorVar: "var(--c2)", dashArray: "78.5 235.6",  dashOffset: "-62.8"  },
//     { label: "Real Estate", pct: 18, colorVar: "var(--c3)", dashArray: "56.5 257.6",  dashOffset: "-141.4" },
//     { label: "Cash",        pct: 12, colorVar: "var(--c4)", dashArray: "37.7 276.5",  dashOffset: "-197.9" },
//   ],

//   budget: [
//     { label: "🏠 Housing",      spent: 2400, total: 2500, color: "var(--red)"    },
//     { label: "🛒 Groceries",    spent: 620,  total: 900,  color: "var(--accent)" },
//     { label: "🚗 Transport",    spent: 190,  total: 400,  color: "var(--green)"  },
//     { label: "🎬 Entertainment",spent: 340,  total: 300,  color: "var(--red)"    },
//     { label: "☁ Software",      spent: 580,  total: 800,  color: "var(--accent)" },
//     { label: "🏋 Health",       spent: 120,  total: 250,  color: "var(--green)"  },
//   ],

//   transactions: [
//     { id: 1,  ico: "🏠", bg: "rgba(100,130,255,0.12)", name: "Mortgage Payment",  sub: "Chase Bank",      cat: "Housing",     acct: "Chase Bank",   date: "Apr 24", status: "ok",   amt: -2400  },
//     { id: 2,  ico: "💼", bg: "rgba(34,160,107,0.12)",  name: "Freelance Project", sub: "Stripe Inc.",     cat: "Income",      acct: "Stripe",       date: "Apr 23", status: "ok",   amt: 3500   },
//     { id: 3,  ico: "🛒", bg: "rgba(232,84,26,0.12)",   name: "Whole Foods",       sub: "Visa ···4821",    cat: "Groceries",   acct: "Visa ···4821", date: "Apr 22", status: "ok",   amt: -184   },
//     { id: 4,  ico: "◈",  bg: "rgba(196,125,26,0.12)",  name: "ETF Purchase",      sub: "Fidelity",        cat: "Investment",  acct: "Fidelity",     date: "Apr 21", status: "pend", amt: -1000  },
//     { id: 5,  ico: "☁",  bg: "rgba(160,100,255,0.12)", name: "AWS Services",      sub: "Amazon",          cat: "Software",    acct: "Visa ···4821", date: "Apr 20", status: "ok",   amt: -340   },
//     { id: 6,  ico: "✖",  bg: "rgba(209,64,64,0.12)",   name: "Wire Transfer",     sub: "Bank of America", cat: "Transfer",    acct: "Chase Bank",   date: "Apr 19", status: "fail", amt: -5000  },
//     { id: 7,  ico: "🚗", bg: "rgba(100,130,255,0.12)", name: "Shell Gas Station", sub: "Visa ···4821",    cat: "Transport",   acct: "Visa ···4821", date: "Apr 18", status: "ok",   amt: -68    },
//     { id: 8,  ico: "💼", bg: "rgba(34,160,107,0.12)",  name: "Salary — April",    sub: "Employer ACH",    cat: "Income",      acct: "Chase Bank",   date: "Apr 15", status: "ok",   amt: 9800   },
//     { id: 9,  ico: "🎬", bg: "rgba(232,84,26,0.12)",   name: "Netflix",           sub: "Visa ···4821",    cat: "Entertainment",acct: "Visa ···4821",date: "Apr 14", status: "ok",   amt: -18    },
//     { id: 10, ico: "🏋", bg: "rgba(160,100,255,0.12)", name: "Equinox",           sub: "Visa ···4821",    cat: "Health",      acct: "Visa ···4821", date: "Apr 13", status: "ok",   amt: -120   },
//   ],

//   txSummary: [
//     { label: "Total In",      value: "+$18,420", cls: "pos", sub: "12 transactions" },
//     { label: "Total Out",     value: "−$6,842",  cls: "neg", sub: "12 transactions" },
//     { label: "Net Cash Flow", value: "+$11,578", cls: "pos", sub: "This month"      },
//     { label: "Pending",       value: "$6,340",   cls: "",    sub: "2 transactions"  },
//   ],

//   assets: [
//     { id: 1, ico: "🏠", bg: "rgba(91,78,232,0.1)",   name: "Primary Residence", type: "Real Estate", val: 320000, cost: 280000, date: "2020-06-01", note: "" },
//     { id: 2, ico: "🚗", bg: "rgba(232,84,26,0.1)",   name: "Tesla Model 3",     type: "Vehicle",     val: 28000,  cost: 42000,  date: "2022-03-15", note: "" },
//     { id: 3, ico: "📈", bg: "rgba(34,160,107,0.1)",  name: "Fidelity Portfolio",type: "Investment",  val: 112000, cost: 88000,  date: "2019-01-01", note: "" },
//     { id: 4, ico: "💵", bg: "rgba(196,162,90,0.1)",  name: "High-Yield Savings",type: "Savings",     val: 14200,  cost: 14200,  date: "2023-08-01", note: "" },
//     { id: 5, ico: "₿",  bg: "rgba(196,125,26,0.1)",  name: "Bitcoin",           type: "Crypto",      val: 22400,  cost: 15000,  date: "2021-11-10", note: "" },
//     { id: 6, ico: "🏢", bg: "rgba(160,100,255,0.1)", name: "Side Business",     type: "Business",    val: 28200,  cost: 5000,   date: "2023-01-01", note: "" },
//   ],

//   assetKpis: [
//     { label: "Total Assets",      value: "$524,800", icon: "💰", delta: "▲ 4.2%",  deltaDir: "up", sub: "this year"   },
//     { label: "Total Liabilities", value: "$276,260", icon: "📋", delta: "▼ 1.8%",  deltaDir: "up", sub: "paid down"   },
//     { label: "Net Value",         value: "$248,540", icon: "⬆",  delta: "▲ 8.4%",  deltaDir: "up", sub: "vs last mo"  },
//     { label: "Asset Count",       value: "7",        icon: "◈",  delta: null,        deltaDir: null, sub: "4 categories"},
//   ],

//   assetTypeOptions: [
//     { value: "🏠", label: "🏠 Real Estate" },
//     { value: "🚗", label: "🚗 Vehicle"     },
//     { value: "📈", label: "📈 Investment"  },
//     { value: "₿",  label: "₿ Crypto"       },
//     { value: "💵", label: "💵 Cash/Savings" },
//     { value: "🏢", label: "🏢 Business"    },
//     { value: "💎", label: "💎 Other"       },
//   ],

//   goals: [
//     { id: 1, ico: "🏠", bg: "rgba(91,78,232,0.1)",  name: "House Down Payment", deadline: "Dec 2027", target: 80000, current: 32000, contrib: 1500, colorVar: "var(--accent)" },
//     { id: 2, ico: "✈",  bg: "rgba(34,160,107,0.1)", name: "Japan Trip",         deadline: "Sep 2026", target: 6000,  current: 4200,  contrib: 400,  colorVar: "var(--green)"  },
//     { id: 3, ico: "🎓", bg: "rgba(196,125,26,0.1)", name: "MBA Fund",           deadline: "Jan 2028", target: 30000, current: 8400,  contrib: 800,  colorVar: "var(--amber)"  },
//   ],

//   completedGoals: [
//     { id: 99, ico: "✅", bg: "rgba(34,160,107,0.1)", name: "Emergency Fund", deadline: "Mar 2026", target: 18000, current: 18000, contrib: 0, colorVar: "var(--green)", note: "6 month runway" },
//   ],

//   goalCategoryOptions: [
//     { value: "🏠", label: "🏠 Home"      },
//     { value: "✈",  label: "✈ Travel"    },
//     { value: "🎓", label: "🎓 Education" },
//     { value: "🚗", label: "🚗 Vehicle"   },
//     { value: "💰", label: "💰 Savings"  },
//     { value: "🏖", label: "🏖 Lifestyle" },
//     { value: "📦", label: "📦 Other"    },
//   ],

//   insights: [
//     { id: 1, tag: "⚠ Warning",   tagCls: "tag-warn",  title: "Entertainment Budget Exceeded",  body: "You've spent $340 on entertainment this month — $40 over your $300 budget with 7 days remaining. Netflix, Spotify and a concert ticket were the main drivers.", date: "Apr 24, 2026", action: "Adjust budget →"   },
//     { id: 2, tag: "💡 Opportunity",tagCls:"tag-tip",   title: "High-Yield Savings Available",   body: "You have $14,200 sitting in a 0.4% APY savings account. Moving to a HYSA could earn you an extra $710/yr at current 5.4% rates.",                             date: "Apr 22, 2026", action: "Learn more →"      },
//     { id: 3, tag: "🔴 Alert",     tagCls: "tag-alert", title: "Wire Transfer Failed",            body: "A $5,000 wire transfer on Apr 19 failed — likely due to daily limit restrictions. Check with Bank of America or retry in smaller amounts.",                    date: "Apr 19, 2026", action: "View transaction →" },
//     { id: 4, tag: "✦ Insight",   tagCls: "tag-info",  title: "On Pace for Best Savings Month",  body: "At 52.1%, this is your highest savings rate in 8 months. If you maintain this trajectory, your Emergency Fund top-up goal will be hit by June 2026.",          date: "Apr 24, 2026", action: "View goals →"      },
//     { id: 5, tag: "📊 Pattern",  tagCls: "tag-tip",   title: "Groceries Trending Up",           body: "Grocery spending has increased 12% over the last 3 months. You're at $620 with 7 days remaining — may hit $720, leaving $180 unused budget.",                  date: "Apr 23, 2026", action: "See breakdown →"   },
//     { id: 6, tag: "✦ Portfolio", tagCls: "tag-info",  title: "Rebalancing Opportunity",         body: "Equities have grown to 45% of your portfolio — up from your 40% target. Consider shifting $3,100 into bonds or real estate to rebalance.",                    date: "Apr 20, 2026", action: "View allocation →"  },
//   ],

//   aiResponses: [
//     "Based on your current spending, you'll save approximately $7,400 this month — excellent work!",
//     "Your largest expense category is Housing at 35% of income. This is within healthy range.",
//     "I notice your entertainment spending is 13% over budget. Consider setting a stricter weekly limit.",
//     "Your investment portfolio has grown 27% since purchase. The ETF strategy is performing well.",
//     "If you redirect $200/month from dining to your Japan trip goal, you'll reach it 5 months earlier.",
//     "Your emergency fund covers 6 months of expenses — that's optimal. Well done!",
//   ],

//   navItems: [
//     { id: "dashboard",    icon: "⬛", label: "Dashboard",    section: "Overview"  },
//     { id: "transactions", icon: "⇄",  label: "Transactions", section: "Finance", badge: "24" },
//     { id: "assets",       icon: "◈",  label: "Assets",       section: "Finance"  },
//     { id: "goals",        icon: "◎",  label: "Goals",        section: "Finance"  },
//     { id: "intelligence", icon: "✦",  label: "Intelligence", section: "Insights" },
//   ],
// };

// // ─────────────────────────────────────────────
// // 3. UTILITIES
// // ─────────────────────────────────────────────

// const fmt = (n) => Math.abs(n).toLocaleString();
// const fmtAmt = (n) => (n >= 0 ? `+$${fmt(n)}` : `-$${fmt(n)}`);
// const amtCls = (n) => (n > 0 ? "amt-pos" : n < 0 ? "amt-neg" : "amt-neu");

// const statusLabel = { ok: "✓ Done", pend: "⏳ Pending", fail: "✖ Failed" };

// const nextId = (arr) => Math.max(0, ...arr.map((x) => x.id)) + 1;

// // ─────────────────────────────────────────────
// // 4. PRIMITIVE UI COMPONENTS
// // ─────────────────────────────────────────────

// // ── Modal ──────────────────────────────────
// export function Modal({ open, title, onClose, children, footer }) {
//   if (!open) return null;
//   return (
//     <div className={`modal-bg${open ? " on" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div className="modal">
//         <div className="modal-hd">
//           <div className="modal-title">{title}</div>
//           <button className="modal-x" onClick={onClose}>✕</button>
//         </div>
//         <div className="modal-bd">{children}</div>
//         {footer && <div className="modal-ft">{footer}</div>}
//       </div>
//     </div>
//   );
// }

// // ── FormGroup ──────────────────────────────
// export function FormGroup({ label, children }) {
//   return (
//     <div className="f-group">
//       <label className="f-label">{label}</label>
//       {children}
//     </div>
//   );
// }

// // ── ProgressBar ────────────────────────────
// export function ProgressBar({ pct, color = "var(--accent)", height = 6 }) {
//   return (
//     <div className="prog-track" style={{ height }}>
//       <div className="prog-fill" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
//     </div>
//   );
// }

// // ── KpiCard ────────────────────────────────
// export function KpiCard({ label, value, icon, delta, deltaDir, sub, sparkPoints, sparkAreaPoints, sparkColor }) {
//   const lineClass = sparkColor === "red" ? "sp-line-r" : "sp-line-g";
//   const areaClass = sparkColor === "red" ? "sp-area-r" : "sp-area-g";
//   return (
//     <div className="kpi">
//       <div className="kpi-top">
//         <div className="kpi-label">{label}</div>
//         <div className="kpi-ico">{icon}</div>
//       </div>
//       <div className="kpi-val">{value}</div>
//       {sparkPoints && (
//         <svg className="spark" viewBox="0 0 120 32" preserveAspectRatio="none">
//           <polygon className={areaClass} points={sparkAreaPoints} />
//           <polyline className={lineClass} points={sparkPoints} />
//         </svg>
//       )}
//       <div className="kpi-foot">
//         {delta && <span className={`delta ${deltaDir}`}>{delta}</span>}
//         {sub && <span className="kpi-sub">{sub}</span>}
//       </div>
//     </div>
//   );
// }

// // ── Pill ───────────────────────────────────
// export function Pill({ status }) {
//   return <span className={`pill ${status}`}>{statusLabel[status]}</span>;
// }

// // ── SummaryRow ─────────────────────────────
// export function SummaryRow({ items }) {
//   return (
//     <div className="sum-row">
//       {items.map((item) => (
//         <div key={item.label} className="sum-cell">
//           <div className="sum-label">{item.label}</div>
//           <div className={`sum-val ${item.cls}`}>{item.value}</div>
//           {item.sub && <div className="sum-sub">{item.sub}</div>}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ── Pagination ─────────────────────────────
// export function Pagination({ page, totalPages, total, perPage, onChange }) {
//   const start = (page - 1) * perPage + 1;
//   const end = Math.min(page * perPage, total);
//   return (
//     <div className="pager">
//       <div className="pager-info">Showing {start}–{end} of {total}</div>
//       <div className="pager-btns">
//         <button className="pg" disabled={page === 1} onClick={() => onChange(page - 1)}>←</button>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//           <button key={p} className={`pg${p === page ? " on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//         ))}
//         <button className="pg" disabled={page === totalPages} onClick={() => onChange(page + 1)}>→</button>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // 5. CHART COMPONENTS
// // ─────────────────────────────────────────────

// // ── BarChart ───────────────────────────────
// export function BarChart({ data }) {
//   const { months, revenueBars, expenseBars, profitLine, profitDots, xCenters } = data;
//   return (
//     <div>
//       <div className="chart-legend">
//         <div className="legend-row"><div className="leg-dot" style={{ background: "var(--c1)" }} />Revenue</div>
//         <div className="legend-row"><div className="leg-dot" style={{ background: "var(--c2)" }} />Expenses</div>
//         <div className="legend-row"><div className="leg-dot" style={{ background: "var(--c3)" }} />Net Profit</div>
//       </div>
//       <svg className="chart" viewBox="0 0 540 210" preserveAspectRatio="xMidYMid meet">
//         {[20, 60, 100, 140, 170].map((y) => (
//           <line key={y} className="cg" x1="50" y1={y} x2="530" y2={y} />
//         ))}
//         <g className="ct">
//           {[["$20k", 24], ["$16k", 64], ["$12k", 104], ["$8k", 144], ["$4k", 174]].map(([txt, y]) => (
//             <text key={y} x="42" y={y} textAnchor="end">{txt}</text>
//           ))}
//         </g>
//         <g className="ct">
//           {months.map((m, i) => (
//             <text key={m} x={xCenters[i]} y="194" textAnchor="middle">{m}</text>
//           ))}
//         </g>
//         {revenueBars.map((b, i) => (
//           <rect key={i} className="br" x={b.x} y={b.y} width="28" height={b.h} rx="3" />
//         ))}
//         {expenseBars.map((b, i) => (
//           <rect key={i} className="be" x={b.x} y={b.y} width="28" height={b.h} rx="3" />
//         ))}
//         <polyline className="lp" points={profitLine} />
//         {profitDots.map((d, i) => (
//           <circle key={i} className="dp" cx={d.cx} cy={d.cy} r="4" />
//         ))}
//       </svg>
//     </div>
//   );
// }

// // ── DonutChart ─────────────────────────────
// export function DonutChart({ segments, centerLabel = "$248k", centerSub = "Total" }) {
//   const [hovered, setHovered] = useState(null);
//   const active = hovered !== null ? segments[hovered] : null;
//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
//       <div className="donut-wrap">
//         <svg viewBox="0 0 130 130" width="130" height="130">
//           <circle cx="65" cy="65" r="50" fill="none" stroke="var(--border)" strokeWidth="16" />
//           {segments.map((seg, i) => (
//             <circle
//               key={seg.label}
//               cx="65" cy="65" r="50"
//               fill="none"
//               stroke={seg.colorVar}
//               strokeWidth="16"
//               strokeDasharray={seg.dashArray}
//               strokeDashoffset={seg.dashOffset}
//               strokeLinecap="butt"
//               transform="rotate(-90 65 65)"
//               style={{ opacity: hovered === null || hovered === i ? 1 : 0.3, transition: "opacity 0.2s", cursor: "pointer" }}
//               onMouseEnter={() => setHovered(i)}
//               onMouseLeave={() => setHovered(null)}
//             />
//           ))}
//         </svg>
//         <div className="donut-center">
//           <div className="donut-val">{active ? `${active.pct}%` : centerLabel}</div>
//           <div className="donut-lbl">{active ? active.label : centerSub}</div>
//         </div>
//       </div>
//       <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
//         {segments.map((seg, i) => (
//           <div
//             key={seg.label}
//             style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: hovered === null || hovered === i ? 1 : 0.4, transition: "opacity 0.2s", cursor: "default" }}
//             onMouseEnter={() => setHovered(i)}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <div className="legend-row">
//               <div className="leg-dot" style={{ background: seg.colorVar }} />
//               {seg.label}
//             </div>
//             <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--fn-m)", color: "var(--text-1)" }}>{seg.pct}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // 6. PAGE COMPONENTS
// // ─────────────────────────────────────────────

// // ── Dashboard ──────────────────────────────
// export function DashboardPage({ data, onNavigate }) {
//   const { kpis, revenueChart, allocation, budget, transactions } = data;
//   const recentTx = transactions.slice(0, 5);

//   return (
//     <>
//       {/* KPI row */}
//       <div className="g4">
//         {kpis.map((k) => <KpiCard key={k.id} {...k} />)}
//       </div>

//       {/* Chart + Donut */}
//       <div className="g-main">
//         <div className="card">
//           <div className="card-hd">
//             <div>
//               <div className="card-title">Revenue vs Expenses</div>
//               <div className="card-sub">Jan – Jun 2026 · Monthly</div>
//             </div>
//             <button className="card-act">Export ↗</button>
//           </div>
//           <div className="card-bd">
//             <BarChart data={revenueChart} />
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-hd">
//             <div>
//               <div className="card-title">Allocation</div>
//               <div className="card-sub">Portfolio breakdown</div>
//             </div>
//           </div>
//           <div className="card-bd">
//             <DonutChart segments={allocation} />
//           </div>
//         </div>
//       </div>

//       {/* Recent Tx + Budget */}
//       <div className="g-main">
//         <div className="card">
//           <div className="card-hd">
//             <div>
//               <div className="card-title">Recent Transactions</div>
//               <div className="card-sub">Last 7 days</div>
//             </div>
//             <button className="card-act" onClick={() => onNavigate("transactions")}>View all →</button>
//           </div>
//           <div className="tbl-wrap">
//             <table>
//               <thead>
//                 <tr>
//                   <th></th>
//                   <th>Merchant</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                   <th style={{ textAlign: "right" }}>Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentTx.map((t) => (
//                   <tr key={t.id}>
//                     <td><div className="tx-ico" style={{ background: t.bg }}>{t.ico}</div></td>
//                     <td>
//                       <div className="tx-name">{t.name}</div>
//                       <div className="tx-sub">{t.sub}</div>
//                     </td>
//                     <td style={{ color: "var(--text-2)", fontSize: 12, fontFamily: "var(--fn-m)" }}>{t.date}</td>
//                     <td><Pill status={t.status} /></td>
//                     <td style={{ textAlign: "right" }}>
//                       <span className={amtCls(t.amt)}>{fmtAmt(t.amt)}</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-hd">
//             <div>
//               <div className="card-title">Budget Tracker</div>
//               <div className="card-sub">April 2026 · 7 days left</div>
//             </div>
//           </div>
//           <div className="card-bd">
//             <div className="spend-bar">
//               {budget.map((b) => (
//                 <div key={b.label} className="spend-item">
//                   <div className="spend-row">
//                     <span className="spend-label">{b.label}</span>
//                     <span className="spend-val">${b.spent.toLocaleString()} / ${b.total.toLocaleString()}</span>
//                   </div>
//                   <ProgressBar pct={(b.spent / b.total) * 100} color={b.color} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // ── Transactions ───────────────────────────
// export function TransactionsPage({ transactions: initTxns, txSummary }) {
//   const [txns, setTxns] = useState(initTxns);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [cat, setCat] = useState("All Categories");
//   const [acct, setAcct] = useState("All Accounts");
//   const [page, setPage] = useState(1);
//   const [modalOpen, setModalOpen] = useState(false);
//   const PER_PAGE = 10;

//   // Form state
//   const [form, setForm] = useState({ name: "", amt: "", type: "Expense", cat: "Groceries", date: "2026-04-24", acct: "Visa ···4821", note: "" });
//   const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const FILTERS = ["All", "Income", "Expenses", "Investments", "Pending"];
//   const CATS = ["All Categories", "Income", "Housing", "Groceries", "Transport", "Software", "Investment", "Entertainment", "Health", "Transfer"];
//   const ACCTS = ["All Accounts", "Visa ···4821", "Chase Bank", "Fidelity", "Stripe"];

//   const filtered = txns.filter((t) => {
//     const q = search.toLowerCase();
//     if (q && !t.name.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q)) return false;
//     if (cat !== "All Categories" && t.cat !== cat) return false;
//     if (acct !== "All Accounts" && t.acct !== acct) return false;
//     if (filter === "Income" && t.amt <= 0) return false;
//     if (filter === "Expenses" && t.amt >= 0) return false;
//     if (filter === "Investments" && t.cat !== "Investment") return false;
//     if (filter === "Pending" && t.status !== "pend") return false;
//     return true;
//   });

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
//   const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   const addTx = () => {
//     const amount = parseFloat(form.amt) || 0;
//     const signedAmt = form.type === "Income" ? Math.abs(amount) : -Math.abs(amount);
//     const icons = { Groceries: "🛒", Housing: "🏠", Transport: "🚗", Entertainment: "🎬", Software: "☁", Health: "🏋", Income: "💼", Investment: "◈", Transfer: "⇄", Other: "💳" };
//     setTxns((prev) => [
//       { id: nextId(prev), ico: icons[form.cat] || "💳", bg: "rgba(91,78,232,0.08)", name: form.name || "New Transaction", sub: form.acct, cat: form.cat, acct: form.acct, date: form.date, status: "ok", amt: signedAmt },
//       ...prev,
//     ]);
//     setModalOpen(false);
//     setForm({ name: "", amt: "", type: "Expense", cat: "Groceries", date: "2026-04-24", acct: "Visa ···4821", note: "" });
//   };

//   return (
//     <>
//       <SummaryRow items={txSummary} />

//       <div className="card">
//         <div className="card-hd">
//           <div>
//             <div className="card-title">All Transactions</div>
//             <div className="card-sub">April 2026 · {txns.length} entries</div>
//           </div>
//           <div style={{ display: "flex", gap: 8 }}>
//             <button className="card-act">Export CSV ↗</button>
//             <button className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>+ Add</button>
//           </div>
//         </div>

//         {/* Toolbar */}
//         <div className="toolbar">
//           <div className="tb-search">
//             <span style={{ color: "var(--text-3)" }}>⌕</span>
//             <input type="text" placeholder="Search merchant, category…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
//           </div>
//           <select className="tb-sel" value={cat} onChange={(e) => { setCat(e.target.value); setPage(1); }}>
//             {CATS.map((c) => <option key={c}>{c}</option>)}
//           </select>
//           <select className="tb-sel" value={acct} onChange={(e) => { setAcct(e.target.value); setPage(1); }}>
//             {ACCTS.map((a) => <option key={a}>{a}</option>)}
//           </select>
//         </div>
//         <div className="filter-row">
//           {FILTERS.map((f) => (
//             <button key={f} className={`f-chip${filter === f ? " on" : ""}`} onClick={() => { setFilter(f); setPage(1); }}>{f}</button>
//           ))}
//         </div>

//         {/* Table */}
//         <div className="tbl-wrap">
//           <table style={{ minWidth: 600 }}>
//             <thead>
//               <tr>
//                 <th style={{ width: 44 }}></th>
//                 <th className="sort">Merchant</th>
//                 <th className="sort">Category</th>
//                 <th className="sort">Account</th>
//                 <th className="sort">Date</th>
//                 <th>Status</th>
//                 <th className="sort" style={{ textAlign: "right" }}>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paged.map((t) => (
//                 <tr key={t.id}>
//                   <td style={{ paddingLeft: 20 }}><div className="tx-ico" style={{ background: t.bg }}>{t.ico}</div></td>
//                   <td>
//                     <div className="tx-name">{t.name}</div>
//                     <div className="tx-sub">{t.sub}</div>
//                   </td>
//                   <td><span className="cat-chip">{t.cat}</span></td>
//                   <td style={{ color: "var(--text-2)", fontSize: 12 }}>{t.acct}</td>
//                   <td style={{ color: "var(--text-2)", fontSize: 12, fontFamily: "var(--fn-m)" }}>{t.date}</td>
//                   <td><Pill status={t.status} /></td>
//                   <td style={{ textAlign: "right" }}>
//                     <span className={amtCls(t.amt)}>{fmtAmt(t.amt)}</span>
//                   </td>
//                 </tr>
//               ))}
//               {paged.length === 0 && (
//                 <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-3)", padding: 32 }}>No transactions match your filters.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
//       </div>

//       {/* Add Transaction Modal */}
//       <Modal open={modalOpen} title="Add Transaction" onClose={() => setModalOpen(false)}
//         footer={<>
//           <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
//           <button className="btn btn-primary" onClick={addTx}>Save Transaction</button>
//         </>}
//       >
//         <div className="f-row">
//           <FormGroup label="Merchant"><input className="f-input" type="text" placeholder="e.g. Whole Foods" value={form.name} onChange={(e) => setF("name", e.target.value)} /></FormGroup>
//           <FormGroup label="Amount ($)"><input className="f-input" type="number" placeholder="0.00" value={form.amt} onChange={(e) => setF("amt", e.target.value)} /></FormGroup>
//         </div>
//         <div className="f-row">
//           <FormGroup label="Type">
//             <select className="f-select" value={form.type} onChange={(e) => setF("type", e.target.value)}>
//               {["Expense", "Income", "Transfer", "Investment"].map((o) => <option key={o}>{o}</option>)}
//             </select>
//           </FormGroup>
//           <FormGroup label="Category">
//             <select className="f-select" value={form.cat} onChange={(e) => setF("cat", e.target.value)}>
//               {["Groceries", "Housing", "Transport", "Entertainment", "Software", "Health", "Income", "Investment", "Transfer", "Other"].map((o) => <option key={o}>{o}</option>)}
//             </select>
//           </FormGroup>
//         </div>
//         <div className="f-row">
//           <FormGroup label="Date"><input className="f-input" type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} /></FormGroup>
//           <FormGroup label="Account">
//             <select className="f-select" value={form.acct} onChange={(e) => setF("acct", e.target.value)}>
//               {["Visa ···4821", "Chase Bank", "Fidelity", "Stripe"].map((o) => <option key={o}>{o}</option>)}
//             </select>
//           </FormGroup>
//         </div>
//         <FormGroup label="Notes"><input className="f-input" type="text" placeholder="Optional note…" value={form.note} onChange={(e) => setF("note", e.target.value)} /></FormGroup>
//       </Modal>
//     </>
//   );
// }

// // ── Assets ─────────────────────────────────
// export function AssetsPage({ assets: initAssets, assetKpis, assetTypeOptions }) {
//   const [assets, setAssets] = useState(initAssets);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [form, setForm] = useState({ name: "", type: "🏠", typeLabel: "Real Estate", val: "", cost: "", date: "2024-01-01", note: "" });
//   const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const totalAssets = assets.reduce((s, a) => s + a.val, 0);
//   const netValue = assets.reduce((s, a) => s + (a.val - a.cost), 0);

//   const addAsset = () => {
//     if (!form.name.trim()) return;
//     setAssets((prev) => [...prev, {
//       id: nextId(prev),
//       ico: form.type,
//       bg: "rgba(91,78,232,0.08)",
//       name: form.name,
//       type: form.typeLabel,
//       val: parseFloat(form.val) || 0,
//       cost: parseFloat(form.cost) || parseFloat(form.val) || 0,
//       date: form.date,
//       note: form.note,
//     }]);
//     setModalOpen(false);
//     setForm({ name: "", type: "🏠", typeLabel: "Real Estate", val: "", cost: "", date: "2024-01-01", note: "" });
//   };

//   const removeAsset = (id) => setAssets((prev) => prev.filter((a) => a.id !== id));

//   return (
//     <>
//       <div className="g4">
//         {assetKpis.map((k) => <KpiCard key={k.label} {...k} sparkPoints={null} sparkAreaPoints={null} />)}
//       </div>

//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div>
//           <div style={{ fontFamily: "var(--fn-d)", fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>My Assets</div>
//           <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{assets.length} assets · Net gain ${netValue >= 0 ? "+" : ""}{netValue.toLocaleString()}</div>
//         </div>
//         <button className="btn btn-primary" onClick={() => setModalOpen(true)}>+ Add Asset</button>
//       </div>

//       <div className="asset-grid">
//         {assets.map((a) => {
//           const gain = a.val - a.cost;
//           const gainPct = a.cost > 0 ? ((gain / a.cost) * 100).toFixed(1) : "0.0";
//           const gainCls = gain >= 0 ? "amt-pos" : "amt-neg";
//           const gainStr = gain >= 0 ? `+$${gain.toLocaleString()} (${gainPct}%)` : `-$${Math.abs(gain).toLocaleString()} (${gainPct}%)`;
//           return (
//             <div key={a.id} className="asset-card">
//               <div className="asset-top">
//                 <div className="asset-icon" style={{ background: a.bg }}>{a.ico}</div>
//                 <div style={{ flex: 1 }}>
//                   <div className="asset-name">{a.name}</div>
//                   <div className="asset-type">{a.type}</div>
//                 </div>
//                 <button style={{ border: "none", background: "none", color: "var(--text-3)", fontSize: 18, cursor: "pointer", lineHeight: 1 }} onClick={() => removeAsset(a.id)}>×</button>
//               </div>
//               <div>
//                 <div className="asset-val">${a.val.toLocaleString()}</div>
//                 <div className="asset-change"><span className={gainCls} style={{ fontSize: 12, fontFamily: "var(--fn-m)" }}>{gainStr}</span></div>
//               </div>
//               <div className="asset-foot">
//                 <span className="asset-meta">Since {a.date.slice(0, 4)}</span>
//                 <span className="cat-chip">{a.type}</span>
//               </div>
//             </div>
//           );
//         })}
//         <div className="asset-add" onClick={() => setModalOpen(true)}>
//           <div className="asset-add-icon">+</div>
//           <div className="asset-add-label">Add new asset</div>
//         </div>
//       </div>

//       <Modal open={modalOpen} title="Add Asset" onClose={() => setModalOpen(false)}
//         footer={<>
//           <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
//           <button className="btn btn-primary" onClick={addAsset}>Add Asset</button>
//         </>}
//       >
//         <FormGroup label="Asset Name"><input className="f-input" type="text" placeholder="e.g. Primary Residence, Tesla…" value={form.name} onChange={(e) => setF("name", e.target.value)} /></FormGroup>
//         <div className="f-row">
//           <FormGroup label="Type">
//             <select className="f-select" value={form.type} onChange={(e) => {
//               const opt = assetTypeOptions.find((o) => o.value === e.target.value);
//               setForm((f) => ({ ...f, type: e.target.value, typeLabel: opt ? opt.label.split(" ").slice(1).join(" ") : "" }));
//             }}>
//               {assetTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
//             </select>
//           </FormGroup>
//           <FormGroup label="Current Value ($)"><input className="f-input" type="number" placeholder="0" value={form.val} onChange={(e) => setF("val", e.target.value)} /></FormGroup>
//         </div>
//         <div className="f-row">
//           <FormGroup label="Purchase Price ($)"><input className="f-input" type="number" placeholder="0" value={form.cost} onChange={(e) => setF("cost", e.target.value)} /></FormGroup>
//           <FormGroup label="Purchase Date"><input className="f-input" type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} /></FormGroup>
//         </div>
//         <FormGroup label="Notes"><input className="f-input" type="text" placeholder="Any additional notes…" value={form.note} onChange={(e) => setF("note", e.target.value)} /></FormGroup>
//       </Modal>
//     </>
//   );
// }

// // ── Goals ──────────────────────────────────
// export function GoalsPage({ goals: initGoals, completedGoals, goalCategoryOptions }) {
//   const [goals, setGoals] = useState(initGoals);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [form, setForm] = useState({ name: "", target: "", current: "", contrib: "", cat: "🏠", date: "2027-01-01" });
//   const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

//   const addGoal = () => {
//     if (!form.name.trim()) return;
//     const deadline = new Date(form.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
//     setGoals((prev) => [...prev, {
//       id: nextId(prev),
//       ico: form.cat,
//       bg: "rgba(91,78,232,0.08)",
//       name: form.name,
//       deadline,
//       target: parseFloat(form.target) || 0,
//       current: parseFloat(form.current) || 0,
//       contrib: parseFloat(form.contrib) || 0,
//       colorVar: "var(--accent)",
//     }]);
//     setModalOpen(false);
//     setForm({ name: "", target: "", current: "", contrib: "", cat: "🏠", date: "2027-01-01" });
//   };

//   const removeGoal = (id) => setGoals((prev) => prev.filter((g) => g.id !== id));

//   const GoalCard = ({ goal, completed = false }) => {
//     const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
//     const remaining = goal.target - goal.current;
//     const months = goal.contrib > 0 ? Math.ceil(remaining / goal.contrib) : "—";
//     return (
//       <div className="goal-card" style={{ opacity: completed ? 0.6 : 1 }}>
//         <div className="goal-top">
//           <div className="goal-info">
//             <div className="goal-icon" style={{ background: goal.bg }}>{goal.ico}</div>
//             <div>
//               <div className="goal-name">{goal.name}</div>
//               <div className="goal-deadline">
//                 {completed ? `Completed ${goal.deadline}` : `Target: ${goal.deadline} · ~${months} months at $${goal.contrib.toLocaleString()}/mo`}
//               </div>
//             </div>
//           </div>
//           {completed
//             ? <span className="pill ok">Achieved</span>
//             : <button style={{ border: "none", background: "none", color: "var(--text-3)", fontSize: 18, cursor: "pointer" }} onClick={() => removeGoal(goal.id)}>×</button>
//           }
//         </div>
//         <div className="goal-amounts">
//           <div className="goal-current">${goal.current.toLocaleString()}</div>
//           <div className="goal-target">of ${goal.target.toLocaleString()}</div>
//         </div>
//         <ProgressBar pct={pct} color={goal.colorVar} height={8} />
//         <div className="goal-foot">
//           <span className="goal-rate">
//             {completed ? (goal.note || "Goal complete!") : `$${remaining.toLocaleString()} remaining`}
//           </span>
//           <span className="goal-pct" style={{ color: goal.colorVar }}>{pct}%</span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div>
//           <div style={{ fontFamily: "var(--fn-d)", fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>Financial Goals</div>
//           <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{goals.length} active · {completedGoals.length} completed</div>
//         </div>
//         <button className="btn btn-primary" onClick={() => setModalOpen(true)}>+ New Goal</button>
//       </div>

//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         {goals.map((g) => <GoalCard key={g.id} goal={g} />)}
//         {goals.length === 0 && (
//           <div style={{ textAlign: "center", padding: 40, color: "var(--text-3)", fontSize: 14 }}>
//             No active goals. Create one to get started!
//           </div>
//         )}
//       </div>

//       {completedGoals.length > 0 && (
//         <div style={{ marginTop: 8 }}>
//           <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-2)", marginBottom: 12 }}>Completed</div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//             {completedGoals.map((g) => <GoalCard key={g.id} goal={g} completed />)}
//           </div>
//         </div>
//       )}

//       <Modal open={modalOpen} title="Create Goal" onClose={() => setModalOpen(false)}
//         footer={<>
//           <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
//           <button className="btn btn-primary" onClick={addGoal}>Create Goal</button>
//         </>}
//       >
//         <FormGroup label="Goal Name"><input className="f-input" type="text" placeholder="e.g. Down Payment, Japan Trip…" value={form.name} onChange={(e) => setF("name", e.target.value)} /></FormGroup>
//         <div className="f-row">
//           <FormGroup label="Target Amount ($)"><input className="f-input" type="number" placeholder="0" value={form.target} onChange={(e) => setF("target", e.target.value)} /></FormGroup>
//           <FormGroup label="Already Saved ($)"><input className="f-input" type="number" placeholder="0" value={form.current} onChange={(e) => setF("current", e.target.value)} /></FormGroup>
//         </div>
//         <div className="f-row">
//           <FormGroup label="Category">
//             <select className="f-select" value={form.cat} onChange={(e) => setF("cat", e.target.value)}>
//               {goalCategoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
//             </select>
//           </FormGroup>
//           <FormGroup label="Target Date"><input className="f-input" type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} /></FormGroup>
//         </div>
//         <FormGroup label="Monthly Contribution ($)"><input className="f-input" type="number" placeholder="e.g. 500" value={form.contrib} onChange={(e) => setF("contrib", e.target.value)} /></FormGroup>
//       </Modal>
//     </>
//   );
// }

// // ── Intelligence ───────────────────────────
// export function IntelligencePage({ insights, aiResponses }) {
//   const [messages, setMessages] = useState([
//     { id: 1, role: "ai", text: "Hi Alex! Based on your April data, you're on track to save <strong>$7,438</strong> this month — that's 52.1% of income. Your biggest opportunity: entertainment spending is 13% over budget. Want me to suggest adjustments?" },
//     { id: 2, role: "ai", text: "📈 Your ETF purchase from Apr 21 is still pending. Markets are up 1.4% since then — worth confirming it went through." },
//   ]);
//   const [input, setInput] = useState("");
//   const [rIdx, setRIdx] = useState(0);
//   const msgsRef = useRef(null);

//   const sendChat = () => {
//     const msg = input.trim();
//     if (!msg) return;
//     const userMsg = { id: Date.now(), role: "user", text: msg };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: aiResponses[rIdx % aiResponses.length] }]);
//       setRIdx((r) => r + 1);
//     }, 600);
//   };

//   useEffect(() => {
//     if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
//   }, [messages]);

//   return (
//     <>
//       {/* AI Chat card */}
//       <div className="card">
//         <div className="card-hd">
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <div style={{ width: 36, height: 36, borderRadius: "var(--r-sm)", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>✦</div>
//             <div>
//               <div className="card-title">Finsight AI</div>
//               <div className="card-sub">Your personal financial intelligence</div>
//             </div>
//           </div>
//           <div className="ai-status"><div className="ai-dot" />Online</div>
//         </div>
//         <div className="ai-chat">
//           <div className="chat-msgs" ref={msgsRef}>
//             {messages.map((m) => (
//               <div key={m.id} className={`msg msg-${m.role}`}>
//                 <div className="msg-avatar">{m.role === "ai" ? "AI" : "AK"}</div>
//                 <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: m.text }} />
//               </div>
//             ))}
//           </div>
//           <div className="chat-input">
//             <input
//               className="f-input"
//               type="text"
//               placeholder="Ask about your finances…"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendChat()}
//             />
//             <button className="btn btn-primary" onClick={sendChat}>Send</button>
//           </div>
//         </div>
//       </div>

//       {/* Insights grid */}
//       <div style={{ fontFamily: "var(--fn-d)", fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>Insights & Alerts</div>
//       <div className="intel-grid">
//         {insights.map((ins) => (
//           <div key={ins.id} className="insight-card">
//             <span className={`insight-tag ${ins.tagCls}`}>{ins.tag}</span>
//             <div className="insight-title">{ins.title}</div>
//             <div className="insight-body">{ins.body}</div>
//             <div className="insight-foot">
//               <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--fn-m)" }}>{ins.date}</span>
//               <button className="insight-action">{ins.action}</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// // ─────────────────────────────────────────────
// // 7. LAYOUT COMPONENTS
// // ─────────────────────────────────────────────

// // ── Sidebar ────────────────────────────────
// export function Sidebar({ navItems, activePage, onNavigate, user, isOpen, onClose }) {
//   const sections = [...new Set(navItems.map((n) => n.section))];
//   return (
//     <>
//       <div className={`sb-backdrop${isOpen ? " on" : ""}`} onClick={onClose} />
//       <aside className={`sidebar${isOpen ? " on" : ""}`}>
//         <div className="sb-logo">
//           <div className="sb-mark">F</div>
//           <div className="sb-name">Finsight</div>
//         </div>
//         <nav className="sb-nav">
//           {sections.map((section) => (
//             <div key={section}>
//               <div className="sb-section">{section}</div>
//               {navItems.filter((n) => n.section === section).map((item) => (
//                 <div
//                   key={item.id}
//                   className={`sb-item${activePage === item.id ? " active" : ""}`}
//                   onClick={() => { onNavigate(item.id); onClose(); }}
//                 >
//                   <div className="sb-active-bar" />
//                   <span className="sb-item-icon">{item.icon}</span>
//                   {item.label}
//                   {item.badge && <span className="sb-badge">{item.badge}</span>}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </nav>
//         <div className="sb-foot">
//           <div className="sb-user">
//             <div className="sb-avatar">{user.initials}</div>
//             <div>
//               <div className="sb-uname">{user.name}</div>
//               <div className="sb-urole">{user.plan}</div>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// // ── Topbar ─────────────────────────────────
// export function Topbar({ title, theme, onThemeChange, onHamburger }) {
//   const THEMES = ["light", "dark", "retro", "retrofuture", "aero"];
//   const LABELS = { light: "Light", dark: "Dark", retro: "Retro", retrofuture: "Retro-Fi", aero: "Aero" };
//   return (
//     <header className="topbar">
//       <button className="tb-hamburger" onClick={onHamburger}>
//         <span /><span /><span />
//       </button>
//       <div className="tb-title">{title}</div>
//       <div className="tb-right">
//         <div className="theme-sw">
//           {THEMES.map((t) => (
//             <button key={t} className={`t-btn${theme === t ? " on" : ""}`} onClick={() => onThemeChange(t)}>
//               {LABELS[t]}
//             </button>
//           ))}
//         </div>
//         <div className="tb-icon" title="Cycle theme" onClick={() => onThemeChange(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length])}>◑</div>
//         <div className="tb-icon">🔔</div>
//       </div>
//     </header>
//   );
// }

// // ── BottomNav ──────────────────────────────
// export function BottomNav({ navItems, activePage, onNavigate }) {
//   return (
//     <nav className="bot-nav">
//       {navItems.map((item) => (
//         <button key={item.id} className={`bn-item${activePage === item.id ? " on" : ""}`} onClick={() => onNavigate(item.id)}>
//           <span className="bn-ico">{item.icon}</span>
//           {item.label.length > 6 ? item.label.slice(0, 5) + "…" : item.label}
//         </button>
//       ))}
//     </nav>
//   );
// }

// // ─────────────────────────────────────────────
// // LoginPage
// // ─────────────────────────────────────────────
// export function LoginPage({ onLogin, theme, onThemeChange }) {
//   const [tab, setTab]         = useState("login"); // "login" | "signup"
//   const [email, setEmail]     = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName]       = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError]     = useState("");
//   const [loading, setLoading] = useState(false);

//   const THEMES = ["light", "dark", "retro", "retrofuture", "aero"];
//   const LABELS = { light: "Light", dark: "Dark", retro: "Retro", retrofuture: "Retro-Fi", aero: "Aero" };

//   const DEMO = { email: "alex@finsight.app", password: "password" };

//   const submit = () => {
//     setError("");
//     if (!email || !password) { setError("Please fill in all fields."); return; }
//     if (tab === "signup" && !name) { setError("Please enter your name."); return; }
//     setLoading(true);
//     setTimeout(() => {
//       if (tab === "login") {
//         if (email === DEMO.email && password === DEMO.password) {
//           onLogin();
//         } else {
//           setError("Invalid email or password. Try alex@finsight.app / password");
//           setLoading(false);
//         }
//       } else {
//         // signup always succeeds in demo
//         onLogin();
//       }
//     }, 900);
//   };

//   return (
//     <div className="auth-shell">
//       {/* Theme picker top-right */}
//       <div style={{ position: "fixed", top: 16, right: 16, zIndex: 600 }}>
//         <div className="theme-sw">
//           {THEMES.map((t) => (
//             <button key={t} className={`t-btn${theme === t ? " on" : ""}`} onClick={() => onThemeChange(t)}>
//               {LABELS[t]}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="login-card">
//         {/* Logo */}
//         <div className="login-logo">
//           <div className="login-mark">F</div>
//           <div className="login-brand">Finsight</div>
//         </div>
//         <div className="login-tagline">Your intelligent financial dashboard</div>

//         {/* Tab toggle */}
//         <div className="theme-sw" style={{ alignSelf: "stretch" }}>
//           <button className={`t-btn${tab === "login" ? " on" : ""}`} style={{ flex: 1 }} onClick={() => { setTab("login"); setError(""); }}>Sign In</button>
//           <button className={`t-btn${tab === "signup" ? " on" : ""}`} style={{ flex: 1 }} onClick={() => { setTab("signup"); setError(""); }}>Sign Up</button>
//         </div>

//         {/* Error */}
//         {error && <div className="login-err">⚠ {error}</div>}

//         {/* Form */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           {tab === "signup" && (
//             <FormGroup label="Full Name">
//               <input className="f-input" type="text" placeholder="Alex Kim" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
//             </FormGroup>
//           )}
//           <FormGroup label="Email">
//             <input className="f-input" type="email" placeholder="alex@finsight.app" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
//           </FormGroup>
//           <FormGroup label="Password">
//             <div style={{ position: "relative" }}>
//               <input
//                 className="f-input"
//                 type={showPass ? "text" : "password"}
//                 placeholder={tab === "login" ? "••••••••" : "Min. 8 characters"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && submit()}
//                 style={{ paddingRight: 40 }}
//               />
//               <button
//                 onClick={() => setShowPass((s) => !s)}
//                 style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", fontSize: 14 }}
//               >{showPass ? "🙈" : "👁"}</button>
//             </div>
//           </FormGroup>
//           {tab === "login" && (
//             <div style={{ textAlign: "right", marginTop: -4 }}>
//               <a style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer" }}>Forgot password?</a>
//             </div>
//           )}
//         </div>

//         <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "11px 0", fontSize: 14 }} onClick={submit} disabled={loading}>
//           {loading ? "Please wait…" : tab === "login" ? "Sign In →" : "Create Account →"}
//         </button>

//         {/* Demo hint */}
//         {tab === "login" && (
//           <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-3)", marginTop: -8 }}>
//             Demo: <span style={{ fontFamily: "var(--fn-m)", color: "var(--text-2)" }}>alex@finsight.app</span> / <span style={{ fontFamily: "var(--fn-m)", color: "var(--text-2)" }}>password</span>
//           </div>
//         )}

//         <div className="login-divider">or continue with</div>

//         <div className="login-social">
//           <button className="social-btn">
//             <span style={{ fontSize: 16 }}>G</span> Google
//           </button>
//           <button className="social-btn">
//             <span style={{ fontSize: 16 }}>⌘</span> Apple
//           </button>
//         </div>

//         <div className="login-footer">
//           {tab === "login"
//             ? <>Don't have an account? <a onClick={() => { setTab("signup"); setError(""); }}>Sign up free</a></>
//             : <>Already have an account? <a onClick={() => { setTab("login"); setError(""); }}>Sign in</a></>
//           }
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // NotFoundPage
// // ─────────────────────────────────────────────
// export function NotFoundPage({ onNavigate, theme, onThemeChange }) {
//   const THEMES = ["light", "dark", "retro", "retrofuture", "aero"];
//   const LABELS = { light: "Light", dark: "Dark", retro: "Retro", retrofuture: "Retro-Fi", aero: "Aero" };

//   const quickLinks = [
//     { icon: "⬛", label: "Dashboard",    id: "dashboard"    },
//     { icon: "⇄",  label: "Transactions", id: "transactions" },
//     { icon: "◈",  label: "Assets",       id: "assets"       },
//     { icon: "◎",  label: "Goals",        id: "goals"        },
//     { icon: "✦",  label: "Intelligence", id: "intelligence" },
//   ];

//   return (
//     <div className="e404-shell">
//       {/* Theme picker */}
//       <div style={{ position: "fixed", top: 16, right: 16, zIndex: 600 }}>
//         <div className="theme-sw">
//           {THEMES.map((t) => (
//             <button key={t} className={`t-btn${theme === t ? " on" : ""}`} onClick={() => onThemeChange(t)}>
//               {LABELS[t]}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="e404-code">
//         <span className="e404-glitch" data-text="404">404</span>
//       </div>

//       <div className="e404-title">Page not found</div>
//       <div className="e404-sub">
//         The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
//       </div>

//       <div className="e404-actions">
//         <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>
//           ← Back to Dashboard
//         </button>
//         <button className="btn btn-ghost" onClick={() => onNavigate("login")}>
//           Sign out
//         </button>
//       </div>

//       <div className="e404-card">
//         <div className="e404-nav-title">Quick navigation</div>
//         <div className="e404-nav-links">
//           {quickLinks.map((l) => (
//             <div key={l.id} className="e404-nav-link" onClick={() => onNavigate(l.id)}>
//               <span className="e404-nav-link-icon">{l.icon}</span>
//               {l.label}
//               <span style={{ marginLeft: "auto", color: "var(--text-3)", fontSize: 12 }}>→</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // 8. APP ROOT
// // ─────────────────────────────────────────────

// export default function App() {
//   // "login" | "dashboard" | "transactions" | "assets" | "goals" | "intelligence" | "404"
//   const [route, setRoute]         = useState("login");
//   const [theme, setTheme]         = useState("light");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const data = INITIAL_DATA;

//   // Apply theme to <html>
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   const APP_PAGES = ["dashboard", "transactions", "assets", "goals", "intelligence"];

//   const navigate = useCallback((page) => {
//     if (page === "login") {
//       setIsAuthenticated(false);
//       setRoute("login");
//       return;
//     }
//     if (APP_PAGES.includes(page)) {
//       setRoute(page);
//       setSidebarOpen(false);
//       return;
//     }
//     // Unknown route → 404
//     setRoute("404");
//     setSidebarOpen(false);
//   }, []);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     setRoute("dashboard");
//   };

//   const PAGE_TITLES = {
//     dashboard:    "Dashboard",
//     transactions: "Transactions",
//     assets:       "Assets",
//     goals:        "Goals",
//     intelligence: "Intelligence",
//   };

//   // ── Login ─────────────────────────────────
//   if (!isAuthenticated || route === "login") {
//     return (
//       <LoginPage
//         onLogin={handleLogin}
//         theme={theme}
//         onThemeChange={setTheme}
//       />
//     );
//   }

//   // ── 404 ───────────────────────────────────
//   if (route === "404") {
//     return (
//       <NotFoundPage
//         onNavigate={navigate}
//         theme={theme}
//         onThemeChange={setTheme}
//       />
//     );
//   }

//   // ── Main App ──────────────────────────────
//   return (
//     <>
//       <Sidebar
//         navItems={data.navItems}
//         activePage={route}
//         onNavigate={navigate}
//         user={data.user}
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       <div className="shell">
//         <Topbar
//           title={PAGE_TITLES[route] || "Finsight"}
//           theme={theme}
//           onThemeChange={setTheme}
//           onHamburger={() => setSidebarOpen(true)}
//         />

//         <div className="pages">
//           <div className={`page${route === "dashboard"    ? " on" : ""}`}><DashboardPage     data={data} onNavigate={navigate} /></div>
//           <div className={`page${route === "transactions" ? " on" : ""}`}><TransactionsPage  transactions={data.transactions} txSummary={data.txSummary} /></div>
//           <div className={`page${route === "assets"       ? " on" : ""}`}><AssetsPage        assets={data.assets} assetKpis={data.assetKpis} assetTypeOptions={data.assetTypeOptions} /></div>
//           <div className={`page${route === "goals"        ? " on" : ""}`}><GoalsPage         goals={data.goals} completedGoals={data.completedGoals} goalCategoryOptions={data.goalCategoryOptions} /></div>
//           <div className={`page${route === "intelligence" ? " on" : ""}`}><IntelligencePage  insights={data.insights} aiResponses={data.aiResponses} /></div>
//         </div>

//         <BottomNav
//           navItems={data.navItems}
//           activePage={route}
//           onNavigate={navigate}
//         />
//       </div>
//     </>
//   );
// }