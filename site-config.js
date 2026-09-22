/*
 * ECHO-G project page — editable content
 * Empty strings intentionally leave resources unavailable.
 * Do not add identifying information to the anonymous review build.
 * All assets may be local paths (e.g., assets/demo.mp4) or HTTPS URLs.
 */
window.ECHO_G_CONFIG = {
  mode: "anonymous", // "anonymous" or "public"
  showPreviewBadge: true,
  projectName: "ECHO-G",
  paperTitle: "Embodied Co-speech Humanoid mOtion Generation",
  description: "Full-body humanoid motion generated from speech audio and timed transcripts.",

  links: {
    paper: "",   // e.g., "assets/paper.pdf"
    code: "",    // final or anonymous repository URL
    dataset: ""  // final or anonymous dataset URL
  },

  demo: {
    src: "",       // e.g., "assets/demo.mp4"; use a direct video-file URL, not a webpage
    poster: "",    // e.g., "assets/demo-poster.jpg"
    captions: "",  // optional WebVTT file, e.g., "assets/demo-en.vtt"
    captionsLanguage: "en",
    captionsLabel: "English",
    caption: "A representative real-robot demonstration with the corresponding speech audio."
  },

  overview: {
    image: "", // e.g., "assets/overview.png" or "assets/overview.svg"
    alt: "ECHO-G framework overview: speech audio and timed transcripts condition full-body robot-motion generation, with paired data and a benchmark.",
    caption: "Joint acoustic–linguistic conditioning, robot-space generation, and real-robot execution."
  },

  // Used only by the public build. Keep these empty in an anonymous build.
  authors: [], // e.g., [{ name: "Author name", url: "https://...", affiliation: "1" }]
  affiliations: [], // e.g., ["1 · University or research organization"]
  citation: "" // complete, verified BibTeX; the citation section stays hidden while empty
};
