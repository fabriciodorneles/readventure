# Readventure 🦊📖

> 🇧🇷 [Versão em português](README.pt-BR.md)

A reading game for children where **reading aloud is the core game mechanic**.

**Play now**: https://fabriciodorneles.github.io/readventure/

The child explores an adventure world across six missions — every resource is
earned by reading a word or sentence out loud (browser speech recognition), and
the world visibly changes because of the reading:

1. **The Broken Bridge** 🪵 — 5 pieces of wood rebuild the bridge → adventurer hat
2. **The Dry Garden** 🌱 — each reading makes a flower bed bloom → explorer backpack
3. **The Locked Tower** 💎 — each reading lights a crystal on the door → magic cape
4. **The Dark Cave** 🏮 — each lantern lit brightens the cave → speedy boots
5. **The Punctured Balloon** 🎈 — each reading patches the balloon until it inflates → magic glasses
6. **The Faded Rainbow** 🌈 — each reading paints one band of the rainbow → star wand

To claim each prize, the child reads its name out loud. Readings are drawn from
a bank of texts (words, simple sentences, longer sentences), with difficulty
progression inside each mission and no repeats until the bank runs out.

**Languages**: Portuguese (pt-BR) and English (en-US) — switchable in the
parent area (⚙), including the speech recognition language.

## Running locally

```bash
npm install
npm run dev
```

Open the printed URL (speech recognition works best in **Chrome/Edge**; the
microphone requires `localhost` or HTTPS).

## Debug mode

Append `?debug=true` to the URL to see the developer panel: expected text,
recognized text, similarity score, and buttons to simulate success/failure
without using the microphone.

## Deploy

Deploys automatically to GitHub Pages via GitHub Actions on every push
(workflow in `.github/workflows/deploy.yml`).

> One-time setup: in **Settings → Pages**, set **Source: GitHub Actions**.

## Architecture (overview)

- `src/game/` — mission state machine + localStorage persistence
- `src/world/` — animated SVG scenes (one per mission)
- `src/avatar/` — customizable avatar and equippable cosmetics
- `src/reading/` — reading challenge; speech recognition isolated behind the
  `SpeechRecognizer` interface and scoring behind `SpeechEvaluator`
  (swappable for a real pronunciation assessment service later)
- `src/content/` — reading prompts as structured data (pt and en)
- `src/i18n/` — UI strings in Portuguese and English
- `src/debug/` — developer panel (`?debug=true`)

No backend, no accounts, no audio storage. [MIT](LICENSE) licensed.
