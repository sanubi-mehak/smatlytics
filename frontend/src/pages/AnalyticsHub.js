import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./analytics-hub.css"; // Add this import

function AnalyticsHub() {
  const [query, setQuery] = useState("");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // 🔐 Protect route
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const modules = [
    {
      title: "Dataset Generator",
      desc: "Practice with sample datasets",
      path: "/dashboard",
      featured: true,
      icon: "📦",
      stats: { items: 12, views: "1.2k", lastRun: "2h" },
    },
    {
      title: "Raw Data Cleaning",
      desc: "Upload CSV/Excel and clean data",
      path: "/data-clean",
      icon: "📤",
      stats: { items: 5, views: "860", lastRun: "1d" },
    },
    {
      title: "Auto Dashboard Generator",
      desc: "AI-powered dashboard creation",
      path: "/auto-dashboard",
      icon: "📈",
      stats: { items: 22, views: "2.3k", lastRun: "30m" },
    },
    {
      title: "Manually Create Dashboards",
      desc: "Spot unusual patterns automatically",
      path: "/manual-dashboard",
      icon: "🔍",
      stats: { items: 3, views: "210", lastRun: "3h" },
    },
    {
  title: "AI Insights",
  desc: "AI-powered trends, predictions & chatbot",
  path: "/ai-insights",
  icon: "🧠",
}
,
    {
      title: "Model Manager",
      desc: "Train and deploy ML models",
      path: "/models",
      icon: "🤖",
      stats: { items: 2, views: "1.1k", lastRun: "12h" },
    },
    {
      title: "Report Builder",
      desc: "Design and schedule PDF reports",
      path: "/reports",
      icon: "📄",
      stats: { items: 14, views: "980", lastRun: "2d" },
    },
    {
      title: "Data Catalog",
      desc: "Search datasets and schema",
      path: "/catalog",
      icon: "🔎",
      stats: { items: 34, views: "3.4k", lastRun: "4d" },
    },
    {
      title: "Feature Store",
      desc: "Manage reusable features",
      path: "/features",
      icon: "🧩",
      stats: { items: 11, views: "400", lastRun: "6h" },
    },
    {
      title: "Automation Rules",
      desc: "Schedule pipeline automations",
      path: "/automation",
      icon: "🔁",
      stats: { items: 7, views: "650", lastRun: "8h" },
    },
  ];

  const filtered = modules.filter((m) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q)
    );
  });

  return (
    <div className="analytics-hub">
      <nav className="analytics-navbar" aria-label="Primary navigation">
        <div className="nav-inner">
          <div className="nav-left">
            <div className="nav-logo">Smartlytics</div>
            <div className="nav-links">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/data-clean" className="nav-link">Data Clean</Link>
              <Link to="/auto-dashboard" className="nav-link">Auto Dashboard</Link>
            </div>
          </div>

          <div className="nav-right">
            <button className="nav-cta">New Project</button>
            <div className="nav-avatar" title="Signed in">SM</div>
          </div>
        </div>
      </nav>
      <div className="hub-header">
        <h2>📊 Analytics Hub</h2>
        <p className="hub-subtitle">Launch pipelines, clean data and generate dashboards — all in one place.</p>

        <div className="hub-controls">
          <input
            className="analytics-search"
            placeholder="Search modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search modules"
          />
        </div>
      </div>

      <div className="modules-grid" style={{ marginTop: 20 }}>
        {filtered.map((m, i) => (
          <Link key={i} to={m.path} className="module-link">
            <div className={`module-card ${m.featured ? 'module-card--featured' : ''}`}>
              {m.featured && <div className="featured-badge">Featured</div>}
              <div className="icon-circle" aria-hidden>{m.icon}</div>
              <h3>
                {m.title}
              </h3>
              <p>{m.desc}</p>

              {/* module metadata: small chips */}
              {m.stats && (
                <div className="module-meta" aria-hidden>
                  <span>{m.stats.items} datasets</span>
                  <span>• {m.stats.views} views</span>
                  <span>• Last run {m.stats.lastRun}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsHub;
