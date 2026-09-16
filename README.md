# DPO Brah website

A simple two-page static site prepared for GitHub and Netlify.

## What is included

- `index.html` — image-led homepage
- `videos.html` — filterable video archive that loads a clip only after it is selected
- `assets/images/homepage/` — nine curated, optimized WebP images
- `assets/images/video-posters/` — lightweight video preview images
- `assets/videos/` — ten MP4 clips from the approved media folder
- `media-catalog.json` — source-to-web filename map for every included image and video
- `netlify.toml` — zero-build Netlify configuration

## Easiest publishing workflow

1. Create a GitHub repository and upload this entire folder.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select the GitHub repository.
4. Leave the build command empty. The publish directory is already configured.
5. Deploy the site.

## Adding a homepage image

1. Resize and save the image as WebP.
2. Give it a short lowercase filename such as `dpo-training-back.webp`.
3. Put it in `assets/images/homepage/`.
4. Add the image to `index.html` and include useful alt text.

## Adding a video

1. Keep the clip as a browser-friendly MP4 and aim for roughly 1–5 MB when possible.
2. Give it a short lowercase filename and place it in `assets/videos/`.
3. Add a WebP preview image with the same basic name to `assets/images/video-posters/`.
4. Duplicate one `.video-card` block in `videos.html` and update its title, category, video, poster and Instagram link.

The source folder stays outside the website repository. The homepage uses only selected still photos from `Website Pics`; the Videos page contains all ten clips from that same folder.
