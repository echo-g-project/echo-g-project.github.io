# ECHO-G public project page

This is the public website repository, independent of `review-site` and its anonymous review snapshot.

## What this version contains

- Main video; 15 real-robot trials in original numeric order; the synchronized conditioning comparison.
- Two HTML benchmark tables; the architecture image `assets/images/Arch-5.png`; the supplied abstract.
- An ordinary MP4 playback path. No anonymous-media data scripts are required on GitHub Pages.
- Optional authors, affiliations, citation, and Paper / Code / Dataset links. Empty values stay hidden or disabled.

The synchronization does not change experimental values, video timing, or audio. The existing public main video is kept rather than replaced by the smaller anonymous-hosting copy.

## Editing the public version

Edit `site-config.js`:

- `links.paper`, `links.code`, `links.dataset`: fill real public URLs when ready. Empty strings keep the corresponding button disabled.
- `authors`: an array of objects with `name` and optional `url`.
- `affiliations`: an array of strings.
- `citation`: the verified BibTeX text, or an empty string.
- `gallery`: all 15 videos are listed directly here; no separate restoration script is needed.
- `architecture`: image source, alternative text and caption.
- `tables`: scientific values and comparison directions. Keep `data/results.json` consistent when changing results.
- `mode` remains `public`; `reviewBuild` remains `false`.

The `showReleaseStatement` flag remains false unless the claimed release is actually available. No new author information, publication status or resource URL has been invented.

`static.html` is a script-free fallback snapshot. After changing public links, authors, citation, tables or media, also update that static file; it does not evaluate `site-config.js`.

## Local preview and publication

Open `index.html` in a browser, or serve the repository with a local static-file server. Open `static.html` separately to check the fallback.

Use the existing GitHub Pages configuration for this repository. Review changes in GitHub Desktop, then Commit and Push when ready. No helper in the synchronization package performs Git operations.

## Keep the public and anonymous sites separate

Do not copy public author information, GitHub links, arXiv links, `robots.txt` or this public configuration back into the anonymous review site.

The old `readability-v5.css`, `refinements-v5.js`, and `gallery-restoration-v6.js` may remain in the repository for rollback. The current `index.html` no longer loads them. Their historical documentation is superseded by this README. Do not remove videos 3, 5 or 14: this version includes all 15 supplied trials.

The anonymous site's `seekable-media.js` and `assets/seekable-media/` stay untouched in `review-site`.
