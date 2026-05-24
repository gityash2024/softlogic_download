(function () {
  var STORAGE_THEME = "softlogic-theme";
  var STORAGE_VIEW_PREFIX = "softlogic-view-";

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_THEME); } catch (_) { return null; }
  }

  function setStoredTheme(value) {
    try { localStorage.setItem(STORAGE_THEME, value); } catch (_) {}
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0d1117" : "#ffffff");
    }
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.setAttribute(
        "title",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  // Apply theme immediately (runs in <head> before body paints)
  applyTheme(getPreferredTheme());

  // Follow OS changes if user has not picked a theme manually
  if (window.matchMedia) {
    try {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var handler = function (event) {
        if (!getStoredTheme()) {
          applyTheme(event.matches ? "dark" : "light");
        }
      };
      if (mq.addEventListener) mq.addEventListener("change", handler);
      else if (mq.addListener) mq.addListener(handler);
    } catch (_) {}
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "light";
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    setStoredTheme(next);
  }

  function getStoredView(id) {
    try { return localStorage.getItem(STORAGE_VIEW_PREFIX + id); } catch (_) { return null; }
  }

  function setStoredView(id, view) {
    try { localStorage.setItem(STORAGE_VIEW_PREFIX + id, view); } catch (_) {}
  }

  function applyViewToContainer(toggle, view) {
    var targetId = toggle.dataset.target;
    if (!targetId) return;
    var container = document.getElementById(targetId);
    if (!container) return;
    container.classList.toggle("is-list", view === "list");
    container.classList.remove("is-grid");
    toggle.querySelectorAll(".view-toggle-btn").forEach(function (b) {
      var active = b.dataset.view === view;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  }

  function restoreViews() {
    document.querySelectorAll(".view-toggle").forEach(function (toggle) {
      var targetId = toggle.dataset.target;
      if (!targetId) return;
      var saved = getStoredView(targetId);
      var view = saved === "list" ? "list" : "grid";
      applyViewToContainer(toggle, view);
    });
  }

  // Click delegation — works for theme toggle and view toggle buttons
  document.addEventListener("click", function (event) {
    var themeBtn = event.target.closest && event.target.closest(".theme-toggle");
    if (themeBtn) {
      event.preventDefault();
      toggleTheme();
      return;
    }

    var viewBtn = event.target.closest && event.target.closest(".view-toggle-btn");
    if (viewBtn) {
      event.preventDefault();
      var toggle = viewBtn.closest(".view-toggle");
      if (!toggle) return;
      var view = viewBtn.dataset.view === "list" ? "list" : "grid";
      applyViewToContainer(toggle, view);
      var targetId = toggle.dataset.target;
      if (targetId) setStoredView(targetId, view);
    }
  });

  // Apply view preferences on initial DOM ready and after each tab activation
  // (portal.js populates content via innerHTML on load, so the parent class still applies)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", restoreViews);
  } else {
    restoreViews();
  }
})();
