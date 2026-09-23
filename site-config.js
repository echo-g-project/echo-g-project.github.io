/* ECHO-G v3 — content configuration.
 * Empty Paper/Code/Dataset links remain disabled; no publishing status is invented.
 * Updated gallery is derived only from the newly supplied archive.
 * 9.mp4: source 9-4.mp4 from 4 seconds to end; 15.mp4: source 15-15.mp4 from 0 to 15 seconds.
 * Comparison is one synchronized AO | AT | TO video, using only the AT source audio.
 * Keep author/affiliation/citation fields empty for the anonymous build.
 */
window.ECHO_G_CONFIG = {
  "projectName": "ECHO-G",
  "title": "Embodied Co-speech Humanoid mOtion Generation",
  "mode": "anonymous",
  "links": {
    "paper": "",
    "code": "",
    "dataset": ""
  },
  "authors": [],
  "affiliations": [],
  "citation": "",
  "mainVideo": {
    "src": "assets/videos/long-video.mp4",
    "poster": "assets/posters/cover-page.webp",
    "durationSeconds": 180.259259
  },
  "cover": {
    "src": "assets/images/cover-page.png",
    "title": "ECHO-G overview",
    "alt": "ECHO-G overview: joint audio–text generation, a paired dataset, a benchmark and real-robot whole-body execution."
  },
  "gallery": {
    "initialVisible": 6,
    "videos": [
      {
        "id": 1,
        "title": "Trial 01",
        "src": "assets/videos/real-robot-videos/1.mp4",
        "poster": "assets/posters/trial-01.jpg",
        "durationSeconds": 23.2
      },
      {
        "id": 2,
        "title": "Trial 02",
        "src": "assets/videos/real-robot-videos/2.mp4",
        "poster": "assets/posters/trial-02.jpg",
        "durationSeconds": 24.3
      },
      {
        "id": 4,
        "title": "Trial 04",
        "src": "assets/videos/real-robot-videos/4.mp4",
        "poster": "assets/posters/trial-04.jpg",
        "durationSeconds": 21.033991
      },
      {
        "id": 6,
        "title": "Trial 06",
        "src": "assets/videos/real-robot-videos/6.mp4",
        "poster": "assets/posters/trial-06.jpg",
        "durationSeconds": 22.033333
      },
      {
        "id": 7,
        "title": "Trial 07",
        "src": "assets/videos/real-robot-videos/7.mp4",
        "poster": "assets/posters/trial-07.jpg",
        "durationSeconds": 21.2
      },
      {
        "id": 8,
        "title": "Trial 08",
        "src": "assets/videos/real-robot-videos/8.mp4",
        "poster": "assets/posters/trial-08.jpg",
        "durationSeconds": 18.733991
      },
      {
        "id": 9,
        "title": "Trial 09",
        "src": "assets/videos/real-robot-videos/9.mp4",
        "poster": "assets/posters/trial-09.jpg",
        "durationSeconds": 17.313991
      },
      {
        "id": 10,
        "title": "Trial 10",
        "src": "assets/videos/real-robot-videos/10.mp4",
        "poster": "assets/posters/trial-10.jpg",
        "durationSeconds": 30.033333
      },
      {
        "id": 11,
        "title": "Trial 11",
        "src": "assets/videos/real-robot-videos/11.mp4",
        "poster": "assets/posters/trial-11.jpg",
        "durationSeconds": 19.9
      },
      {
        "id": 12,
        "title": "Trial 12",
        "src": "assets/videos/real-robot-videos/12.mp4",
        "poster": "assets/posters/trial-12.jpg",
        "durationSeconds": 14.5
      },
      {
        "id": 13,
        "title": "Trial 13",
        "src": "assets/videos/real-robot-videos/13.mp4",
        "poster": "assets/posters/trial-13.jpg",
        "durationSeconds": 20.833333
      },
      {
        "id": 14,
        "title": "Trial 14",
        "src": "assets/videos/real-robot-videos/14.mp4",
        "poster": "assets/posters/trial-14.jpg",
        "durationSeconds": 24.367007
      },
      {
        "id": 15,
        "title": "Trial 15",
        "src": "assets/videos/real-robot-videos/15.mp4",
        "poster": "assets/posters/trial-15.jpg",
        "durationSeconds": 15.0
      }
    ]
  },
  "comparison": {
    "src": "assets/videos/comparison/conditioning-comparison.mp4",
    "poster": "assets/posters/conditioning-comparison.jpg",
    "durationSeconds": 15.06975,
    "order": [
      {
        "id": "audio-only",
        "label": "Audio-only",
        "detail": "Acoustic conditioning",
        "src": "assets/videos/comparison/audio-only.mp4"
      },
      {
        "id": "audio-text",
        "label": "Audio + Text",
        "detail": "Ours · Joint conditioning",
        "src": "assets/videos/comparison/audio-text.mp4"
      },
      {
        "id": "text-only",
        "label": "Text-only",
        "detail": "Linguistic conditioning",
        "src": "assets/videos/comparison/text-only.mp4"
      }
    ]
  },
  "tables": [
    {
      "id": "pipelines",
      "title": "Generation pipelines",
      "number": "Table I",
      "description": "Direct robot-space generation and human-motion generation followed by retargeting or learned mapping.",
      "source": "assets/tables/TABLE1.png",
      "columns": [
        {
          "label": "FGD",
          "direction": "down",
          "description": "Fréchet Gesture Distance"
        },
        {
          "label": "ΔDiv",
          "direction": "down",
          "description": "Absolute gap to the reference diversity statistic"
        },
        {
          "label": "MM",
          "direction": "up",
          "description": "Multimodality"
        },
        {
          "label": "ΔBA",
          "direction": "down",
          "description": "Absolute gap to the reference Beat Alignment statistic"
        },
        {
          "label": "ΔJerk",
          "direction": "down",
          "description": "Absolute gap to the reference jerk statistic"
        },
        {
          "label": "Foot Err.",
          "unit": "m",
          "direction": "down",
          "description": "Foot-ground error"
        },
        {
          "label": "C-Slide",
          "unit": "m/s",
          "direction": "down",
          "description": "Contact sliding speed"
        },
        {
          "label": "E2E Time",
          "unit": "ms/frame",
          "direction": "down",
          "description": "End-to-end processing time per output frame"
        },
        {
          "label": "Peak RAM Δ",
          "unit": "MB",
          "direction": "down",
          "description": "Peak system RAM increase"
        }
      ],
      "groups": [
        {
          "name": "Co-Speech Motion Characteristics",
          "span": 4
        },
        {
          "name": "Robot Motion Quality",
          "span": 3
        },
        {
          "name": "Efficiency",
          "span": 2
        }
      ],
      "rows": [
        {
          "method": "EMAGE+GMR",
          "values": [
            "4.976",
            "0.749",
            "0",
            "0.172",
            "26.951",
            "0.013",
            "0.163",
            "21.3",
            "2661"
          ]
        },
        {
          "method": "GestureLSM+GMR",
          "values": [
            "5.008",
            "0.561",
            "1.016",
            "0.158",
            "24.444",
            "0.010",
            "0.169",
            "20.5",
            "3804"
          ]
        },
        {
          "method": "Human-Retargeted",
          "values": [
            "4.725",
            "0.408",
            "1.498",
            "0.161",
            "8.001",
            "0.003",
            "0.050",
            "6.56",
            "18714"
          ]
        },
        {
          "method": "Ours",
          "ours": true,
          "values": [
            "2.278",
            "0.320",
            "1.786",
            "0.063",
            "9.039",
            "0.008",
            "0.052",
            "5.96",
            "18542"
          ]
        }
      ],
      "note": "ΔDiv, ΔBA and ΔJerk are absolute deviations from matched ground-truth statistics over each method’s evaluated motion range."
    },
    {
      "id": "modalities",
      "title": "Conditioning modalities",
      "number": "Table II",
      "description": "Audio-only, text-only and joint audio–text conditioning in the robot-space generator.",
      "source": "assets/tables/TABLE2.png",
      "columns": [
        {
          "label": "FGD",
          "direction": "down",
          "description": "Fréchet Gesture Distance"
        },
        {
          "label": "ΔDiv",
          "direction": "down",
          "description": "Absolute gap to the reference diversity statistic"
        },
        {
          "label": "MM",
          "direction": "up",
          "description": "Multimodality"
        },
        {
          "label": "ΔBA",
          "direction": "down",
          "description": "Absolute gap to the reference Beat Alignment statistic"
        },
        {
          "label": "ΔJerk",
          "direction": "down",
          "description": "Absolute gap to the reference jerk statistic"
        },
        {
          "label": "Foot Err.",
          "unit": "m",
          "direction": "down",
          "description": "Foot-ground error"
        },
        {
          "label": "C-Slide",
          "unit": "m/s",
          "direction": "down",
          "description": "Contact sliding speed"
        }
      ],
      "groups": [],
      "rows": [
        {
          "method": "Audio-only",
          "values": [
            "2.360",
            "0.360",
            "1.702",
            "0.081",
            "4.497",
            "0.008",
            "0.038"
          ]
        },
        {
          "method": "Text-only",
          "values": [
            "2.436",
            "0.429",
            "1.681",
            "0.113",
            "5.940",
            "0.009",
            "0.049"
          ]
        },
        {
          "method": "Ours",
          "ours": true,
          "values": [
            "2.278",
            "0.320",
            "1.786",
            "0.063",
            "9.039",
            "0.008",
            "0.052"
          ]
        }
      ],
      "note": "ΔDiv, ΔBA and ΔJerk use shared ground-truth statistics. Ties at the displayed precision receive identical highlighting."
    }
  ],
  "architecture": {
    "src": "assets/images/Arch-4.png",
    "alt": "SGDiT architecture and tracking interface: acoustic conditions enter the motion sequence, while transcript conditions enter through cross-attention.",
    "caption": "Frame-aligned acoustic features and token-level transcript features condition robot-motion generation. The joint-position components of the generated references are executed by a fixed whole-body motion tracker."
  },
  "abstract": "Generating full-body co-speech motion for humanoid robots requires coordinating speech prosody, linguistic content, and embodiment-specific motion. To this end, we present ECHO-G, a framework that jointly conditions full-body robot-motion generation on speech audio and timed transcripts. Its Speech-Grounded Diffusion Transformer (SGDiT) integrates frame-aligned acoustic features into the motion stream and retrieves token-level linguistic context through global and temporally biased cross-attention. Trained with rectified flow matching, SGDiT models the one-to-many relationship between utterances and accompanying gestures directly in robot space. To support training and evaluation, we introduce a BEAT2-derived dataset pairing audio and timed transcripts with robot motion, together with a benchmark covering co-speech characteristics, robot-motion quality, and runtime efficiency. Comparative evaluation supports direct robot-space generation over the evaluated human-motion generation and retargeting pipelines, while modality ablations highlight the benefits of joint audio–text conditioning. We further demonstrate deployment on a physical humanoid robot. A complementary video-rating user study also favors joint conditioning over the compared configurations.",
  "releaseStatement": "The dataset and code for training, inference, and evaluation are publicly available on the project page.",
  "showReleaseStatement": false
};
