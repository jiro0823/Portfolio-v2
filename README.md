# Kevin V. Alcaide — Portfolio

A responsive personal portfolio for Kevin V. Alcaide, a junior software engineer and IT student in the Philippines. The site presents professional background, skills, education, selected projects, and contact links in a single-page experience.

## Live site

Visit the portfolio: [portfolio-v2-iota-black-52.vercel.app](https://portfolio-v2-iota-black-52.vercel.app/).

## Features

- Responsive portfolio sections for introduction, experience, education, skills, projects, and contact.
- Scroll-triggered motion and interactive project cards, with reduced-motion preferences respected.
- Project cards link to their source repositories on GitHub.
- CV preview and downloadable portfolio document.
- An FAQ chat panel with suggested questions and short-lived conversation history. Answers are predefined in the app; the chat does not call an AI service. Conversation history is held for the current page session and clears when the page is reloaded.
- Basic page metadata and accessible controls.

## Technology

- Next.js App Router 15 and React 19
- TypeScript
- Tailwind CSS 4
- Motion for React
- Radix UI Dialog and Lucide icons

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install and run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the production build locally. |
| `npm run lint` | Check the project with ESLint. |
| `npm run typecheck` | Check TypeScript types without emitting files. |

## Project layout

```text
app/                 App Router entry points, layout, and global styles
components/          Portfolio and FAQ chat interface
public/assets/       Portrait, CV document, and other static assets
```

Static files in `public/` are served from the site root. Keep downloadable CV assets there so the browser can open or download them directly.

## Featured projects

| Project | Repository |
| --- | --- |
| SukiSave | [jiro0823/Sukisave](https://github.com/jiro0823/Sukisave) |
| Furnara | [jiro0823/Furnara](https://github.com/jiro0823/Furnara) |
| KuyaKevs StreetFade | [jiro0823/KuyaKevs_StreetFade](https://github.com/jiro0823/KuyaKevs_StreetFade) |
| AquaSense | [jiro0823/AquaSense](https://github.com/jiro0823/AquaSense) |

## Contact

- Email: [kevalcaide23@gmail.com](mailto:kevalcaide23@gmail.com)
- GitHub: [@jiro0823](https://github.com/jiro0823)
- LinkedIn: [Kevin Alcaide](https://www.linkedin.com/in/kevin-alcaide-13929821a)

## Contributing

This repository is a personal portfolio. For local changes, create a focused branch, keep dependencies and generated output out of source control, and run `npm run lint` and `npm run typecheck` before opening a pull request.
