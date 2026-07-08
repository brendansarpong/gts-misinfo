# Netwise

A static web curriculum for teaching digital media literacy — how to read the internet without getting played.

## What this is

**Netwise** is a self-contained lesson site aimed at students (and the educators running it). It walks through the mechanics of online misinformation: who pays for content, why ragebait works, how to spot AI fakes, what algorithms do to your feed, how framing changes a story, and how to vet tweets.

There's a [pre-curriculum survey](https://forms.gle/vpgGcawYphUXmCbr7) students should take before starting. The finale lesson points them to a post-curriculum survey.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `lessons.html` | Lesson index |
| `lesson_one.html` – `lesson8.html` | Individual lessons with interactive activities |
| `methodology.html` | How sources were vetted, with citations |
| `styles.css` | Shared styling |
| `script.js` | Scroll animations, parallax, lesson interactivity |

## Lessons

0. **Intro** — Why misinformation spreads
1. **Sponsor Hunt** — Hidden sponsors and financial incentives
2. **Ragebait** — Emotionally manipulative headlines
3. **AI or IRL?** — Spotting AI-generated images
4. **Algorithm Adventures** — How feeds get shaped
5. **What's Their Angle?** — Bias and framing in news coverage
6. **Substantiate the Tweet** — Fake or misleading social posts
7. **Finale** — Review and survey

## Running locally

No build step. Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python -m http.server 8000
```

Then go to `http://localhost:8000`.

## Tech

Plain HTML, CSS, and vanilla JavaScript. Google Fonts (Fraunces + Rubik). That's it.
