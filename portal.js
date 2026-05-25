(function () {
  const manifest = window.SOFTLOGIC_RELEASE_MANIFEST;

  if (!manifest) {
    return;
  }

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const currentRelease =
    manifest.releases.find((release) => release.version === manifest.currentVersion) ||
    manifest.releases[0];
  let selectedRelease = currentRelease;

  let swaggerInitialized = false;
  const tabRoutes = {
    downloads: "/downloads",
    swagger: "/api-docs",
    phases: "/phase-status",
    access: "/access-creds",
    readme: "/readme",
    reports: "/testing-reports",
    "doc-approval": "/doc-approval",
  };
  const tabsByRoute = Object.entries(tabRoutes).reduce(
    (routes, [tab, route]) => ({
      ...routes,
      [route]: tab,
      [`${route}.html`]: tab,
    }),
    {
      "/": "downloads",
      "/index.html": "downloads",
      "/swagger": "swagger",
      "/phases": "phases",
      "/access": "access",
      "/reports": "reports",
    }
  );
  const tabTitles = {
    downloads: "SoftLogic Whiteboard Releases",
    swagger: "SoftLogic API Docs",
    phases: "SoftLogic Phase Status",
    access: "SoftLogic Access & Creds",
    readme: "SoftLogic README",
    reports: "SoftLogic Testing Reports",
    "doc-approval": "SoftLogic Doc Approval",
  };
  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const setText = (selector, value) => {
    const element = $(selector);
    if (element) {
      element.textContent = value;
    }
  };

  const badge = (text, tone = "") =>
    `<span class="badge ${tone}">${escapeHtml(text)}</span>`;

  const statusClass = (value) => {
    const normalized = String(value).toLowerCase();
    if (normalized.includes("done")) return "done";
    if (normalized.includes("n/a")) return "blank";
    if (normalized.includes("pending")) return "pending";
    if (normalized.includes("yts")) return "pending";
    return "";
  };

  const statusPill = (value) =>
    `<span class="status-pill ${statusClass(value)}">${escapeHtml(value)}</span>`;

  const maskSecret = (value) => {
    const length = Math.min(Math.max(String(value || "").length, 16), 36);
    return "*".repeat(length);
  };

  const copyText = async (value) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  };

  const parsePhaseTickets = (csv) =>
    String(csv || "")
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const [id, epic, feature, task, frontend, backend] = line.split("|");
        return { id, epic, feature, task, frontend, backend };
      });

  const renderSummary = () => {
    setText("#current-version-label", currentRelease.version);
    const releaseSummary = $("#release-summary");
    if (!releaseSummary) return;

    releaseSummary.innerHTML = `
      <strong>${escapeHtml(currentRelease.title)}</strong>
      <p>${escapeHtml(currentRelease.summary)}</p>
      <div class="summary-meta">
        ${badge(currentRelease.version, "primary")}
        ${badge(`Build ${currentRelease.build}`)}
        ${badge(currentRelease.releaseDate)}
        ${badge(currentRelease.status)}
      </div>
    `;
  };

  const renderDownloads = () => {
    setText("#download-title", "SoftLogic Whiteboard");

    const versionSelect = $("#release-version-select");
    if (versionSelect && versionSelect.options.length === 0) {
      versionSelect.innerHTML = manifest.releases
        .map(
          (release) => `
            <option value="${escapeHtml(release.version)}">
              ${escapeHtml(`${release.version} - ${release.status}`)}
            </option>
          `
        )
        .join("");
      versionSelect.value = selectedRelease.version;
    }

    const quickActions = $("#download-quick-actions");
    if (quickActions) {
      quickActions.innerHTML = selectedRelease.artifacts
        .map((artifact, index) => {
          const localTarget = artifact.href.startsWith("/");
          return `
            <a
              class="button-link ${index === 0 ? "primary" : ""}"
              href="${escapeHtml(artifact.href)}"
              target="${localTarget ? "_self" : "_blank"}"
              rel="noreferrer"
            >
              ${escapeHtml(artifact.label)}
            </a>
          `;
        })
        .join("");
    }

    renderAiSetup();

    const versionDetails = $("#version-details-grid");
    if (versionDetails) {
      const details = [
        ["Version", selectedRelease.version],
        ["Build", selectedRelease.build],
        ["Release date", selectedRelease.releaseDate],
        ["Status", selectedRelease.status],
      ];

      versionDetails.innerHTML = details
        .map(
          ([label, value]) => `
            <div class="version-detail">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `
        )
        .join("");
    }

    const releaseHighlights = $("#release-highlights");
    if (releaseHighlights) {
      const isSingleUserFriendly =
        selectedRelease.dashboardMode === "singleUserFriendly" &&
        selectedRelease.dashboardSection;

      releaseHighlights.classList.toggle("single-user-friendly", Boolean(isSingleUserFriendly));

      if (isSingleUserFriendly) {
        const section = selectedRelease.dashboardSection;
        releaseHighlights.innerHTML = `
          <article class="release-highlight-card">
            <h3>${escapeHtml(section.title)}</h3>
            <ul>
              ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>
        `;
      } else {
        releaseHighlights.innerHTML = selectedRelease.noteSections
          .map(
            (section) => `
              <article class="release-highlight-card">
                <h3>${escapeHtml(section.title)}</h3>
                <ul>
                  ${section.items.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </article>
            `
          )
          .join("");
      }
    }

  };

  const renderAiSetup = () => {
    const quickActions = $("#download-quick-actions");
    if (!quickActions) return;

    let aiSetup = $("#release-ai-setup");
    if (!aiSetup) {
      quickActions.insertAdjacentHTML(
        "afterend",
        '<div class="release-ai-setup" id="release-ai-setup"></div>'
      );
      aiSetup = $("#release-ai-setup");
    }

    const setup = selectedRelease.aiSetup;
    if (!setup) {
      aiSetup.hidden = true;
      aiSetup.innerHTML = "";
      return;
    }

    aiSetup.hidden = false;
    aiSetup.innerHTML = `
      <div class="release-ai-setup-header">
        <div>
          <span class="badge primary">Required for AI features</span>
          <h3>${escapeHtml(setup.title)}</h3>
          <p>${escapeHtml(setup.description)}</p>
        </div>
      </div>
      <div class="release-ai-path">
        <span>Where to add</span>
        <strong>${escapeHtml(setup.path)}</strong>
      </div>
      <div class="release-ai-key-list">
        ${setup.keys
          .map(
            (key) => `
              <div class="release-ai-key">
                <div class="release-ai-key-main">
                  <span>${escapeHtml(key.label)}</span>
                  <code
                    class="release-ai-secret"
                    data-secret="${escapeHtml(key.value)}"
                    data-revealed="false"
                  >${escapeHtml(maskSecret(key.value))}</code>
                </div>
                <div class="release-ai-key-actions">
                  <button
                    class="release-ai-icon-button"
                    type="button"
                    data-ai-key-action="toggle"
                    aria-label="Reveal ${escapeHtml(key.label)}"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span class="release-ai-button-label">Reveal</span>
                  </button>
                  <button
                    class="release-ai-icon-button"
                    type="button"
                    data-ai-key-action="copy"
                    aria-label="Copy ${escapeHtml(key.label)}"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span class="release-ai-button-label">Copy</span>
                  </button>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  };

  const setupAiSetupActions = () => {
    const downloadsPanel = $("#panel-downloads");
    if (!downloadsPanel) return;

    downloadsPanel.addEventListener("click", async (event) => {
      const button = event.target.closest?.("[data-ai-key-action]");
      if (!button || !downloadsPanel.contains(button)) return;

      const keyRow = button.closest(".release-ai-key");
      const secret = keyRow?.querySelector(".release-ai-secret");
      if (!secret) return;

      const value = secret.dataset.secret || "";
      const label = keyRow.querySelector(".release-ai-key-main span")?.textContent || "API key";
      const action = button.dataset.aiKeyAction;

      if (action === "toggle") {
        const revealed = secret.dataset.revealed === "true";
        secret.dataset.revealed = String(!revealed);
        secret.textContent = revealed ? maskSecret(value) : value;
        const labelNode = button.querySelector(".release-ai-button-label");
        if (labelNode) {
          labelNode.textContent = revealed ? "Reveal" : "Hide";
        }
        button.setAttribute("aria-label", `${revealed ? "Reveal" : "Hide"} ${label}`);
        return;
      }

      if (action === "copy") {
        try {
          await copyText(value);
          const labelNode = button.querySelector(".release-ai-button-label");
          if (!labelNode) return;
          const previous = labelNode.textContent;
          labelNode.textContent = "Copied";
          button.classList.add("is-copied");
          window.setTimeout(() => {
            labelNode.textContent = previous || "Copy";
            button.classList.remove("is-copied");
          }, 1400);
        } catch (error) {
          const labelNode = button.querySelector(".release-ai-button-label");
          if (labelNode) {
            labelNode.textContent = "Copy failed";
            window.setTimeout(() => {
              labelNode.textContent = "Copy";
            }, 1800);
          }
        }
      }
    });
  };

  const setupVersionSelector = () => {
    const versionSelect = $("#release-version-select");
    if (!versionSelect) return;

    versionSelect.addEventListener("change", () => {
      selectedRelease =
        manifest.releases.find((release) => release.version === versionSelect.value) ||
        currentRelease;
      renderDownloads();
      versionSelect.value = selectedRelease.version;
    });
  };

  const initSwaggerPreview = () => {
    if (swaggerInitialized) {
      return;
    }

    const link = $("#swagger-json-link");
    if (link) {
      link.href = manifest.api.swaggerJsonUrl;
      link.textContent = manifest.api.swaggerJsonUrl;
    }

    const fallback = $("#swagger-fallback");
    if (!window.SwaggerUIBundle) {
      if (fallback) {
        fallback.hidden = false;
        fallback.innerHTML = `
          API preview assets did not load. Open
          <a href="${escapeHtml(manifest.api.swaggerUrl)}" target="_blank" rel="noreferrer">live API documentation</a>
          or
          <a href="${escapeHtml(manifest.api.swaggerJsonUrl)}" target="_blank" rel="noreferrer">OpenAPI JSON</a>.
        `;
      }
      return;
    }

    try {
      window.SwaggerUIBundle({
        url: manifest.api.swaggerJsonUrl,
        dom_id: "#swagger-ui",
        deepLinking: true,
        docExpansion: "list",
        defaultModelsExpandDepth: 0,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: false,
        presets: [window.SwaggerUIBundle.presets.apis],
      });
      swaggerInitialized = true;
    } catch (error) {
      if (fallback) {
        fallback.hidden = false;
        fallback.textContent = `API preview could not initialize: ${error.message}`;
      }
    }
  };

  const renderSwagger = () => {
    initSwaggerPreview();
  };

  const renderList = (items) =>
    `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

  const renderAccessGuide = () => {
    const guide = manifest.accessGuide;
    const container = $("#access-guide");
    if (!guide || !container) return;

    container.innerHTML = `
      <article class="access-card access-hero access-card-wide">
        <div class="access-hero-copy">
          <span class="badge primary">QA access guide</span>
          <h3>Admin access and user flow</h3>
          <p>
            Use these public testing details to sign in, verify OTP behavior, and create users through the admin hierarchy.
            Infrastructure secrets are intentionally excluded.
          </p>
        </div>
        <div class="credential-panel" aria-label="Current admin access">
          <div class="credential-tile">
            <span>Admin email</span>
            <strong>${escapeHtml(guide.adminEmail)}</strong>
          </div>
          <div class="credential-tile">
            <span>Fixed QA OTP</span>
            <strong>${escapeHtml(guide.fixedOtp)}</strong>
          </div>
          <p class="access-note">
            Request OTP first, then verify with the delivered OTP or fixed QA OTP when testing auth limits are enabled.
          </p>
        </div>
      </article>
      <div class="access-flow-grid">
        <article class="access-card">
          <h3>Login flow</h3>
          ${renderList(guide.loginFlow)}
        </article>
        <article class="access-card">
          <h3>OTP notes</h3>
          ${renderList(guide.otpNotes)}
        </article>
        <article class="access-card">
          <h3>User creation flow</h3>
          ${renderList(guide.userCreationFlow)}
        </article>
      </div>
      <article class="access-card access-card-wide role-card">
        <h3>Role hierarchy</h3>
        <div class="role-chain">
          ${guide.roleHierarchy
            .map((role) => `<span>${escapeHtml(role)}</span>`)
            .join('<b aria-hidden="true">&rarr;</b>')}
        </div>
      </article>
    `;
  };

  const renderPhases = () => {
    const { phaseStatus } = manifest;
    const phase1 = phaseStatus.phase1Summary;
    const phase1Tickets = parsePhaseTickets(phaseStatus.phase1TicketsCsv);

    $("#phase-summary-grid").innerHTML = `
      <article class="phase-summary-card">
        <div class="phase-overview-row">
          <span class="phase-index">Phase 1</span>
          <strong>${escapeHtml(phase1.title)}</strong>
          ${badge(`${phase1.taskCount} tasks`)}
          ${badge(`${phase1.frontendDone} frontend done`, "primary")}
          ${badge(`${phase1.backendDone} backend done`)}
          ${badge(`${phase1.backendNotApplicable} backend N/A`)}
        </div>
        <div class="status-grid four">
          <div class="status-cell"><span>Total tickets</span><strong>${phase1.taskCount}</strong></div>
          <div class="status-cell"><span>Frontend done</span><strong>${phase1.frontendDone}</strong></div>
          <div class="status-cell"><span>Backend done</span><strong>${phase1.backendDone}</strong></div>
          <div class="status-cell"><span>Backend N/A</span><strong>${phase1.backendNotApplicable}</strong></div>
        </div>
      </article>
    `;

    $("#phase-one-tickets").innerHTML = phase1Tickets
      .map(
        (ticket) => `
          <tr>
            <td data-label="ID" title="${escapeHtml(ticket.id)}"><strong>${escapeHtml(ticket.id)}</strong></td>
            <td data-label="Epic" title="${escapeHtml(ticket.epic)}">${escapeHtml(ticket.epic)}</td>
            <td data-label="Feature" title="${escapeHtml(ticket.feature)}">${escapeHtml(ticket.feature)}</td>
            <td data-label="Task" title="${escapeHtml(ticket.task)}">${escapeHtml(ticket.task)}</td>
            <td data-label="Frontend">${statusPill(ticket.frontend)}</td>
            <td data-label="Backend">${statusPill(ticket.backend)}</td>
          </tr>
        `
      )
      .join("");

    $("#completed-phase-tickets").innerHTML = phaseStatus.completedOtherPhaseTickets
      .map(([phase, id, feature, task, frontend, backend]) => {
        return `
          <tr>
            <td data-label="Phase" title="${escapeHtml(phase)}">${badge(phase, "primary")}</td>
            <td data-label="ID" title="${escapeHtml(id)}"><strong>${escapeHtml(id)}</strong></td>
            <td data-label="Feature" title="${escapeHtml(feature)}">${escapeHtml(feature)}</td>
            <td data-label="Task" title="${escapeHtml(task)}">${escapeHtml(task)}</td>
            <td data-label="Frontend">${statusPill(frontend)}</td>
            <td data-label="Backend">${statusPill(backend)}</td>
          </tr>
        `;
      })
      .join("");
  };

  const renderReleaseNotes = () => {
    $("#release-notes").innerHTML = manifest.releases
      .map(
        (release) => `
          <article class="notes-card expanded">
            <div class="card-meta">
              ${badge(release.version, "primary")}
              ${badge(`Build ${release.build}`)}
              ${badge(release.releaseDate)}
            </div>
            <h3>${escapeHtml(release.title)}</h3>
            <p>${escapeHtml(release.summary)}</p>
            <div class="release-note-sections">
              ${release.noteSections
                .map(
                  (section) => `
                    <section class="release-note-section">
                      <h4>${escapeHtml(section.title)}</h4>
                      <ul>
                        ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                      </ul>
                    </section>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
  };

  const renderInlineMarkdown = (line) => {
    let value = escapeHtml(line);
    value = value.replace(
      /!\[([^\]]+)\]\(([^)]+)\)/g,
      '<img class="readme-badge" alt="$1" src="$2" />'
    );
    value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
    return value;
  };

  const renderMarkdown = (markdown) => {
    const lines = String(markdown || "").split(/\r?\n/);
    const html = [];
    let i = 0;

    while (i < lines.length) {
      const raw = lines[i];
      const line = raw.trimEnd();

      if (!line.trim()) {
        i += 1;
        continue;
      }

      if (line.startsWith("```")) {
        const language = line.slice(3).trim();
        const codeLines = [];
        i += 1;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i += 1;
        }
        i += 1;
        html.push(
          `<pre class="readme-code"><code data-language="${escapeHtml(language)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`
        );
        continue;
      }

      if (/^\|.*\|$/.test(line.trim())) {
        const rows = [];
        while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
          rows.push(lines[i].trim());
          i += 1;
        }
        const normalizedRows = rows.filter((row) => !/^\|\s*-/.test(row));
        const tableRows = normalizedRows.map((row, rowIndex) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim());
          const tag = rowIndex === 0 ? "th" : "td";
          return `<tr>${cells.map((cell) => `<${tag}>${renderInlineMarkdown(cell)}</${tag}>`).join("")}</tr>`;
        });
        html.push(`<div class="readme-table-wrap"><table>${tableRows.join("")}</table></div>`);
        continue;
      }

      if (line.startsWith("# ")) {
        html.push(`<h1>${renderInlineMarkdown(line.slice(2))}</h1>`);
        i += 1;
        continue;
      }

      if (line.startsWith("## ")) {
        html.push(`<h2>${renderInlineMarkdown(line.slice(3))}</h2>`);
        i += 1;
        continue;
      }

      if (line.startsWith("### ")) {
        html.push(`<h3>${renderInlineMarkdown(line.slice(4))}</h3>`);
        i += 1;
        continue;
      }

      if (line.startsWith("- ")) {
        const items = [];
        while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
          items.push(lines[i].trimStart().slice(2));
          i += 1;
        }
        html.push(`<ul>${items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
        continue;
      }

      if (/^\d+\.\s/.test(line.trimStart())) {
        const items = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
          items.push(lines[i].trimStart().replace(/^\d+\.\s/, ""));
          i += 1;
        }
        html.push(`<ol>${items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ol>`);
        continue;
      }

      html.push(`<p>${renderInlineMarkdown(line)}</p>`);
      i += 1;
    }

    return html.join("");
  };

  const renderReadme = () => {
    $("#readme-preview").innerHTML = renderMarkdown(manifest.readmeMarkdown);
  };

  const renderReports = () => {
    const container = $("#testing-reports");
    if (!container) return;

    const reports = Array.isArray(manifest.testingReports)
      ? manifest.testingReports
      : [];

    container.innerHTML = reports
      .map(
        (report) => `
          <article class="report-card">
            <div class="report-icon" aria-hidden="true"></div>
            <div class="report-content">
              <span class="badge primary">Markdown report</span>
              <h3>${escapeHtml(report.title)}</h3>
              <p>${escapeHtml(report.description)}</p>
              <a
                class="button-link primary"
                href="./report.html?file=${encodeURIComponent(report.file)}"
                target="_blank"
                rel="noreferrer"
              >
                Open formatted report
              </a>
            </div>
          </article>
        `
      )
      .join("");
  };

  const renderDocApproval = () => {
    const container = $("#doc-approval-list");
    if (!container) return;

    setText(
      "#doc-approval-updated",
      manifest.docApprovalLastUpdated
        ? `Last updated: ${manifest.docApprovalLastUpdated}`
        : ""
    );

    const docs = Array.isArray(manifest.docApproval)
      ? manifest.docApproval
      : [];

    container.innerHTML = docs
      .map(
        (doc) => `
          <article class="doc-card">
            <div class="doc-card-header">
              ${badge(doc.status || "Approval doc", "primary")}
              <span class="doc-card-type">Markdown preview</span>
            </div>
            <h3>${escapeHtml(doc.title)}</h3>
            <p>${escapeHtml(doc.description)}</p>
            <a
              class="button-link primary"
              href="./report.html?doc=${encodeURIComponent(doc.file)}"
              target="_blank"
              rel="noreferrer"
            >
              Open formatted doc
            </a>
          </article>
        `
      )
      .join("");
  };

  const renderTreeNode = (node, depth = 0) => {
    const children = Array.isArray(node.children) ? node.children : [];
    const hasChildren = children.length > 0;
    return `
      <li class="tree-item ${hasChildren ? "is-collapsed" : "is-leaf"}" style="--depth: ${depth}">
        <div class="tree-node">
          ${
            hasChildren
              ? `<button class="tree-toggle" type="button" aria-label="Toggle ${escapeHtml(node.name)}" aria-expanded="false"></button>`
              : `<span class="tree-spacer" aria-hidden="true"></span>`
          }
          <span class="tree-dot" aria-hidden="true"></span>
          <span class="tree-label">
            <strong>${escapeHtml(node.name)}</strong>
            ${node.meta ? `<small>${escapeHtml(node.meta)}</small>` : ""}
          </span>
        </div>
        ${
          hasChildren
            ? `<ul class="tree-children" style="max-height: 0px">${children.map((child) => renderTreeNode(child, depth + 1)).join("")}</ul>`
            : ""
        }
      </li>
    `;
  };

  const refreshTreeHeights = (element) => {
    let list = element?.closest?.(".tree-children");
    while (list) {
      if (list.parentElement?.classList.contains("is-open")) {
        list.style.maxHeight = `${list.scrollHeight}px`;
      }
      list = list.parentElement?.closest?.(".tree-children");
    }
  };

  const setupStructureTree = () => {
    const root = $("#structure-tree");
    if (!root) return;

    root.addEventListener("click", (event) => {
      const button = event.target.closest?.(".tree-toggle");
      if (!button || !root.contains(button)) return;

      const item = button.closest(".tree-item");
      const children = item.querySelector(":scope > .tree-children");
      const expanded = button.getAttribute("aria-expanded") === "true";
      if (!children) return;

      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
        item.classList.add("is-open");
        item.classList.remove("is-collapsed");
        children.style.maxHeight = `${children.scrollHeight}px`;
        window.requestAnimationFrame(() => refreshTreeHeights(item));
        return;
      }

      children.style.maxHeight = `${children.scrollHeight}px`;
      window.requestAnimationFrame(() => {
        button.setAttribute("aria-expanded", "false");
        item.classList.remove("is-open");
        item.classList.add("is-collapsed");
        children.style.maxHeight = "0px";
        refreshTreeHeights(item);
      });
    });
  };

  const renderStructure = () => {
    $("#structure-tree").innerHTML = `<ul class="tree-root">${renderTreeNode(manifest.structureTree)}</ul>`;
    setupStructureTree();
  };

  const getCurrentTabFromRoute = () => {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    return tabsByRoute[path] || "downloads";
  };

  const updateRoute = (tabName) => {
    const route = tabRoutes[tabName] || tabRoutes.downloads;
    if (window.location.pathname === route) {
      return;
    }
    window.history.pushState({ tabName }, "", route);
  };

  const activateTab = (tabName, options = {}) => {
    const nextTab = tabRoutes[tabName] ? tabName : "downloads";

    $$(".tab-button").forEach((button) => {
      const active = button.dataset.tab === nextTab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    $$(".tab-panel").forEach((panel) => {
      const active = panel.id === `panel-${nextTab}`;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    document.title = tabTitles[nextTab] || tabTitles.downloads;

    if (options.updateUrl) {
      updateRoute(nextTab);
    }

    if (nextTab === "swagger") {
      initSwaggerPreview();
    }

    if (options.scroll !== false) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  const setupTabs = () => {
    $$(".tab-button").forEach((button) => {
      button.addEventListener("click", () =>
        activateTab(button.dataset.tab, { updateUrl: true })
      );
    });

    window.addEventListener("popstate", () => {
      activateTab(getCurrentTabFromRoute(), { scroll: false });
    });
  };

  const setupScrollTop = () => {
    const button = $("#scroll-top-button");
    if (!button) return;

    const updateVisibility = () => {
      button.classList.toggle("is-visible", window.scrollY > 420);
    };

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
  };

  renderSummary();
  renderDownloads();
  renderAccessGuide();
  renderPhases();
  renderReadme();
  renderReports();
  renderDocApproval();
  setupAiSetupActions();
  setupVersionSelector();
  setupTabs();
  activateTab(getCurrentTabFromRoute(), { scroll: false });
  setupScrollTop();
})();
