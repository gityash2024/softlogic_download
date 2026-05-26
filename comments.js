(function () {
  "use strict";

  const STORAGE_CLIENT_ID = "softlogic.feedback.clientId";
  const STORAGE_IDENTITY = "softlogic.feedback.identity";
  const ANCHOR_CONTEXT_CHARS = 40;

  const state = {
    ctx: null,
    apiBase: null,
    threads: [],
    filter: "open",
    pendingSelection: null,
    activeThreadId: null,
    pendingIdentityResolve: null,
    pendingIdentityReject: null,
    pendingCommentResolve: null,
    pendingCommentReject: null,
    pendingConfirmResolve: null,
    initialized: false,
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const uuid = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return "fb-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  };

  const getClientId = () => {
    let id = localStorage.getItem(STORAGE_CLIENT_ID);
    if (!id) {
      id = uuid();
      localStorage.setItem(STORAGE_CLIENT_ID, id);
    }
    return id;
  };

  const readIdentity = () => {
    try {
      const raw = localStorage.getItem(STORAGE_IDENTITY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.name === "string" && typeof parsed.email === "string") {
        return parsed;
      }
    } catch (_) {
      // fall through
    }
    return null;
  };

  const writeIdentity = (identity) => {
    localStorage.setItem(STORAGE_IDENTITY, JSON.stringify(identity));
    updateIdentityLabel();
  };

  const updateIdentityLabel = () => {
    const label = document.getElementById("comments-identity-label");
    if (!label) return;
    const identity = readIdentity();
    label.textContent = identity ? identity.name : "Sign in to comment";
  };

  const showToast = (message, variant) => {
    const toast = document.getElementById("comments-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.dataset.variant = variant || "info";
    toast.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.hidden = true;
    }, 3000);
  };

  // ─── Identity modal ─────────────────────────────────────────────

  const openIdentityModal = () =>
    new Promise((resolve, reject) => {
      const modal = document.getElementById("identity-modal");
      const nameInput = document.getElementById("identity-name");
      const emailInput = document.getElementById("identity-email");
      const error = document.getElementById("identity-error");
      if (!modal || !nameInput || !emailInput) {
        reject(new Error("Identity modal missing"));
        return;
      }
      const current = readIdentity();
      nameInput.value = current ? current.name : "";
      emailInput.value = current ? current.email : "";
      error.hidden = true;
      modal.hidden = false;
      requestAnimationFrame(() => nameInput.focus());
      state.pendingIdentityResolve = resolve;
      state.pendingIdentityReject = reject;
    });

  const closeIdentityModal = (cancel) => {
    const modal = document.getElementById("identity-modal");
    if (!modal) return;
    modal.hidden = true;
    if (cancel && state.pendingIdentityReject) {
      state.pendingIdentityReject(new Error("cancelled"));
    }
    state.pendingIdentityResolve = null;
    state.pendingIdentityReject = null;
  };

  const ensureIdentity = async () => {
    const existing = readIdentity();
    if (existing) return existing;
    return openIdentityModal();
  };

  const wireIdentityForm = () => {
    const form = document.getElementById("identity-form");
    const error = document.getElementById("identity-error");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("identity-name").value.trim();
      const email = document.getElementById("identity-email").value.trim();
      if (!name) {
        error.textContent = "Name is required";
        error.hidden = false;
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.textContent = "Enter a valid email address";
        error.hidden = false;
        return;
      }
      const identity = { name, email };
      writeIdentity(identity);
      const resolve = state.pendingIdentityResolve;
      state.pendingIdentityResolve = null;
      state.pendingIdentityReject = null;
      const modal = document.getElementById("identity-modal");
      if (modal) modal.hidden = true;
      if (resolve) resolve(identity);
    });

    document.querySelectorAll("[data-identity-dismiss]").forEach((el) => {
      el.addEventListener("click", () => closeIdentityModal(true));
    });

    const identityBtn = document.getElementById("comments-identity-btn");
    if (identityBtn) {
      identityBtn.addEventListener("click", async () => {
        try {
          await openIdentityModal();
        } catch (_) {
          // user cancelled
        }
      });
    }
  };

  const openCommentModal = (options) =>
    new Promise((resolve, reject) => {
      const modal = document.getElementById("comment-modal");
      const title = document.getElementById("comment-modal-title");
      const description = document.getElementById("comment-modal-description");
      const input = document.getElementById("comment-body");
      const error = document.getElementById("comment-error");
      const submit = document.getElementById("comment-submit");
      if (!modal || !title || !description || !input || !error || !submit) {
        reject(new Error("Comment modal missing"));
        return;
      }

      title.textContent = options.title || "Add comment";
      description.textContent = options.description || "";
      input.value = options.initialValue || "";
      input.placeholder = options.placeholder || "Write your comment";
      submit.textContent = options.submitLabel || "Add comment";
      error.hidden = true;
      error.textContent = "";
      modal.hidden = false;
      requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      });
      state.pendingCommentResolve = resolve;
      state.pendingCommentReject = reject;
    });

  const closeCommentModal = (cancel) => {
    const modal = document.getElementById("comment-modal");
    if (!modal) return;
    modal.hidden = true;
    if (cancel && state.pendingCommentReject) {
      state.pendingCommentReject(new Error("cancelled"));
    }
    state.pendingCommentResolve = null;
    state.pendingCommentReject = null;
  };

  const wireCommentForm = () => {
    const form = document.getElementById("comment-form");
    const input = document.getElementById("comment-body");
    const error = document.getElementById("comment-error");
    if (!form || !input || !error) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const body = input.value.trim();
      if (!body) {
        error.textContent = "Comment can't be empty";
        error.hidden = false;
        return;
      }

      const resolve = state.pendingCommentResolve;
      state.pendingCommentResolve = null;
      state.pendingCommentReject = null;
      const modal = document.getElementById("comment-modal");
      if (modal) modal.hidden = true;
      if (resolve) resolve(body);
    });

    document.querySelectorAll("[data-comment-dismiss]").forEach((el) => {
      el.addEventListener("click", () => closeCommentModal(true));
    });
  };

  const openConfirmModal = (options) =>
    new Promise((resolve, reject) => {
      const modal = document.getElementById("comment-confirm-modal");
      const title = document.getElementById("comment-confirm-title");
      const description = document.getElementById("comment-confirm-description");
      const submit = document.getElementById("comment-confirm-submit");
      if (!modal || !title || !description || !submit) {
        reject(new Error("Confirm modal missing"));
        return;
      }

      title.textContent = options.title || "Confirm action";
      description.textContent = options.description || "";
      submit.textContent = options.submitLabel || "Confirm";
      modal.hidden = false;
      requestAnimationFrame(() => submit.focus());
      state.pendingConfirmResolve = resolve;
    });

  const closeConfirmModal = (confirmed) => {
    const modal = document.getElementById("comment-confirm-modal");
    if (!modal) return;
    modal.hidden = true;
    const resolve = state.pendingConfirmResolve;
    state.pendingConfirmResolve = null;
    if (resolve) resolve(Boolean(confirmed));
  };

  const wireConfirmForm = () => {
    const form = document.getElementById("comment-confirm-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      closeConfirmModal(true);
    });

    document.querySelectorAll("[data-confirm-dismiss]").forEach((el) => {
      el.addEventListener("click", () => closeConfirmModal(false));
    });
  };

  // ─── API client ─────────────────────────────────────────────────

  const apiBase = () => {
    if (state.apiBase) return state.apiBase;
    const manifest = window.SOFTLOGIC_RELEASE_MANIFEST;
    let base = manifest && manifest.api && manifest.api.apiBaseUrl;
    if (!base) {
      console.error("SOFTLOGIC_RELEASE_MANIFEST.api.apiBaseUrl is missing");
      base = "/api/v1";
    }
    state.apiBase = base.replace(/\/$/, "") + "/feedback";
    return state.apiBase;
  };

  const request = async (method, path, options) => {
    const opts = options || {};
    const url = apiBase() + path;
    const init = {
      method,
      headers: { Accept: "application/json" },
    };
    if (opts.body !== undefined) {
      init.headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(opts.body);
    }
    const response = await fetch(url, init);
    let payload = null;
    try {
      payload = await response.json();
    } catch (_) {
      // empty body
    }
    if (!response.ok) {
      const message =
        (payload && (payload.message || (payload.errors && JSON.stringify(payload.errors)))) ||
        ("Request failed (" + response.status + ")");
      const err = new Error(message);
      err.status = response.status;
      err.payload = payload;
      throw err;
    }
    return payload ? payload.data : null;
  };

  const api = {
    listThreads: (resourceType, resourceId) => {
      const params = new URLSearchParams({
        resourceType,
        resourceId,
        includeResolved: "true",
      });
      return request("GET", "/threads?" + params.toString());
    },
    createThread: (body) => request("POST", "/threads", { body }),
    addComment: (threadId, body) =>
      request("POST", "/threads/" + encodeURIComponent(threadId) + "/comments", { body }),
    updateThreadStatus: (threadId, body) =>
      request("PATCH", "/threads/" + encodeURIComponent(threadId), { body }),
    editComment: (commentId, body) =>
      request("PATCH", "/comments/" + encodeURIComponent(commentId), { body }),
    deleteComment: (commentId, authorClientId) => {
      const params = new URLSearchParams({ authorClientId });
      return request(
        "DELETE",
        "/comments/" + encodeURIComponent(commentId) + "?" + params.toString(),
      );
    },
  };

  // ─── Anchor capture & re-locate ─────────────────────────────────

  const collectTextNodes = (root) => {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  };

  const buildFlatText = (root) => {
    const nodes = collectTextNodes(root);
    let text = "";
    const map = []; // { node, start, end }
    for (const node of nodes) {
      const start = text.length;
      text += node.nodeValue;
      map.push({ node, start, end: text.length });
    }
    return { text, map };
  };

  const offsetToNode = (map, offset) => {
    for (let i = 0; i < map.length; i += 1) {
      const entry = map[i];
      if (offset >= entry.start && offset <= entry.end) {
        return { node: entry.node, offset: offset - entry.start };
      }
    }
    const last = map[map.length - 1];
    if (last) return { node: last.node, offset: last.node.nodeValue.length };
    return null;
  };

  const captureAnchor = (selection) => {
    if (!selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const preview = document.getElementById("report-preview");
    if (!preview || !preview.contains(range.commonAncestorContainer)) return null;
    const quote = selection.toString();
    if (!quote || !quote.trim()) return null;

    const { text, map } = buildFlatText(preview);

    // figure out flat offset of selection start by walking until we hit the start container
    let startOffset = 0;
    for (const entry of map) {
      if (entry.node === range.startContainer) {
        startOffset = entry.start + range.startOffset;
        break;
      }
    }
    let endOffset = startOffset + quote.length;
    if (endOffset > text.length) endOffset = text.length;

    const prefix = text.slice(Math.max(0, startOffset - ANCHOR_CONTEXT_CHARS), startOffset);
    const suffix = text.slice(endOffset, endOffset + ANCHOR_CONTEXT_CHARS);

    return { quote, prefix, suffix };
  };

  const findAnchorRange = (anchor) => {
    if (!anchor || !anchor.quote) return null;
    const preview = document.getElementById("report-preview");
    if (!preview) return null;
    const { text, map } = buildFlatText(preview);
    const needle = anchor.quote;
    const prefix = anchor.prefix || "";
    const suffix = anchor.suffix || "";

    let from = 0;
    while (from <= text.length) {
      const idx = text.indexOf(needle, from);
      if (idx === -1) return null;
      const beforeOk = !prefix || text.slice(Math.max(0, idx - prefix.length), idx) === prefix;
      const afterStart = idx + needle.length;
      const afterOk =
        !suffix || text.slice(afterStart, afterStart + suffix.length) === suffix;
      if (beforeOk && afterOk) {
        const start = offsetToNode(map, idx);
        const end = offsetToNode(map, idx + needle.length);
        if (!start || !end) return null;
        const range = document.createRange();
        range.setStart(start.node, start.offset);
        range.setEnd(end.node, end.offset);
        return range;
      }
      from = idx + 1;
    }
    return null;
  };

  const clearHighlights = () => {
    const preview = document.getElementById("report-preview");
    if (!preview) return;
    preview.querySelectorAll("mark.fb-highlight").forEach((mark) => {
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    });
  };

  const wrapRangeWithHighlight = (range, threadId, status) => {
    try {
      const mark = document.createElement("mark");
      mark.className = "fb-highlight";
      mark.dataset.threadId = threadId;
      if (status === "RESOLVED") mark.classList.add("is-resolved");
      range.surroundContents(mark);
      mark.addEventListener("click", (event) => {
        event.stopPropagation();
        focusThread(threadId, { scroll: true });
      });
      return mark;
    } catch (_) {
      // surroundContents fails when range crosses element boundaries; skip silently
      return null;
    }
  };

  const renderHighlights = () => {
    clearHighlights();
    for (const thread of state.threads) {
      if (!thread.anchor) continue;
      if (state.filter === "open" && thread.status !== "OPEN") continue;
      if (state.filter === "resolved" && thread.status !== "RESOLVED") continue;
      const range = findAnchorRange(thread.anchor);
      if (range) wrapRangeWithHighlight(range, thread.id, thread.status);
    }
  };

  // ─── Selection toolbar ──────────────────────────────────────────

  const hideSelectionToolbar = () => {
    const toolbar = document.getElementById("selection-toolbar");
    if (toolbar) toolbar.hidden = true;
    state.pendingSelection = null;
  };

  const positionSelectionToolbar = () => {
    const toolbar = document.getElementById("selection-toolbar");
    const selection = window.getSelection();
    if (!toolbar || !selection || selection.rangeCount === 0) {
      hideSelectionToolbar();
      return;
    }
    const preview = document.getElementById("report-preview");
    const range = selection.getRangeAt(0);
    if (!preview || !preview.contains(range.commonAncestorContainer)) {
      hideSelectionToolbar();
      return;
    }
    const text = selection.toString();
    if (!text || !text.trim()) {
      hideSelectionToolbar();
      return;
    }
    const anchor = captureAnchor(selection);
    if (!anchor) {
      hideSelectionToolbar();
      return;
    }
    state.pendingSelection = anchor;

    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      hideSelectionToolbar();
      return;
    }
    toolbar.hidden = false;
    const toolbarRect = toolbar.getBoundingClientRect();
    const top = rect.top + window.scrollY - toolbarRect.height - 10;
    const left = rect.left + window.scrollX + rect.width / 2 - toolbarRect.width / 2;
    toolbar.style.top = Math.max(window.scrollY + 8, top) + "px";
    toolbar.style.left = Math.max(8, left) + "px";
  };

  const wireSelectionToolbar = () => {
    const preview = document.getElementById("report-preview");
    if (!preview) return;
    preview.addEventListener("mouseup", () => {
      setTimeout(positionSelectionToolbar, 0);
    });
    document.addEventListener("selectionchange", () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) hideSelectionToolbar();
    });
    document.addEventListener("mousedown", (event) => {
      const toolbar = document.getElementById("selection-toolbar");
      if (!toolbar || toolbar.hidden) return;
      if (toolbar.contains(event.target)) return;
      // any click outside collapses the selection toolbar
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) hideSelectionToolbar();
      }, 0);
    });

    const addBtn = document.getElementById("add-comment-btn");
    if (addBtn) {
      addBtn.addEventListener("click", async () => {
        if (!state.pendingSelection) return;
        const anchor = state.pendingSelection;
        hideSelectionToolbar();
        const selection = window.getSelection();
        if (selection) selection.removeAllRanges();
        try {
          await beginNewThread(anchor);
        } catch (err) {
          if (err && err.message !== "cancelled") {
            showToast(err.message, "error");
          }
        }
      });
    }
  };

  // ─── Sidebar rendering ──────────────────────────────────────────

  const relativeTime = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return Math.floor(diff / 60) + "m ago";
    if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
    if (diff < 2592000) return Math.floor(diff / 86400) + "d ago";
    return date.toLocaleDateString();
  };

  const initials = (name) => {
    if (!name) return "?";
    const parts = String(name).trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]).join("").toUpperCase() || "?";
  };

  const isAuthor = (clientId) => clientId === getClientId();

  const renderComment = (comment, thread) => {
    const mine = isAuthor(comment.authorClientId);
    return (
      '<li class="comment-item" data-comment-id="' + escapeHtml(comment.id) + '">' +
        '<div class="comment-avatar" aria-hidden="true">' + escapeHtml(initials(comment.authorName)) + "</div>" +
        '<div class="comment-body">' +
          '<div class="comment-meta">' +
            '<span class="comment-author">' + escapeHtml(comment.authorName) + "</span>" +
            '<span class="comment-time" title="' + escapeHtml(comment.createdAt) + '">' +
              escapeHtml(relativeTime(comment.createdAt)) +
              (comment.editedAt ? " · edited" : "") +
            "</span>" +
          "</div>" +
          '<div class="comment-text" data-role="comment-text">' + escapeHtml(comment.body) + "</div>" +
          (mine
            ? '<div class="comment-actions">' +
                '<button type="button" class="comment-action" data-action="edit-comment" data-comment-id="' + escapeHtml(comment.id) + '">Edit</button>' +
                '<button type="button" class="comment-action" data-action="delete-comment" data-comment-id="' + escapeHtml(comment.id) + '" data-thread-id="' + escapeHtml(thread.id) + '">Delete</button>' +
              "</div>"
            : "") +
        "</div>" +
      "</li>"
    );
  };

  const renderThread = (thread) => {
    const isResolved = thread.status === "RESOLVED";
    const mineThread = isAuthor(thread.authorClientId);
    const anchorPreview = thread.anchor && thread.anchor.quote
      ? '<blockquote class="thread-anchor" title="Anchored selection">' + escapeHtml(thread.anchor.quote) + "</blockquote>"
      : '<p class="thread-anchor thread-anchor--unanchored">(no anchor)</p>';

    return (
      '<article class="thread-card' + (isResolved ? " is-resolved" : "") +
        (state.activeThreadId === thread.id ? " is-active" : "") +
        '" data-thread-id="' + escapeHtml(thread.id) + '">' +
        '<header class="thread-card-header">' +
          '<span class="thread-status-pill thread-status-pill--' + (isResolved ? "resolved" : "open") + '">' +
            (isResolved ? "Resolved" : "Open") +
          "</span>" +
          (mineThread || isResolved
            ? '<button type="button" class="thread-status-toggle" data-action="toggle-status" data-thread-id="' + escapeHtml(thread.id) + '">' +
                (isResolved ? "Reopen" : "Resolve") +
              "</button>"
            : "") +
        "</header>" +
        anchorPreview +
        '<ul class="thread-comments">' +
          thread.comments.map((c) => renderComment(c, thread)).join("") +
        "</ul>" +
        '<form class="thread-reply" data-thread-id="' + escapeHtml(thread.id) + '">' +
          '<textarea class="thread-reply-input" data-role="reply-input" rows="2" maxlength="4000" placeholder="Reply…" required></textarea>' +
          '<div class="thread-reply-actions">' +
            '<button type="submit" class="thread-reply-submit">Reply</button>' +
          "</div>" +
        "</form>" +
      "</article>"
    );
  };

  const renderSidebar = () => {
    const list = document.getElementById("comments-list");
    const count = document.getElementById("comments-count");
    if (!list) return;
    const filtered = state.threads.filter((t) => {
      if (state.filter === "open") return t.status === "OPEN";
      if (state.filter === "resolved") return t.status === "RESOLVED";
      return true;
    });
    if (count) {
      const openCount = state.threads.filter((t) => t.status === "OPEN").length;
      count.textContent = openCount + " open / " + state.threads.length + " total";
    }
    if (filtered.length === 0) {
      list.innerHTML = '<p class="comments-empty">No ' + (state.filter === "all" ? "" : state.filter + " ") + 'comments yet. Highlight any text in the document to start a thread.</p>';
      return;
    }
    list.innerHTML = filtered.map(renderThread).join("");
  };

  const focusThread = (threadId, options) => {
    state.activeThreadId = threadId;
    renderSidebar();
    const card = document.querySelector('.thread-card[data-thread-id="' + threadId + '"]');
    if (card && options && options.scroll) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const preview = document.getElementById("report-preview");
    if (preview) {
      preview.querySelectorAll("mark.fb-highlight.is-active").forEach((el) => el.classList.remove("is-active"));
      const mark = preview.querySelector('mark.fb-highlight[data-thread-id="' + threadId + '"]');
      if (mark) {
        mark.classList.add("is-active");
        if (options && options.scrollDoc) {
          mark.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  // ─── Mutations ──────────────────────────────────────────────────

  const refresh = async () => {
    try {
      const threads = await api.listThreads(state.ctx.resourceType, state.ctx.resourceId);
      state.threads = Array.isArray(threads) ? threads : [];
      renderSidebar();
      renderHighlights();
    } catch (err) {
      showToast(err.message || "Failed to load comments", "error");
    }
  };

  const beginNewThread = async (anchor) => {
    const identity = await ensureIdentity();
    let body;
    try {
      body = await openCommentModal({
        title: "Add comment",
        description: "Comment on the highlighted text.",
        placeholder: "Write your comment",
        submitLabel: "Add comment",
      });
    } catch (_) {
      return;
    }
    const payload = {
      resourceType: state.ctx.resourceType,
      resourceId: state.ctx.resourceId,
      anchor,
      body,
      authorClientId: getClientId(),
      authorName: identity.name,
      authorEmail: identity.email,
    };
    const created = await api.createThread(payload);
    state.activeThreadId = created.id;
    showToast("Comment added", "success");
    await refresh();
    focusThread(created.id, { scrollDoc: true });
  };

  const replyToThread = async (threadId, body) => {
    const identity = await ensureIdentity();
    await api.addComment(threadId, {
      body: body.trim(),
      authorClientId: getClientId(),
      authorName: identity.name,
      authorEmail: identity.email,
    });
    showToast("Reply posted", "success");
    state.activeThreadId = threadId;
    await refresh();
  };

  const toggleThreadStatus = async (threadId) => {
    const thread = state.threads.find((t) => t.id === threadId);
    if (!thread) return;
    const identity = await ensureIdentity();
    const nextStatus = thread.status === "OPEN" ? "RESOLVED" : "OPEN";
    await api.updateThreadStatus(threadId, {
      status: nextStatus,
      authorClientId: getClientId(),
      authorName: identity.name,
    });
    showToast(nextStatus === "RESOLVED" ? "Marked resolved" : "Reopened", "success");
    await refresh();
  };

  const editCommentInline = async (commentId, card) => {
    const textEl = card.querySelector('[data-role="comment-text"]');
    if (!textEl) return;
    const current = textEl.textContent;
    let next;
    try {
      next = await openCommentModal({
        title: "Edit comment",
        description: "Update the selected comment.",
        initialValue: current,
        placeholder: "Update your comment",
        submitLabel: "Save comment",
      });
    } catch (_) {
      return;
    }
    const trimmed = next.trim();
    if (!trimmed) {
      showToast("Comment can't be empty", "error");
      return;
    }
    if (trimmed === current.trim()) return;
    try {
      await api.editComment(commentId, {
        body: trimmed,
        authorClientId: getClientId(),
      });
      showToast("Comment updated", "success");
      await refresh();
    } catch (err) {
      showToast(err.message || "Could not update", "error");
    }
  };

  const deleteCommentRow = async (commentId) => {
    let confirmed = false;
    try {
      confirmed = await openConfirmModal({
        title: "Delete comment?",
        description: "If this is the only comment in the thread, the whole thread will be removed.",
        submitLabel: "Delete comment",
      });
    } catch (_) {
      return;
    }
    if (!confirmed) {
      return;
    }
    try {
      await api.deleteComment(commentId, getClientId());
      showToast("Comment deleted", "success");
      await refresh();
    } catch (err) {
      showToast(err.message || "Could not delete", "error");
    }
  };

  // ─── Sidebar event wiring ───────────────────────────────────────

  const wireSidebar = () => {
    const panel = document.getElementById("comments-panel");
    if (!panel) return;

    panel.addEventListener("click", async (event) => {
      const filterBtn = event.target.closest(".comments-filter-btn");
      if (filterBtn) {
        state.filter = filterBtn.dataset.filter;
        panel.querySelectorAll(".comments-filter-btn").forEach((btn) => {
          const active = btn === filterBtn;
          btn.classList.toggle("is-active", active);
          btn.setAttribute("aria-selected", active ? "true" : "false");
        });
        renderSidebar();
        renderHighlights();
        return;
      }

      const card = event.target.closest(".thread-card");
      const actionBtn = event.target.closest("[data-action]");
      if (actionBtn) {
        event.preventDefault();
        const action = actionBtn.dataset.action;
        if (action === "toggle-status") {
          await toggleThreadStatus(actionBtn.dataset.threadId);
        } else if (action === "edit-comment") {
          const row = actionBtn.closest(".comment-item");
          if (row) await editCommentInline(actionBtn.dataset.commentId, row);
        } else if (action === "delete-comment") {
          await deleteCommentRow(actionBtn.dataset.commentId);
        }
        return;
      }

      if (card) {
        focusThread(card.dataset.threadId, { scrollDoc: true });
      }
    });

    panel.addEventListener("submit", async (event) => {
      const form = event.target.closest(".thread-reply");
      if (!form) return;
      event.preventDefault();
      const input = form.querySelector('[data-role="reply-input"]');
      if (!input) return;
      const body = input.value.trim();
      if (!body) return;
      try {
        await replyToThread(form.dataset.threadId, body);
        input.value = "";
      } catch (err) {
        if (err.message !== "cancelled") showToast(err.message || "Failed to reply", "error");
      }
    });
  };

  // ─── Init ───────────────────────────────────────────────────────

  const mount = (ctx) => {
    state.ctx = ctx;
    if (ctx.resourceType !== "DOC_APPROVAL") {
      // future: also enable for testing reports
      return;
    }
    const panel = document.getElementById("comments-panel");
    const shell = document.getElementById("report-shell");
    if (panel) panel.hidden = false;
    if (shell) shell.classList.add("has-comments");
    updateIdentityLabel();
    refresh();
  };

  const init = () => {
    if (state.initialized) return;
    state.initialized = true;
    wireIdentityForm();
    wireCommentForm();
    wireConfirmForm();
    wireSelectionToolbar();
    wireSidebar();

    const preview = document.getElementById("report-preview");
    if (!preview) return;
    preview.addEventListener("softlogic:doc-rendered", (event) => {
      const detail = (event && event.detail) || window.SOFTLOGIC_DOC_CONTEXT;
      if (!detail) return;
      mount(detail);
    });
    // if event already fired before script loaded
    if (window.SOFTLOGIC_DOC_CONTEXT) {
      mount(window.SOFTLOGIC_DOC_CONTEXT);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
