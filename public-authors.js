/* ECHO-G — public-page author information.
 * Source: author block supplied by the paper's authors, 2026-09-30.
 * Install ONLY in echo-g-project.github.io. Do not copy this file to review-site.
 * No changes to media, tables, resource links, or site-config.js.
 */
(() => {
  'use strict';
  const data = {
  "authors": [
    {
      "name": "Yizhao Li",
      "affiliations": [
        2,
        4
      ],
      "markers": [
        "*"
      ],
      "email": "liyizhao@buaa.edu.cn"
    },
    {
      "name": "Pusen Gao",
      "affiliations": [
        3,
        4
      ],
      "markers": [
        "*"
      ],
      "email": "pgaoak@connect.ust.hk"
    },
    {
      "name": "Ming Wang",
      "affiliations": [
        2
      ],
      "markers": [],
      "email": "wangming@buaa.edu.cn"
    },
    {
      "name": "Shaojie Shen",
      "affiliations": [
        3
      ],
      "markers": [],
      "email": "eeshaojie@ust.hk"
    },
    {
      "name": "Shuo Yang",
      "affiliations": [
        4
      ],
      "markers": [],
      "email": "shuo.yang@mondorobotics.com"
    },
    {
      "name": "Hao Xu",
      "affiliations": [
        1
      ],
      "markers": [
        "†"
      ],
      "email": "xuhao3e8@nju.edu.cn"
    }
  ],
  "affiliations": [
    {
      "id": 1,
      "name": "Nanjing University"
    },
    {
      "id": 2,
      "name": "Beihang University"
    },
    {
      "id": 3,
      "name": "The Hong Kong University of Science and Technology"
    },
    {
      "id": 4,
      "name": "Mondo Robotics"
    }
  ],
  "equalContribution": "Yizhao Li and Pusen Gao contributed equally to this work.",
  "correspondingAuthor": "Hao Xu",
  "correspondingEmail": "xuhao3e8@nju.edu.cn"
};

  // Defensive rendering check only: the source still contains identities.
  // This file must never be distributed in the anonymous review repository.
  function isReviewPage() {
    const host = location.hostname.toLowerCase();
    const path = location.pathname.toLowerCase();
    const config = window.ECHO_G_CONFIG || {};
    return host === 'anonymous.4open.science'
      || /(?:^|\/)review-site(?:\/|$)/.test(path)
      || config.reviewBuild === true
      || ['review', 'anonymous'].includes(config.mode);
  }
  const el = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  function renderAuthors() {
    if (isReviewPage()) return;
    const hero = document.querySelector('#top');
    const heading = hero?.querySelector('h1');
    if (!hero || !heading) return;
    let block = document.getElementById('public-authorship');
    if (!block) block = el('div', 'eg-authorship');
    block.id = 'public-authorship';
    block.className = 'eg-authorship';
    block.setAttribute('role', 'group');
    block.setAttribute('aria-label', 'Authors and affiliations');
    block.replaceChildren();

    const names = el('div', 'eg-author-list');
    names.setAttribute('role', 'list');
    for (const author of data.authors) {
      const item = el('span', 'eg-author');
      item.setAttribute('role', 'listitem');
      const link = el('a', 'eg-author-name', author.name);
      link.href = 'mailto:' + author.email;
      link.title = 'Email ' + author.name + ': ' + author.email;
      link.setAttribute('aria-label', 'Email ' + author.name);
      item.append(link);
      const mark = el('sup', 'eg-author-mark', [...author.affiliations, ...author.markers].join(','));
      const detail = author.affiliations.map(id => data.affiliations.find(a => a.id === id)?.name).filter(Boolean);
      if (author.markers.includes('*')) detail.push('Equal contribution');
      if (author.markers.includes('†')) detail.push('Corresponding author');
      mark.title = detail.join('; ');
      item.append(mark);
      names.append(item);
    }
    block.append(names);

    const affiliations = el('div', 'eg-affiliation-list');
    for (const group of [[1,2],[3,4]]) {
      const row = el('div', 'eg-affiliation-row');
      for (const id of group) {
        const affiliation = data.affiliations.find(a => a.id === id);
        const item = el('span', 'eg-affiliation');
        item.append(el('sup', '', String(id)), document.createTextNode(' ' + affiliation.name));
        row.append(item);
      }
      affiliations.append(row);
    }
    block.append(affiliations);

    const notes = el('div', 'eg-author-notes');
    const equal = el('p', 'eg-equal-note');
    equal.append(el('span', 'eg-note-marker', '*'), document.createTextNode(' ' + data.equalContribution));
    notes.append(equal);
    const corresponding = el('p', 'eg-corresponding-note');
    corresponding.append(el('span','eg-note-marker','†'), document.createTextNode(' Corresponding author: ' + data.correspondingAuthor + ' · '));
    const contact = el('a', 'eg-contact-email', data.correspondingEmail);
    contact.href = 'mailto:' + data.correspondingEmail;
    corresponding.append(contact);
    notes.append(corresponding);
    block.append(notes);

    heading.after(block);
    hero.classList.add('has-public-authorship');
    // Supersede the old empty/basic placeholders without changing their configuration.
    for (const id of ['authors','affiliations']) {
      const old = document.getElementById(id);
      if (old && old !== block && hero.contains(old)) old.hidden = true;
    }
    document.documentElement.dataset.echoAuthors = 'ready';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAuthors, { once: true });
  } else {
    renderAuthors();
  }
})();
