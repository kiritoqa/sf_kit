const modalCopy = {
  ai: {
    title: "AI/RAG quality governance",
    body:
      "For AI products, I separate objectively checkable facts from semantic quality. Scripts can verify API behavior, latency, UI flows and dataset coverage, but answer quality needs golden datasets, expert validation, documented evidence, ownership, and clear release gates."
  },
  spec: {
    title: "QA specification system",
    body:
      "A story should not move through delivery as scattered notes. I build a path from Jira context to questions, risks, acceptance criteria, QA specification, test cases, automation readiness, defects, and release evidence."
  },
  visual: {
    title: "Visual and accessibility reporting",
    body:
      "For web products, quality is often lost in large reports or invisible UI differences. I build repeatable checks that compare pages across environments, viewports and states, then turn the output into a reviewable report."
  },
  reports: {
    title: "Weekly QA health reporting",
    body:
      "A Jira status alone can hide real project risk. I work with reporting concepts that connect Jira, repository activity, QA time, defects, deadlines and trends so leadership can see what is really moving."
  }
};

document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`[data-panel="${target}"]`)?.classList.add("active");
  });
});

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    item?.classList.toggle("open");
  });
});

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.modal;
    const content = modalCopy[key];
    if (!content) return;

    document.querySelector("#modal-title").textContent = content.title;
    document.querySelector("#modal-body").textContent = content.body;
    document.querySelector("#case-modal").classList.add("open");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#case-modal")?.classList.remove("open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector("#case-modal")?.classList.remove("open");
  }
});
