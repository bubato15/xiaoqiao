"use client";

import { useState } from "react";
import type { PracticeWord } from "@/data/practice";
import { fromPinyin } from "@/lib/speech/sandhi";
import { canSpeak, speak } from "@/lib/speech/webspeech";
import { Panda, type PandaMood } from "@/components/Panda";

type QuizDirection = "han-to-vi" | "vi-to-han";

interface Question {
  word: PracticeWord;
  options: PracticeWord[];
  correctAnswer: PracticeWord;
}

function generateQuestions(words: PracticeWord[], count = 10): Question[] {
  if (words.length < 4) return [];
  // Shuffle words
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(count, words.length));

  return picked.map((word) => {
    // Pick 3 distractors
    const otherWords = words.filter((w) => w.hanzi !== word.hanzi);
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3);
    const options = [word, ...distractors].sort(() => Math.random() - 0.5);
    return {
      word,
      options,
      correctAnswer: word,
    };
  });
}

export function QuizMode({
  words,
  bestScore,
  onSaveScore,
}: {
  words: PracticeWord[];
  topicId?: string;
  bestScore?: { best: number; total: number };
  onSaveScore: (score: number, total: number) => void;
}) {
  const [direction, setDirection] = useState<QuizDirection>("han-to-vi");
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(words, 10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<PracticeWord | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [history, setHistory] = useState<{ word: PracticeWord; chosen: PracticeWord; isCorrect: boolean }[]>([]);
  const [isDone, setIsDone] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (opt: PracticeWord) => {
    if (selectedOpt !== null || isDone || !currentQ) return;
    setSelectedOpt(opt);

    const isCorrect = opt.hanzi === currentQ.correctAnswer.hanzi;
    if (canSpeak()) {
      speak(currentQ.correctAnswer.hanzi);
    }

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        setMaxStreak((m) => Math.max(m, next));
        return next;
      });
    } else {
      setStreak(0);
    }

    setHistory((h) => [...h, { word: currentQ.word, chosen: opt, isCorrect }]);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
    } else {
      setIsDone(true);
      onSaveScore(score, questions.length);
    }
  };

  const handleRestart = (newDirection?: QuizDirection) => {
    if (newDirection) {
      setDirection(newDirection);
    }
    setQuestions(generateQuestions(words, 10));
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHistory([]);
    setIsDone(false);
  };

  if (words.length < 4 || !currentQ) {
    return <div className="p-4 text-center text-ink-soft">Cần ít nhất 4 từ vựng để tạo bài trắc nghiệm.</div>;
  }

  // Final summary screen
  if (isDone) {
    const percent = Math.round((score / questions.length) * 100);
    let mood: PandaMood = "cheer";
    let comment = "Xuất sắc! Bạn nhớ từ mới rất tốt và phản xạ nhanh nhạy!";
    if (percent < 50) {
      mood = "encourage";
      comment = "Đừng nản nhé! Luyện thêm một vài lượt thẻ ghi nhớ rồi quay lại thử sức nhé.";
    } else if (percent < 80) {
      mood = "happy";
      comment = "Khá tốt! Bạn đã nắm được phần lớn từ vựng công xưởng rồi đấy!";
    }

    return (
      <div className="mx-auto max-w-xl space-y-6 text-center animate-fadeIn">
        <div className="rounded-3xl border-3 border-ink bg-paper p-8 shadow-[0_6px_0_var(--ink)]">
          <Panda mood={mood} size={110} className="mx-auto mb-3" />
          <h3 className="font-serif text-3xl font-bold text-ink">Hoàn thành bài trắc nghiệm!</h3>
          <p className="mt-2 text-ink-soft">{comment}</p>

          <div className="mt-6 flex justify-center gap-6">
            <div className="rounded-2xl border-2 border-rule bg-paper-deep px-5 py-3">
              <span className="block text-xs text-ink-soft">Điểm số</span>
              <span className="font-serif text-3xl font-bold text-seal">
                {score} / {questions.length}
              </span>
            </div>
            <div className="rounded-2xl border-2 border-rule bg-paper-deep px-5 py-3">
              <span className="block text-xs text-ink-soft">Tỉ lệ đúng</span>
              <span className="font-serif text-3xl font-bold text-tone-2">{percent}%</span>
            </div>
            <div className="rounded-2xl border-2 border-rule bg-paper-deep px-5 py-3">
              <span className="block text-xs text-ink-soft">Chuỗi đúng dài nhất</span>
              <span className="font-serif text-3xl font-bold text-tone-3">{maxStreak} 🔥</span>
            </div>
          </div>

          {bestScore && (
            <p className="mt-4 text-xs text-ink-soft">
              Kỷ lục cao nhất của bạn: <b>{bestScore.best}/{bestScore.total}</b> câu
            </p>
          )}

          <div className="mt-8 flex justify-center gap-4">
            <button type="button" onClick={() => handleRestart()} className="seal px-6 py-2.5 font-semibold">
              🔄 Luyện lại lượt mới
            </button>
          </div>
        </div>

        {/* Review history */}
        <div className="rounded-2xl border-2 border-rule bg-paper p-5 text-left">
          <h4 className="font-serif text-base font-bold text-ink mb-3">Xem lại các câu đã làm:</h4>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-xl border text-sm ${
                  h.isCorrect ? "border-tone-2/40 bg-mint/20" : "border-tone-4/40 bg-blush/20"
                }`}
              >
                <div>
                  <span lang="zh-CN" className="han font-bold text-base text-ink mr-2">
                    {h.word.hanzi}
                  </span>
                  <span className="text-xs text-ink-soft">({h.word.pinyin})</span>
                  <span className="ml-2 font-medium text-ink-soft">{h.word.vi}</span>
                </div>
                <div className="text-xs font-semibold">
                  {h.isCorrect ? (
                    <span className="text-tone-2 font-bold">✓ Đúng</span>
                  ) : (
                    <span className="text-tone-4">✗ Bạn chọn: {direction === "han-to-vi" ? h.chosen.vi : h.chosen.hanzi}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const syllables = fromPinyin(currentQ.word.hanzi, currentQ.word.pinyin);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {/* Quiz control header: Direction & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-soft">Hướng phản xạ:</span>
          <button
            type="button"
            onClick={() => handleRestart("han-to-vi")}
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${
              direction === "han-to-vi" ? "border-ink bg-ink text-paper" : "border-rule bg-paper text-ink"
            }`}
          >
            Chữ Hán → Nghĩa Việt
          </button>
          <button
            type="button"
            onClick={() => handleRestart("vi-to-han")}
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${
              direction === "vi-to-han" ? "border-ink bg-ink text-paper" : "border-rule bg-paper text-ink"
            }`}
          >
            Nghĩa Việt → Chữ Hán
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-ink">
          <span>Câu {currentIdx + 1} / {questions.length}</span>
          {streak > 1 && <span className="rounded-full bg-peach px-2 py-0.5 text-seal">🔥 x{streak}</span>}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 text-center shadow-[0_5px_0_var(--ink)]">
        <span className="inline-block rounded-full bg-paper-deep px-3 py-1 text-xs font-medium text-ink-soft mb-3">
          {currentQ.word.category}
        </span>

        {direction === "han-to-vi" ? (
          <div>
            <div className="flex items-center justify-center gap-2">
              <span lang="zh-CN" className="han text-5xl sm:text-6xl font-bold text-ink">
                {currentQ.word.hanzi}
              </span>
              <button
                type="button"
                onClick={() => canSpeak() && speak(currentQ.word.hanzi)}
                className="seal h-8 w-8 text-xs"
                title="Nghe phát âm"
                aria-label={`Nghe phát âm ${currentQ.word.hanzi}`}
              >
                🔊
              </button>
            </div>
            <p className="mt-2 text-xs text-ink-soft">Hãy chọn nghĩa tiếng Việt chính xác nhất</p>
          </div>
        ) : (
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-seal">
              {currentQ.word.vi}
            </div>
            <p className="mt-2 text-xs text-ink-soft">Hãy chọn từ tiếng Trung tương ứng</p>
          </div>
        )}

        {/* 4 Answer options */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOpt?.hanzi === opt.hanzi;
            const isAnswer = opt.hanzi === currentQ.correctAnswer.hanzi;
            const revealed = selectedOpt !== null;

            let btnStyle = "border-rule bg-paper hover:border-ink hover:bg-paper-deep text-ink";
            if (revealed) {
              if (isAnswer) {
                btnStyle = "border-tone-2 bg-mint font-bold text-tone-2 shadow-sm";
              } else if (isSelected) {
                btnStyle = "border-tone-4 bg-blush font-bold text-tone-4";
              } else {
                btnStyle = "border-rule bg-paper opacity-50 text-ink-soft";
              }
            }

            return (
              <button
                key={opt.hanzi + i}
                type="button"
                disabled={revealed}
                onClick={() => handleSelectOption(opt)}
                className={`p-3.5 rounded-2xl border-2 text-left sm:text-center transition-all ${btnStyle}`}
              >
                {direction === "han-to-vi" ? (
                  <span className="font-serif text-base font-semibold">{opt.vi}</span>
                ) : (
                  <span lang="zh-CN" className="han text-xl font-bold">
                    {opt.hanzi}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Instant explanation card when answered */}
        {selectedOpt !== null && (
          <div className="mt-6 border-t border-rule pt-4 text-left animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <span lang="zh-CN" className="han text-2xl font-bold text-ink mr-2">
                  {currentQ.word.hanzi}
                </span>
                <span className="pinyin text-base font-bold text-tone-1 mr-2">
                  {syllables.map((s) => s.marked).join(" ")}
                </span>
                {currentQ.word.hanViet && (
                  <span className="text-xs text-ink-soft">[{currentQ.word.hanViet}]</span>
                )}
              </div>
              <span className={`text-sm font-bold ${selectedOpt.hanzi === currentQ.word.hanzi ? "text-tone-2" : "text-tone-4"}`}>
                {selectedOpt.hanzi === currentQ.word.hanzi ? "✓ Chính xác!" : "✗ Chưa chính xác!"}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-ink">
              Nghĩa: <span className="font-bold text-seal">{currentQ.word.vi}</span>
            </p>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="seal mt-4 w-full py-2.5 text-sm font-semibold"
            >
              {currentIdx + 1 < questions.length ? "Câu tiếp theo →" : "Xem kết quả tổng kết"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
