# yt-metadata-studio

Local-first YouTube metadata generator for creators, music projects, Shorts and TikTok captions.

yt-metadata-studio helps creators turn a rough upload idea into a complete metadata pack: YouTube titles, full descriptions, short descriptions, hashtags, thumbnail text and short-form captions. It is built around reusable presets so music projects, kids channels and general creators can keep consistent wording without a backend, login or paid API.

## Live Demo

https://yt-metadata-studio.vercel.app/

The app is deployed on Vercel and runs fully local-first in the browser.

## GitHub Description

Local-first YouTube metadata generator for creators, music projects, Shorts and TikTok captions.

## Suggested Repository Topics

`youtube` `metadata-generator` `creator-tools` `nextjs` `typescript` `tailwindcss` `shorts` `tiktok` `music-creators` `local-first`

## Features

- Generate 5 YouTube title ideas from one creator brief
- Create a full YouTube description and a short description under 100 characters
- Generate 10 clean hashtags, 3 thumbnail text ideas and 3 TikTok captions
- Use built-in presets for Neon Hunter Nova, Nelfij, BambiniBeats and Generic Creator
- Create custom presets with preferred words, forbidden words and tone keywords
- Save custom presets in localStorage
- Delete custom presets without affecting built-in presets
- Copy individual output blocks or copy the complete metadata pack
- Export the current metadata pack as `.txt` or `.md`
- Show a simple local Metadata Score with improvement tips
- Regenerate alternate wording without changing the input
- Fully local-first MVP: no backend, database, authentication or external generation API
- Responsive dashboard layout for desktop and mobile

## Screenshots

Add screenshots after running the app locally.

```md
![Dashboard](./docs/screenshot-dashboard.png)
![Generated metadata](./docs/screenshot-output.png)
![Custom preset form](./docs/screenshot-custom-preset.png)
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
1. Neon Skyline Chase | cyberpunk
2. Neon Skyline Chase - shadowy cinematic cyberpunk original music
3. dark pop: Neon Skyline Chase
4. Neon Skyline Chase (Official Video)
5. cinematic cyberpunk original music - A futuristic chase through a rainy...

Short YouTube description
New: cinematic cyberpunk original music - Neon Skyline Chase

Hashtags
#NeonSkylineChase #MusicVideo #Cinematic #English #NeonHunterNova #Cyberpunk #DarkPop #Electropop #OriginalMusic #FuturisticMusic

Thumbnail text ideas
Neon Skyline Chase
FUTURISTIC CYBERPUNK
CINEMATIC DROP
```

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Browser localStorage

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

Run the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Usage

1. Enter the video or song title.
2. Describe the topic, story or creative angle.
3. Select a built-in preset or create a custom preset.
4. Choose video type, language and mood/style.
5. Click **Generate metadata**.
6. Review the Metadata Score and improvement tips.
7. Copy sections, use **Copy All**, or export as TXT/Markdown.
8. Click **Regenerate** for another wording pass.

All generation is template-based and local. The app does not send prompts, titles, custom presets or generated metadata to external services.

## Available Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Project Structure

```text
src/
  app/
  components/
  data/
  lib/
.github/
  ISSUE_TEMPLATE/
  workflows/
```

## Roadmap

- Save named generation history
- Add preset import/export
- Add thumbnail prompt generator
- Add optional OpenAI API support
- Add YouTube SEO scoring improvements
- Add more creator preset examples

## Contributing

Contributions are welcome. Good areas to improve are preset wording, generator templates, accessibility, documentation and small UX refinements.

Before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
```

Keep the project local-first and beginner-friendly. Avoid adding required backend services, authentication or paid APIs.

## Release Checklist

- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Test generation with a built-in preset
- [ ] Test custom preset creation, reload persistence and deletion
- [ ] Test Copy All and individual copy buttons
- [ ] Test TXT and Markdown export
- [ ] Review README screenshots and changelog

## License

MIT License. See [LICENSE](./LICENSE).
