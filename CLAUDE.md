@AGENTS.md

# Luyện nói cùng XiaoQiao

Next.js app for Vietnamese learners practising spoken Mandarin. Project knowledge, progress and decisions live in `docs/HANDBOOK.md`: read it before changing speech scoring, lesson data, the chat API or the visual style, and update its progress section when a feature lands.

## Working agreement

- Deliver source only. The owner deploys; there is no git repo.
- UI text is Vietnamese, code comments English. The style is cute pastel with the panda mascot (`src/components/Panda.tsx`) and Chinese touches.
- Verify every UI change in a real browser: screenshots at 390, 1024 and 1920 wide (the site is light only, on purpose), text contrast at 4.5:1 or more, keyboard focus, and the actual flow (record, answer, chat). Read the screenshots before calling it done.
- Reuse the shared practice block `SpeakPractice` and the CSS classes in `src/app/globals.css` (`.seal`, `.btn-soft`, `.chip`, `.paper-stack`, `.pinyin`, `.han`, `.han-cute`).

## Gotchas

- React Compiler is on: define hooks at module level (see `useStore` in `src/lib/local-store.ts`), never inside a factory.
- Render pinyin with the `.pinyin` class; the heading font breaks ā ē ī ō ū.
- Mark every Chinese text element `lang="zh-CN"`.
- Lesson pinyin uses tone numbers in citation form (`5` = neutral); sandhi is applied in `src/lib/speech/sandhi.ts`. Data tests in `src/data/*.test.ts` must stay green.
- Tests import with relative paths (no `@/` alias in Vitest).
- Send Chinese JSON to the API with Node `fetch`; Git Bash `curl` mangles the encoding.
- Browser mic tests: Edge via `playwright-core` with `--use-fake-device-for-media-stream --use-file-for-fake-audio-capture=<wav>%noloop`.
- Servers started from the agent shell outlive their task and cannot be killed from here; reuse one server per session instead of starting new ports.
