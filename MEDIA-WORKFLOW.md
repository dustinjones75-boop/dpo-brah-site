# DPO Brah media workflow

## Approved source

The current site media comes only from `C:\Users\dusti\OneDrive\Desktop\Website Pics`.

- Still photos are used on the homepage.
- MP4 clips and their extracted poster frames are used only on the Videos page.
- The image named `Second Highlest Like.jpg` is intentionally not on the homepage because its large embedded joke text conflicts with the coaching message.

## Homepage shortlist

The homepage uses nine optimized still photos:

| Web filename | Placement | Why it was selected |
|---|---|---|
| `dpo-hero.webp` | Hero | Strongest black-tank image and closest match to the original mockup. |
| `dpo-physique.webp` | Proof and application | High-impact front physique portrait. |
| `dpo-training.webp` | Protocol | Dark gym setting with a candid training feel. |
| `dpo-back.webp` | Philosophy and CTA | Clear back development image. |
| `dpo-competition.webp` | Proof | Adds genuine competition context. |
| `dpo-mindset.webp` | Protocol | Looser, less polished pose for the raw direction. |
| `dpo-aesthetic.webp` | Proof | Strong overhead pose and warm contrast. |
| `dpo-longevity.webp` | Mindset | Training-floor image with a natural gym atmosphere. |
| `dpo-detail.webp` | Proof | Clean mirror image for visual variety. |

All homepage photos are converted to WebP and limited to 1800 × 2200 pixels without enlarging the originals.

## Video archive rules

- The Videos page contains all ten MP4 clips currently in the approved folder.
- Every clip has a WebP poster, so the page displays fast image cards and loads the MP4 only after a visitor selects it.
- Filenames are lowercase, descriptive and URL-safe.
- New clips should normally remain under 5 MB. Replace or compress anything much larger before adding it to GitHub.
- Keep categories limited to `physique`, `training` and `lifestyle` unless the site needs a genuinely new section.

## Folder structure

```text
assets/
  images/
    homepage/
    video-posters/
  videos/
```

`media-catalog.json` is the source-of-truth map from each web asset back to its original archive filename and Instagram post.
