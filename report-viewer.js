(function () {
  const manifest = window.SOFTLOGIC_RELEASE_MANIFEST;
  const preview = document.querySelector("#report-preview");
  const title = document.querySelector("#report-page-title");
  const eyebrow = document.querySelector("#report-page-eyebrow");

  if (!manifest || !preview) {
    return;
  }

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const renderInlineMarkdown = (line) => {
    let value = escapeHtml(line);
    value = value.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    value = value.replace(/`([^`]+)`/g, "<code>$1</code>");
    return value;
  };

  const renderMarkdown = (markdown) => {
    const lines = String(markdown || "").split(/\r?\n/);
    const html = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trimEnd();

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

  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");
  const docFile = params.get("doc");
  const reports = Array.isArray(manifest.testingReports)
    ? manifest.testingReports
    : [];
  const docs = Array.isArray(manifest.docApproval)
    ? manifest.docApproval
    : [];
  const report = reports.find((item) => item.file === file);
  const doc = docs.find((item) => item.file === docFile);
  const selected = doc || report;

  if (!selected) {
    preview.innerHTML = "<h1>Document not found</h1><p>The requested document is not listed in this release portal.</p>";
    return;
  }

  if (title) {
    title.textContent = selected.title;
  }
  if (eyebrow) {
    eyebrow.textContent = doc ? "Doc approval" : "Testing report";
  }
  document.title = `${selected.title} - SoftLogic`;

  const sourcePath = doc
    ? `./docs/${encodeURIComponent(doc.file)}`
    : `./reports/${encodeURIComponent(selected.file)}`;

  fetch(sourcePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Report file could not be loaded.");
      }
      return response.text();
    })
    .then((markdown) => {
      preview.innerHTML = renderMarkdown(markdown);
      window.SOFTLOGIC_DOC_CONTEXT = {
        resourceType: doc ? "DOC_APPROVAL" : "TESTING_REPORT",
        resourceId: selected.file,
        title: selected.title,
      };
      preview.dispatchEvent(
        new CustomEvent("softlogic:doc-rendered", {
          bubbles: true,
          detail: window.SOFTLOGIC_DOC_CONTEXT,
        })
      );
    })
    .catch((error) => {
      preview.innerHTML = `<h1>Report unavailable</h1><p>${escapeHtml(error.message)}</p>`;
    });
})();
