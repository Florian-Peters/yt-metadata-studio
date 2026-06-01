# yt-metadata-studio

A local-first metadata generator for YouTube creators, music projects, Shorts and TikTok captions.

yt-metadata-studio helps creators turn a rough video idea into publish-ready metadata: title ideas, descriptions, hashtags, thumbnail text and short-form captions. It is built around reusable channel presets, so each project can keep a consistent tone without needing a backend, database or paid API.

## GitHub Description

Local-first YouTube metadata generator for creators, music projects, Shorts and TikTok captions.

## Suggested Repository Topics

`youtube` `metadata-generator` `creator-tools` `nextjs` `typescript` `tailwindcss` `shorts` `tiktok` `music-creators` `local-first`

## Features

- Generate 5 YouTube title ideas from one creator brief
- Create a full YouTube description plus a short description under 100 characters
- Generate 10 hashtags, 3 thumbnail text ideas and 3 TikTok captions
- Use channel presets for consistent wording and positioning
- Included presets: Neon Hunter Nova, Nelfij, BambiniBeats and Generic Creator
- Copy individual output blocks or copy the complete metadata pack
- Regenerate alternate wording without changing the input
- Runs fully in the browser for the MVP
- No backend, database, account system or paid API required
- Responsive dashboard layout for desktop and mobile

## Screenshots

Add product screenshots here after running the app locally.

```md
![yt-metadata-studio dashboard](./docs/screenshot-dashboard.png)
![Generated metadata example](./docs/screenshot-output.png)
```

## Example Output

Input:

```text
Title: Neon Skyline Chase
Story: A futuristic chase through a rainy city with emotional synth melodies and game-inspired visuals.
Preset: Neon Hunter Nova
Video type: Music Video
Language: English
Mood: cinematic
```

Generated sample:

```text
YouTube title ideas
1. Neon Skyline Chase | cinematic cyberpunk
2. Neon Skyline Chase - shadowy Music Video
3. dark pop: Neon Skyline Chase
4. Neon Skyline Chase (Official Video)
5. neon-lit futuristic music for A futuristic chase through a rainy...

Short YouTube description
New: cinematic cyberpunk - Neon Skyline Chase

Hashtags
#NeonSkylineChase #MusicVideo #Cinematic #English #NeonHunterNova #Cyberpunk #DarkPop #Electropop #FuturisticMusic #OriginalMusic

Thumbnail text ideas
NEON SKYLINE CHASE
FUTURISTIC CYBERPUNK
CINEMATIC DROP

TikTok caption idea
New drop: Neon Skyline Chase - futuristic cyberpunk. #MusicVideo
```

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Local browser state

## Installation

Requirements:

- Node.js 20 or newer
- npm

Clone the repository:

```bash
git clone https://github.com/Florian-Peters/yt-metadata-studio.git
cd yt-metadata-studio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Usage

1. Enter a video or song title.
2. Describe the main topic, story or creative angle.
3. Choose a channel/project preset.
4. Select the video type, language and mood.
5. Click **Generate metadata**.
6. Copy individual output sections or use **Copy All**.
7. Click **Regenerate** to create a different wording pass.

The MVP is local-only. It does not send titles, prompts or generated metadata to an external service.

## Available Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

Use `npm run build` before publishing changes. It runs the production build and validates the Next.js app route.

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

## Roadmap

- Save custom channel presets in local storage
- Export metadata packs as `.txt` or `.md`
- Add optional OpenAI API support for advanced generations
- Add generation history
- Add YouTube SEO scoring
- Add thumbnail prompt generator
- Add preset import/export

## Contributing

This is an MVP, so focused improvements are welcome: better preset wording, more useful generation templates, accessibility fixes and small UX improvements. Keep changes lightweight and avoid adding backend requirements unless they are optional.

## License

MIT License. See [LICENSE](./LICENSE).
