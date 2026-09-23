/* ECHO-G gallery restoration v6.
 * Restores source videos 3, 5 and 14; original 12.mp4 is now 0–11 seconds.
 * Existing 9.mp4 and 15.mp4 and their previous trims are NOT modified.
 * The available source archive contains IDs 1–15. No source 16 is invented.
 * This merges only gallery metadata, preserving current resource links and tables.
 */
(() => {
  'use strict';
  const c = window.ECHO_G_CONFIG;
  if (!c) return;
  const gallery = c.gallery || (c.gallery = {});
  const current = Array.isArray(gallery.videos) ? gallery.videos.slice() : [];
  const sourceNumber = (m) => {
    const path = typeof m?.src === 'string' ? m.src.split(/[?#]/)[0].replace(/\\/g,'/') : '';
    const match = path.match(/(?:^|\/)real-robot-videos\/(\d+)\.mp4$/);
    const n = match ? Number(match[1]) : Number(m?.id);
    return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
  };
  const restored = [
  {
    "id": 3,
    "title": "Trial 03",
    "src": "assets/videos/real-robot-videos/3.mp4",
    "poster": "assets/posters/trial-03.jpg",
    "durationSeconds": 23.9
  },
  {
    "id": 5,
    "title": "Trial 05",
    "src": "assets/videos/real-robot-videos/5.mp4",
    "poster": "assets/posters/trial-05.jpg",
    "durationSeconds": 22.567007
  },
  {
    "id": 12,
    "title": "Trial 12",
    "src": "assets/videos/real-robot-videos/12.mp4?v=6-11s",
    "poster": "assets/posters/trial-12.jpg?v=6-11s",
    "durationSeconds": 11.0
  },
  {
    "id": 14,
    "title": "Trial 14",
    "src": "assets/videos/real-robot-videos/14.mp4",
    "poster": "assets/posters/trial-14.jpg",
    "durationSeconds": 24.367007
  }
];
  restored.forEach(media => {
    const index = current.findIndex(existing => sourceNumber(existing) === media.id);
    if (index === -1) current.push(media);
    else if (media.id === 12) {
      current[index] = { ...current[index], ...media };
    }
  });
  // Original numerical file order (not lexicographic 1,10,11,...).
  gallery.videos = current.sort((a,b) => sourceNumber(a) - sourceNumber(b));
})();
