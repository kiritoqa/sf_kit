/* ============================================================
   Portfolio JS — Serghei Fortuna
   Nav scroll · Tabs · Accordion · Evidence filter · Reveal
   ============================================================ */

(function () {
  "use strict";

  /* ── Utilities ──────────────────────────────────────────── */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  /* ── Nav: add shadow + bg shift on scroll ───────────────── */
  const nav = qs(".nav");
  if (nav) {
    const onScroll = () => {
      const scrolled = window.scrollY > 24;
      nav.style.borderBottomColor = scrolled
        ? "rgba(255,255,255,.14)"
        : "rgba(255,255,255,.07)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ────────────────────────────────────── */
  const page = location.pathname.split("/").pop() || "index.html";
  qsa(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href && href !== "#" && !href.startsWith("mailto") && !href.startsWith("tel")) {
      if (href === page || (page === "" && href === "index.html")) {
        a.classList.add("active");
      }
    }
  });

  /* ── Accordion ──────────────────────────────────────────── */
  qsa(".accordion-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      const isOpen = item.classList.contains("open");

      // For the "where I fit" accordion on index, allow multiple open
      const parentAccordion = item.closest(".accordion");
      const singleMode = parentAccordion && parentAccordion.dataset.single !== undefined;

      if (singleMode) {
        qsa(".accordion-item", parentAccordion).forEach(el => el.classList.remove("open"));
      }

      item.classList.toggle("open", !isOpen);
    });
    // Keyboard support
    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* ── Tabs ───────────────────────────────────────────────── */
  qsa("[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.tab;
      const container = btn.closest("section, main");

      // Deactivate all buttons in same tab-row
      btn.closest(".tab-row") && qsa(".tab-btn", btn.closest(".tab-row")).forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      // Deactivate all panels
      qsa("[data-panel]", container).forEach(p => p.classList.remove("active"));

      // Activate selected
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const panel = qs(`[data-panel="${key}"]`, container);
      if (panel) panel.classList.add("active");
    });
  });

  /* ── Evidence category filter ───────────────────────────── */
  const filterBtns = qsa(".filter-btn");
  const evGrid = qs("#ev-grid");

  if (filterBtns.length && evGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        qsa(".ev-card", evGrid).forEach(card => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────── */
  if ("IntersectionObserver" in window) {
    const style = document.createElement("style");
    style.textContent = `
      .reveal { opacity: 0; transform: translateY(28px); transition: opacity .55s ease, transform .55s ease; }
      .reveal.in { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);

    const targets = qsa(
      ".card, .ev-card, .metric, .panel, .quote-block, .timeline-item, .domain-pill"
    );
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i % 8, 4) * 60}ms`;
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(el => obs.observe(el));
  }

  /* ── Modal (legacy, kept for compatibility) ─────────────── */
  const modal = qs(".modal");
  if (modal) {
    qsa("[data-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.modal;
        const copy = typeof modalCopy !== "undefined" && modalCopy[key];
        if (copy) {
          const titleEl = qs(".modal-title", modal);
          const bodyEl = qs(".modal-body", modal);
          if (titleEl) titleEl.textContent = copy.title;
          if (bodyEl) bodyEl.innerHTML = copy.body;
        }
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    qsa("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

})();
