/** Advice in Vietnamese for a wrong tone, keyed by "wanted>heard". */
export const TONE_HINT: Record<string, string> = {
  "2>3": "thanh 2 bị võng xuống giữa chừng nên nghe như thanh 3. Hãy đi lên thẳng một mạch.",
  "2>1": "thanh 2 chưa đi lên. Hãy bắt đầu ở giữa và kéo giọng lên như khi hỏi lại “hả?”.",
  "3>2": "thanh 3 đi lên quá sớm nên nghe như thanh 2. Hãy hạ thấp giọng và giữ ở dưới lâu hơn.",
  "3>4": "thanh 3 bắt đầu quá cao. Hãy bắt đầu thấp, giống thanh hỏi của tiếng Việt nhưng trầm hơn.",
  "4>1": "thanh 4 chưa rơi đủ. Hãy bắt đầu cao và rơi dứt khoát như khi ra lệnh.",
  "4>3": "thanh 4 bắt đầu thấp. Hãy bắt đầu thật cao rồi mới rơi xuống.",
  "1>4": "thanh 1 bị rơi ở cuối. Hãy giữ giọng cao và phẳng đến hết.",
  "1>2": "thanh 1 bắt đầu thấp rồi đi lên. Hãy bắt đầu ngay ở độ cao cuối cùng.",
  "1>3": "thanh 1 đang quá thấp. Hãy nâng giọng lên cao và giữ phẳng.",
};
