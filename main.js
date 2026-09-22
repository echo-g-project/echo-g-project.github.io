/* ECHO-G static page. No dependencies, tracking, uploads, or inference requests. */
(() => {
  "use strict";
  const config = window.ECHO_G_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const text = (value) => typeof value === "string" ? value.trim() : "";
  const safeURL = (value, media = false) => {
    const url = text(value);
    if (!url || /[\u0000-\u001f\u007f]/.test(url)) return "";
    try {
      const parsed = new URL(url, document.baseURI);
      // Local file previews and relative assets work without a server.
      const permitted = ["http:", "https:"];
      if (location.protocol === "file:") permitted.push("file:");
      if (media && parsed.protocol === "blob:") return url;
      return permitted.includes(parsed.protocol) ? url : "";
    } catch (_) { return ""; }
  };

  const projectName = text(config.projectName) || "ECHO-G";
  $$('[data-project-name]').forEach((node) => { node.textContent = projectName; });
  if (text(config.paperTitle)) $('[data-paper-title]').textContent = text(config.paperTitle);
  if (text(config.description)) $('[data-description]').textContent = text(config.description);
  document.title = `${projectName} · Humanoid Co-speech Motion Generation`;
  const description = $('meta[name="description"]');
  if (description && text(config.description)) description.content = text(config.description);
  if (config.showPreviewBadge === false) $$('[data-preview-badge]').forEach((node) => { node.hidden = true; });

  // Never turn empty or invalid links into misleading anchors.
  let linkedResourceCount = 0;
  ["paper", "code", "dataset"].forEach((key) => {
    const url = safeURL(config.links && config.links[key]);
    if (!url) return;
    linkedResourceCount += 1;
    $$(`[data-resource="${key}"]`).forEach((button) => {
      const anchor = document.createElement("a");
      anchor.className = button.className;
      anchor.dataset.resource = key;
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      while (button.firstChild) anchor.appendChild(button.firstChild);
      const pendingLabel = anchor.querySelector(".button-status");
      if (pendingLabel) pendingLabel.remove();
      button.replaceWith(anchor);
    });
    const state = $(`[data-state="${key}"]`);
    if (state) { state.textContent = "Linked"; state.classList.add("available"); }
  });
  if (linkedResourceCount === 3) {
    $('#hero-pending-note').hidden = true;
    $('#resource-note').textContent = "Paper, code, and paired data.";
  } else if (linkedResourceCount > 0) {
    $('#hero-pending-note').textContent = "Additional resources will be linked here.";
  }

  const demo = config.demo || {};
  const videoURL = safeURL(demo.src, true);
  if (videoURL) {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    video.setAttribute("aria-label", `${projectName} real-robot demonstration`);
    const poster = safeURL(demo.poster, true);
    if (poster) video.poster = poster;
    const trackURL = safeURL(demo.captions, true);
    if (trackURL) {
      const track = document.createElement("track");
      track.kind = "captions";
      track.src = trackURL;
      track.srclang = text(demo.captionsLanguage) || "en";
      track.label = text(demo.captionsLabel) || "English";
      video.appendChild(track);
    }
    video.src = videoURL;
    $('#video-placeholder').hidden = true;
    $('#video-stage').appendChild(video);
    $('#demo-caption').textContent = text(demo.caption) || "Real-robot demonstration.";
    video.addEventListener("error", () => {
      video.remove();
      const placeholder = $('#video-placeholder');
      placeholder.hidden = false;
      placeholder.querySelector('.stage-status').textContent = "Video unavailable";
      placeholder.querySelector('.video-empty-center p').textContent = "This video could not be loaded. Please check the media link.";
      placeholder.setAttribute('aria-label', 'The configured demonstration video could not be loaded.');
      $('#demo-caption').textContent = "Video unavailable · Check the configured file path or format.";
    }, { once: true });
  }

  const overview = config.overview || {};
  const imageURL = safeURL(overview.image, true);
  if (imageURL) {
    const image = document.createElement("img");
    image.alt = text(overview.alt) || `${projectName} overview`;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("load", () => {
      $('#figure-placeholder').hidden = true;
      $('#overview-caption').textContent = text(overview.caption);
    }, { once: true });
    image.addEventListener("error", () => {
      image.remove();
      $('#figure-placeholder').hidden = false;
      $('#figure-placeholder .figure-empty-center span').textContent = "The figure could not be loaded. Please check the file path.";
      $('#overview-caption').textContent = "Figure unavailable · Check the configured image path.";
    }, { once: true });
    image.src = imageURL;
    $('#figure-stage').appendChild(image);
  }

  // These fields must also be removed from the source configuration for blind review.
  // Rendering rules alone cannot anonymize identifying strings in a distributed file.
  if (config.mode === "public") {
    const authors = Array.isArray(config.authors) ? config.authors : [];
    authors.forEach((author) => {
      if (!author || !text(author.name)) return;
      const url = safeURL(author.url);
      const node = document.createElement(url ? "a" : "span");
      node.textContent = text(author.name);
      if (url) { node.href = url; node.target = "_blank"; node.rel = "noopener noreferrer"; }
      if (text(author.affiliation)) {
        const sup = document.createElement("sup");
        sup.textContent = text(author.affiliation);
        node.appendChild(sup);
      }
      $('#authors').appendChild(node);
    });
    $('#authors').hidden = !$('#authors').children.length;
    const affiliations = Array.isArray(config.affiliations) ? config.affiliations : [];
    affiliations.forEach((affiliation) => {
      if (!text(affiliation)) return;
      const p = document.createElement("p");
      p.textContent = text(affiliation);
      $('#affiliations').appendChild(p);
    });
    $('#affiliations').hidden = !$('#affiliations').children.length;
    if (text(config.citation)) {
      $('#citation').hidden = false;
      $('#citation-code').textContent = text(config.citation);
    }
  }

  $('#copy-citation').addEventListener('click', async () => {
    const content = $('#citation-code').textContent;
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard not available");
      await navigator.clipboard.writeText(content);
      $('#copy-status').textContent = 'BibTeX copied.';
    } catch (_) {
      // Manual selection works when clipboard permission is unavailable, including file://.
      const range = document.createRange();
      range.selectNodeContents($('#citation-code'));
      const selection = window.getSelection();
      if (selection) { selection.removeAllRanges(); selection.addRange(range); }
      $('#copy-status').textContent = 'Citation selected. Press Ctrl+C or Cmd+C to copy.';
    }
  });

  const materialCount = linkedResourceCount + Number(Boolean(videoURL)) + Number(Boolean(imageURL));
  const footerState = config.showPreviewBadge === false && materialCount === 5
    ? 'Research project'
    : (materialCount === 5 ? 'Project preview' : 'Project preview · Materials pending');
  $('#footer-status').textContent = footerState;
})();
