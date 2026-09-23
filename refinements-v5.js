/* ECHO-G v5 — presentation only. Load after main.js.
 * Consecutive display numbers do not rename media or change their source IDs.
 * Source config, scientific results, video cuts and playback logic are untouched.
 */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  // Use a crisp, thicker vector arrow instead of a thin font-dependent glyph.
  const directionIcon = (up) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 20 26');
    svg.setAttribute('focusable','false'); svg.setAttribute('aria-hidden','true');
    const path = document.createElementNS(svg.namespaceURI,'path');
    path.setAttribute('d',up ? 'M10 23V3M4 9l6-6 6 6' : 'M10 3v20M4 17l6 6 6-6');
    svg.append(path); return svg;
  };

  const grid = $('#trial-grid');
  const toggle = $('#gallery-toggle');
  const renumberTrials = () => {
    if (!grid) return;
    const cards = $$('.trial-card', grid);
    cards.forEach((card, i) => {
      const index = String(i + 1).padStart(2, '0');
      const title = `Trial ${index}`;
      card.dataset.displayTrial = index;
      const heading = card.querySelector('.trial-meta h3');
      if (heading) heading.textContent = title;
      const video = card.querySelector('video');
      if (video) video.setAttribute('aria-label', `${title} — real-robot demonstration`);
      const play = card.querySelector('.video-play');
      if (play) play.setAttribute('aria-label', `Play ${title}`);
    });
    const count = $('#trial-count');
    if (count) count.textContent = `${cards.length} trials`;
    const label = toggle?.querySelector('span');
    if (label) label.textContent = toggle.getAttribute('aria-expanded') === 'true'
      ? 'Show fewer trials'
      : `Show all ${cards.length} trials`;
  };
  renumberTrials();
  // The existing gallery handler runs first; then update its display label.
  toggle?.addEventListener('click', renumberTrials);
  if (grid && 'MutationObserver' in window) {
    new MutationObserver(renumberTrials).observe(grid, { childList: true });
  }

  // Labels already identify the conditions; remove their repetitive sublabels.
  $$('.comparison-label').forEach((label, i) => {
    label.querySelector('small')?.remove();
    if (i === 1 && !label.querySelector('.ours-label')) {
      const badge = document.createElement('span');
      badge.className = 'ours-label'; badge.textContent = 'Ours';
      label.append(badge);
    }
  });
  $$('#comparison-links a').forEach(a => {
    const textNode = Array.from(a.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = 'Open video ';
  });

  // Remove repeated table introductions, but keep protocol and tie notes intact.
  const cards = $$('.benchmark-card');
  cards.forEach(card => {
    const header = card.querySelector('.benchmark-head');
    if (header) $$('p',header).forEach(n => n.remove());
    const number = card.querySelector('.benchmark-number');
    const heading = header?.querySelector('h3');
    if (number && heading) {
      const original = heading.textContent;
      const num = number.textContent.trim();
      number.remove();
      const prefix = document.createElement('span');
      prefix.className = 'inline-table-number'; prefix.textContent = num;
      heading.textContent = original;
      heading.prepend(prefix);
    }

    // Keep metric name and arrow together. Arrows have their own high-contrast size.
    $$('thead th', card).forEach(th => {
      const name = th.querySelector('.metric-name');
      const arrow = th.querySelector('.metric-arrow');
      if (!name || !arrow) return;
      const direction = arrow.textContent.includes('↑') ? '↑' : '↓';
      arrow.replaceChildren(directionIcon(direction === '↑'));
      arrow.dataset.direction = direction;
      arrow.setAttribute('aria-hidden','true');
      const title = name.title || name.textContent;
      th.setAttribute('aria-label', `${title}, ${direction === '↑' ? 'higher' : 'lower'} is better`);
      const row = document.createElement('span');
      row.className = 'metric-heading';
      th.insertBefore(row,name); row.append(name,arrow);
    });

    // A single brief cue appears only when the table really needs horizontal scrolling.
    const hint = card.querySelector('.scroll-hint');
    const scroll = card.querySelector('.table-scroll');
    if (hint && scroll) {
      hint.textContent = 'Scroll table →';
      const refresh = () => { hint.hidden = scroll.scrollWidth <= scroll.clientWidth + 1; };
      requestAnimationFrame(refresh);
      if ('ResizeObserver' in window) new ResizeObserver(refresh).observe(scroll);
      else window.addEventListener('resize', refresh, { passive: true });
    }
  });

  const legend=$('.ranking-legend');
  if (legend) {
    legend.replaceChildren();
    const add=(tag,label,tail)=>{
      const group=document.createElement('span');
      const lead=document.createElement(tag);lead.textContent=label;
      group.append(lead,document.createTextNode(tail));legend.append(group);
    };
    add('strong','Bold',': best');add('u','Underline',': second-best');
    for (const [symbol,label] of [['↓','Lower is better'],['↑','Higher is better']]) {
      const group=document.createElement('span');group.className='direction-legend';
      const arrow=document.createElement('span');arrow.className='legend-arrow';
      arrow.append(directionIcon(symbol === '↑'));arrow.setAttribute('aria-hidden','true');
      group.append(arrow,document.createTextNode(label));legend.append(group);
    }
  }
})();
