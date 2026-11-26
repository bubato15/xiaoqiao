"use client";

import { useState, useEffect } from "react";
import type { ChoiceExercise } from "@/data/practice";
import { canSpeak, speak } from "@/lib/speech/webspeech";
import { Panda, type PandaMood } from "@/components/Panda";

interface ChoiceExerciseModeProps {
  title: string;
  badge: string;
  description: string;
  exercises: ChoiceExercise[];
  onComplete?: (score: number, total: number) => void;
}

export function ChoiceExerciseMode({
  title,
  badge,
  description,
  exercises,
  onComplete,
}: ChoiceExerciseModeProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [history, setHistory] = useState<
    { exercise: ChoiceExercise; chosenKey: string; isCorrect: boolean }[]
  >([]);
  const [isDone, setIsDone] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);

  const currentEx = exercises[currentIdx];

  // Auto speak Chinese text when current question changes or upon answering
  const playAudio = (text: string) => {
    if (canSpeak()) {
      speak(text);
    }
  };

  const handleSelectOption = (key: string) => {
    if (selectedKey !== null || isDone || !currentEx) return;
    setSelectedKey(key);

    const isCorrect = key === currentEx.answer;
    const selectedOption = currentEx.options.find((o) => o.key === key);

    // If option or question has Chinese, speak it
    if (selectedOption && /[\u4e00-\u9fa5]/.test(selectedOption.text)) {
      playAudio(selectedOption.text);
    } else if (/[\u4e00-\u9fa5]/.test(currentEx.question)) {
      playAudio(currentEx.question.replace(/[_—\(\)]/g, ""));
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

    setHistory((h) => [...h, { exercise: currentEx, chosenKey: key, isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < exercises.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedKey(null);
    } else {
      setIsDone(true);
      if (onComplete) {
        onComplete(score, exercises.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedKey(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHistory([]);
    setIsDone(false);
  };

  // Keyboard shortcut listener (1-4 or A-D, Enter/Space for Next)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isDone) return;
      if (selectedKey === null) {
        const keyMap: Record<string, string> = {
          "1": "A",
          a: "A",
          A: "A",
          "2": "B",
          b: "B",
          B: "B",
          "3": "C",
          c: "C",
          C: "C",
          "4": "D",
          d: "D",
          D: "D",
        };
        const choice = keyMap[e.key];
        if (choice && currentEx?.options.some((o) => o.key === choice)) {
          e.preventDefault();
          handleSelectOption(choice);
        }
      } else {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedKey, isDone, currentEx, currentIdx, score]);

  if (!exercises || exercises.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-rule bg-paper p-8 text-center text-ink-soft">
        Chưa có dữ liệu bài tập cho phần này.
      </div>
    );
  }

  // Completion screen
  if (isDone) {
    const percent = Math.round((score / exercises.length) * 100);
    let mood: PandaMood = "cheer";
    let comment = "Xuất sắc! Bạn nhớ mặt chữ Hán và nghĩa từ rất chuẩn xác!";
    if (percent < 50) {
      mood = "encourage";
      comment = "Đừng nản nhé! Xem lại danh sách câu hỏi bên dưới và luyện lại một lần nữa nhé.";
    } else if (percent < 80) {
      mood = "happy";
      comment = "Rất tốt! Bạn đã nắm được đa số từ vựng và mặt chữ Hán của bài học!";
    }

    return (
      <div className="space-y-6">
        <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-10 text-center shadow-[0_6px_0_var(--ink)]">
          <div className="mx-auto flex h-28 w-28 items-center justify-center">
            <Panda mood={mood} size={110} />
          </div>

          <h3 className="mt-4 font-serif text-3xl font-bold text-ink">Hoàn thành bài tập!</h3>
          <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto">{comment}</p>

          {/* Score cards */}
          <div className="mt-6 flex justify-center gap-4">
            <div className="rounded-2xl border-2 border-rule bg-paper-deep px-6 py-4">
              <span className="text-xs text-ink-soft block font-medium">Điểm số</span>
              <span className="font-serif text-4xl font-bold text-tone-2">
                {score} <span className="text-lg font-normal text-ink-soft">/ {exercises.length}</span>
              </span>
            </div>
            <div className="rounded-2xl border-2 border-rule bg-paper-deep px-6 py-4">
              <span className="text-xs text-ink-soft block font-medium">Độ chính xác</span>
              <span className="font-serif text-4xl font-bold text-tone-1">{percent}%</span>
            </div>
            <div className="rounded-2xl border-2 border-rule bg-paper-deep px-6 py-4">
              <span className="text-xs text-ink-soft block font-medium">Chuỗi đúng dài nhất</span>
              <span className="font-serif text-4xl font-bold text-seal">🔥 {maxStreak}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="seal px-6 py-2.5 text-base font-bold text-white shadow-[0_3px_0_var(--ink)] active:translate-y-[2px]"
            >
              🔄 Luyện lại bài này
            </button>
          </div>
        </div>

        {/* Detailed review table */}
        <div className="rounded-3xl border-2 border-rule bg-paper p-6 sm:p-8">
          <h4 className="font-serif text-xl font-bold text-ink mb-4">Xem lại các câu đã làm</h4>
          <div className="space-y-4">
            {history.map((h, i) => {
              const correctOpt = h.exercise.options.find((o) => o.key === h.exercise.answer);
              const chosenOpt = h.exercise.options.find((o) => o.key === h.chosenKey);
              return (
                <div
                  key={i}
                  className={`rounded-2xl border-2 p-4 transition-all ${
                    h.isCorrect
                      ? "border-tone-2/30 bg-mint/30"
                      : "border-tone-4/30 bg-blush/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ink-soft">Câu {i + 1}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            h.isCorrect
                              ? "bg-tone-2 text-white"
                              : "bg-tone-4 text-white"
                          }`}
                        >
                          {h.isCorrect ? "✓ Chính xác" : "✗ Chưa đúng"}
                        </span>
                      </div>
                      <p className="mt-2 font-serif text-lg font-bold text-ink han">
                        {h.exercise.question}
                      </p>
                      {h.exercise.pinyin && (
                        <p className="text-xs text-ink-soft/80 font-mono mt-0.5">
                          {h.exercise.pinyin}
                        </p>
                      )}
                      <div className="mt-2 text-xs flex flex-wrap gap-4">
                        <span>
                          Bạn chọn:{" "}
                          <strong className={h.isCorrect ? "text-tone-2" : "text-tone-4"}>
                            {h.chosenKey}. {chosenOpt?.text}
                          </strong>
                        </span>
                        {!h.isCorrect && (
                          <span>
                            Đáp án đúng:{" "}
                            <strong className="text-tone-2">
                              {h.exercise.answer}. {correctOpt?.text}
                            </strong>
                          </span>
                        )}
                      </div>
                      {h.exercise.explanation && (
                        <p className="mt-2 text-xs text-ink-soft italic border-t border-rule/50 pt-2">
                          💡 {h.exercise.explanation}
                        </p>
                      )}
                    </div>

                    {/[\u4e00-\u9fa5]/.test(h.exercise.question) && (
                      <button
                        onClick={() =>
                          playAudio(
                            h.exercise.question.replace(/[_—\(\)]/g, "")
                          )
                        }
                        title="Nghe phát âm"
                        className="rounded-full border border-rule bg-paper p-2 text-sm hover:bg-paper-deep"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const isAnswered = selectedKey !== null;
  const isCorrect = selectedKey === currentEx.answer;

  return (
    <div className="space-y-6">
      {/* Header bar with Mode info and Stats */}
      <div className="rounded-2xl border-2 border-rule bg-paper p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-peach px-2.5 py-0.5 text-xs font-bold text-seal">
              {badge}
            </span>
            <h3 className="font-serif text-lg font-bold text-ink">{title}</h3>
          </div>
          <p className="text-xs text-ink-soft mt-0.5">{description}</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="rounded-xl bg-paper-deep px-3 py-1.5 border border-rule">
            <span className="text-ink-soft mr-1.5">Tiến trình:</span>
            <span className="font-bold text-ink">
              {currentIdx + 1} / {exercises.length}
            </span>
          </div>

          <div className="rounded-xl bg-paper-deep px-3 py-1.5 border border-rule">
            <span className="text-ink-soft mr-1.5">Điểm:</span>
            <span className="font-bold text-tone-2">{score}</span>
          </div>

          {streak > 1 && (
            <div className="rounded-xl bg-blush/40 px-3 py-1.5 border border-tone-4/30 text-tone-4 font-bold flex items-center gap-1">
              <span>🔥</span> {streak} liên tiếp
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 overflow-hidden rounded-full border border-rule bg-paper-deep">
        <div
          className="h-full rounded-full bg-tone-2 transition-all duration-300"
          style={{ width: `${Math.round(((currentIdx + 1) / exercises.length) * 100)}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-10 shadow-[0_6px_0_var(--ink)]">
        {/* Question prompt */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="rounded-full bg-paper-deep px-3 py-1 text-xs font-bold text-ink-soft border border-rule">
              Câu hỏi {currentIdx + 1}
            </span>
            {currentEx.pinyin && (
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className="text-xs font-semibold text-tone-1 underline hover:text-ink"
              >
                {showPinyin ? "Ẩn Pinyin" : "Hiện Pinyin"}
              </button>
            )}
            {/[\u4e00-\u9fa5]/.test(currentEx.question) && (
              <button
                onClick={() =>
                  playAudio(currentEx.question.replace(/[_—\(\)]/g, ""))
                }
                title="Nghe phát âm"
                className="rounded-full border border-rule bg-paper px-2.5 py-1 text-xs font-bold hover:bg-paper-deep flex items-center gap-1"
              >
                🔊 Nghe
              </button>
            )}
          </div>

          {/* Big typography for Chinese sentences / words */}
          <div className="py-4">
            <h2
              className={`font-serif font-bold text-ink leading-relaxed ${
                /[\u4e00-\u9fa5]/.test(currentEx.question)
                  ? "han text-3xl sm:text-4xl text-seal tracking-wide"
                  : "text-2xl sm:text-3xl text-ink"
              }`}
            >
              {currentEx.question}
            </h2>

            {showPinyin && currentEx.pinyin && (
              <p className="mt-2 font-mono text-sm text-ink-soft">
                {currentEx.pinyin}
              </p>
            )}

            {currentEx.hint && (
              <p className="mt-2 text-xs text-ink-soft italic">
                Gợi ý: {currentEx.hint}
              </p>
            )}
          </div>
        </div>

        {/* 4 Options Grid (A, B, C, D) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {currentEx.options.map((opt) => {
            const isChosen = selectedKey === opt.key;
            const isAnswer = opt.key === currentEx.answer;

            let buttonStyle =
              "border-rule bg-paper text-ink hover:border-ink hover:bg-paper-deep";

            if (isAnswered) {
              if (isAnswer) {
                // Correct answer always glows green
                buttonStyle =
                  "border-tone-2 bg-mint text-ink font-bold shadow-[0_4px_0_var(--tone-2)] scale-[1.01]";
              } else if (isChosen && !isCorrect) {
                // Wrong choice turns red
                buttonStyle =
                  "border-tone-4 bg-blush text-ink shadow-[0_4px_0_var(--tone-4)]";
              } else {
                // Neutral other choices dim
                buttonStyle = "border-rule/60 bg-paper/50 text-ink-soft opacity-60";
              }
            }

            return (
              <button
                key={opt.key}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.key)}
                className={`group relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${buttonStyle}`}
              >
                {/* Option Key Badge */}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-serif text-base font-bold transition-colors ${
                    isAnswered && isAnswer
                      ? "bg-tone-2 text-white"
                      : isAnswered && isChosen && !isCorrect
                      ? "bg-tone-4 text-white"
                      : "bg-paper-deep text-ink border border-rule group-hover:border-ink"
                  }`}
                >
                  {opt.key}
                </span>

                {/* Option text */}
                <div className="flex-1">
                  <span
                    className={`block leading-snug ${
                      /[\u4e00-\u9fa5]/.test(opt.text)
                        ? "han text-2xl font-bold tracking-wide"
                        : "text-base font-medium"
                    }`}
                  >
                    {opt.text}
                  </span>
                </div>

                {/* Audio button for Chinese options */}
                {isAnswered && /[\u4e00-\u9fa5]/.test(opt.text) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(opt.text);
                    }}
                    title="Nghe"
                    className="p-1.5 text-xs text-ink-soft hover:text-ink rounded-lg bg-paper border border-rule"
                  >
                    🔊
                  </button>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div className="mt-6 rounded-2xl border-2 p-4 bg-paper-deep/80 border-rule animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                      isCorrect ? "bg-tone-2" : "bg-tone-4"
                    }`}
                  >
                    {isCorrect ? "✓ Chính xác!" : "✗ Chưa đúng!"}
                  </span>
                  {!isCorrect && (
                    <span className="text-xs text-ink-soft">
                      Đáp án đúng là:{" "}
                      <strong className="text-tone-2 font-bold">
                        {currentEx.answer}.{" "}
                        {currentEx.options.find((o) => o.key === currentEx.answer)?.text}
                      </strong>
                    </span>
                  )}
                </div>

                {currentEx.explanation && (
                  <p className="text-xs text-ink-soft italic pt-1">
                    💡 {currentEx.explanation}
                  </p>
                )}
              </div>

              <button
                onClick={handleNext}
                className="seal shrink-0 px-6 py-2.5 text-sm font-bold text-white shadow-[0_3px_0_var(--ink)] active:translate-y-[2px]"
              >
                {currentIdx + 1 < exercises.length ? "Câu tiếp theo →" : "Xem kết quả →"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick shortcuts hint */}
      <div className="text-center text-xs text-ink-soft">
        Mẹo phím tắt: Nhấn phím <kbd className="rounded border border-rule bg-paper px-1.5 py-0.5 font-mono">1</kbd> - <kbd className="rounded border border-rule bg-paper px-1.5 py-0.5 font-mono">4</kbd> (hoặc <kbd className="rounded border border-rule bg-paper px-1.5 py-0.5 font-mono">A</kbd> - <kbd className="rounded border border-rule bg-paper px-1.5 py-0.5 font-mono">D</kbd>) để chọn đáp án, nhấn <kbd className="rounded border border-rule bg-paper px-1.5 py-0.5 font-mono">Enter</kbd> để qua câu tiếp theo.
      </div>
    </div>
  );
}
