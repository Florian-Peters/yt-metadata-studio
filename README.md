# yt-metadata-studio

yt-metadata-studio is a local-first creator tool for generating YouTube and social media metadata for music and video uploads. It helps creators turn a video idea into titles, descriptions, hashtags, thumbnail text, Shorts-style wording and TikTok captions using reusable channel presets. The MVP runs fully in the browser, so no backend, database or API key is required.

## Features

- Template-based metadata generation with no paid API required
- Presets for Neon Hunter Nova, Nelfij, BambiniBeats and Generic Creator
- 5 YouTube title ideas per generation
- Full YouTube description and short description under 100 characters
- 10 hashtags, 3 thumbnail text ideas and 3 TikTok captions
- Copy button for each output block
- Copy All button for the complete metadata pack
- Regenerate button for alternate wording
- Responsive dashboard layout with local state only

## Screenshots

Replace this placeholder with a screenshot after your first local run.

```md
![Dashboard screenshot](./docs/screenshot-dashboard.png)
```

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Local browser state

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Florian-Peters/yt-metadata-studio.git
cd yt-metadata-studio
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Usage

1. Enter a video or song title.
2. Describe the main topic, story or creative angle.
3. Choose a channel/project preset.
4. Select the video type, language and mood.
5. Click **Generate metadata**.
6. Copy individual sections or use **Copy All**.
7. Click **Regenerate** to create a slightly different wording pass.

The MVP is fully local. It does not send prompts, titles or generated metadata to a backend service.

## Available Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

Use `npm run build` before publishing a release because it runs the Next.js production build and validates the app route.

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    CopyButton.tsx
    MetadataForm.tsx
    OutputCard.tsx
    PresetSelector.tsx
  data/
    presets.ts
  lib/
    generateMetadata.ts
```

## Future Roadmap

- Save custom presets
- Export metadata as `.txt` or `.md`
- Add optional OpenAI API support
- Add generation history
- Add YouTube SEO scoring
- Add thumbnail prompt generator

## License

MIT License. Use, modify and publish freely.
