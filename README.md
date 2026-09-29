# Meet the Fungi · Làm quen với Nấm

A beginner-friendly website that explains mycology (the study of fungi), in English and Vietnamese.
Built with React, TypeScript, Vite and React Router.

## Run it on your computer

You need **Node.js** (version 20 or newer). Download it from https://nodejs.org if `node -v` doesn't work.

Open a terminal in this folder (in VS Code: *Terminal → New Terminal*), then:

```bash
npm install      # first time only: downloads the libraries
npm run dev      # starts the site at http://localhost:5173
```

The photos load from Wikimedia Commons, so you need an internet connection to see them.

Other commands:

```bash
npm run build    # checks the TypeScript and makes a production copy in /dist
npm run preview  # opens that production copy
```

## Where things are

```
src/
  main.tsx               starts React, the language system and the router
  App.tsx                list of pages (routes)
  index.css              all styles and colours
  i18n/
    LanguageContext.tsx  English / Vietnamese switch and the t() helper
  data/
    topics.ts            titles, summaries and order of the topic pages
    taxonomy.ts          ranks, example fungi and word list for /names
    photos.ts            every photo: file, caption, author, licence
    references.ts        literature list; pages cite entries by id
    species.ts           species profiles (all eight categories per species)
  components/
    Layout.tsx           side menu (with language switch) + footer
    TopicPage.tsx        heading + Previous/Next frame for each topic
    Photo.tsx            a photo with caption and credit line
    Cite.tsx             [n] citation links and the "Sources for this page" block
    EcosystemScene.tsx   interactive landscape on the Lifestyle (ecology) page
    ui.tsx               small building blocks: Card, Analogy, Note, Grid, Toggle
  pages/
    Home.tsx
    NamesRanks.tsx       /names: kingdom → strain ladder and word list
    SpeciesList.tsx      /species: all species profiles
    SpeciesProfile.tsx   /species/:slug: one species in all eight categories
    References.tsx       /references: literature list and photo credits
    NotFound.tsx
    topics/              one file per topic (the page content)
```

## Two languages

Every piece of text is written as a pair: `{ en: 'Mould', vi: 'Nấm mốc' }`.
Inside a component, `const { t } = useLang()` and then `t({ en: '...', vi: '...' })` picks the current language.
The switch at the top of the menu changes the language, and the browser remembers the choice.

To add a third language later, add it to the `Lang` type in `src/i18n/LanguageContext.tsx` and fill in the new key everywhere TypeScript complains.

## References

Every source is listed once in `src/data/references.ts` with an `id`, e.g. `schoch2012`.
- A topic page lists its sources in `refs` in `src/data/topics.ts`.
- Inside text, `<Cite ids={['schoch2012']} />` shows a numbered link like [17].
- The /references page shows the full list, with DOI links and a "Copy citation" button.

## Photos

All photos come from [Wikimedia Commons](https://commons.wikimedia.org) under open licences
(public domain, CC0, CC BY or CC BY-SA). The author and licence are shown under every photo, which is what these licences require.
Keep the credit line if you reuse a photo.

To use your own photo (for example, a plate from your lab):

1. Put the file in `public/photos/`, e.g. `public/photos/my-plate.jpg`.
2. In `src/data/photos.ts`, replace `file: '...'` with `src: '/photos/my-plate.jpg'` and update the caption, author and licence.

## How to add a new topic page

1. Add an entry to `src/data/topics.ts` (pick a `slug`, e.g. `reproduction`).
2. Create `src/pages/topics/Reproduction.tsx` with the content.
3. In `src/App.tsx`, import it and add `reproduction: <Reproduction />` to `topicContent`.

The side menu, the home page cards and the Previous/Next buttons update automatically.

## Publishing online

`npm run build` creates a `dist` folder you can upload to Netlify, Vercel or GitHub Pages.
Because the site uses page URLs like `/learn/ecology`, tell the host to send every URL to `index.html`
(on Netlify: add a file `public/_redirects` containing `/*  /index.html  200`).
