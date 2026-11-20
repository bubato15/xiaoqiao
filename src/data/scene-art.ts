// Gemini-drawn scene art for each talk scenario: public/scenes/<id>.webp (square-ish panels with rounded corners).
// Free talk has no fixed scene, so it shows XiaoQiao herself.
const SPECIAL: Record<string, string> = { free: "/xiaoqiao/happy.webp" };

export const sceneArt = (id: string) => SPECIAL[id] ?? `/scenes/${id}.webp`;
