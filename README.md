# Luyện nói cùng XiaoQiao

Web app for Vietnamese learners to practise spoken Mandarin: tones, pronunciation, conversation and HSK lessons.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # fill in the keys you have
npm run dev
```

Open http://localhost:3000. The microphone needs `localhost` or HTTPS.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Layout

- `src/lib/speech/` speech core that runs in the browser: recording, pitch extraction, syllable segmentation, tone classification, tone sandhi, Web Speech helpers.
- `src/app/lab/` test page for the speech core.
- `src/app/api/chat/` conversation endpoint; provider keys stay on the server.
- `src/components/` shared UI such as tone curves and the pitch chart.

## Environment

See `.env.local.example`. Without an LLM key the app still runs; only the conversation feature returns an error message.

## Data attribution

HSK vocabulary will come from complete-hsk-vocabulary (MIT) and CC-CEDICT (CC BY-SA 4.0); attribution must be shown in the app.
