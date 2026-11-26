"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  PracticeTopic,
  PracticeLesson,
  WritingExercise,
} from "@/data/practice";
import { useStore } from "@/lib/local-store";
import {
  practiceProgress,
  toggleWordMastered,
  saveQuizScore,
  markSentencePracticed,
} from "@/lib/practice-store";
import { FlashcardMode } from "@/components/practice/FlashcardMode";
import { QuizMode } from "@/components/practice/QuizMode";
import { SentenceReflexMode } from "@/components/practice/SentenceReflexMode";
import { WordSpeakMode } from "@/components/practice/WordSpeakMode";
import { WritingExerciseMode } from "@/components/practice/WritingExerciseMode";
import { ChoiceExerciseMode } from "@/components/practice/ChoiceExerciseMode";
import { Calibration } from "@/components/Calibration";

type TabId =
  | "fill-in-blank"
  | "vi-to-zh"
  | "zh-to-vi"
  | "flashcard"
  | "quiz"
  | "reflex"
  | "speak"
  | "writing";

export function TopicPracticeClient({ topic }: { topic: PracticeTopic }) {
  // If topic has lessons, user can pick a lesson or view all
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Active lesson data if one is selected
  const activeLesson: PracticeLesson | undefined = topic.lessons?.find(
    (l) => l.id === selectedLessonId
  );

  // Determine active words & sentences based on selected lesson or entire topic
  const activeWords = activeLesson ? activeLesson.words : topic.words;
  const activeSentences = activeLesson ? activeLesson.sentences : topic.sentences;
  const activeCategories = activeLesson
    ? activeLesson.categories
    : topic.categories;

  // Custom choice exercises if active lesson has them
  const hasFillInBlank =
    !!activeLesson?.fillInBlankExercises &&
    activeLesson.fillInBlankExercises.length > 0;
  const hasViToZh =
    !!activeLesson?.viToZhExercises && activeLesson.viToZhExercises.length > 0;
  const hasZhToVi =
    !!activeLesson?.zhToViExercises && activeLesson.zhToViExercises.length > 0;
  const hasSpecialExercises = hasFillInBlank || hasViToZh || hasZhToVi;

  // Set default tab
  const [currentTab, setCurrentTab] = useState<TabId>(() => {
    return hasSpecialExercises ? "fill-in-blank" : "flashcard";
  });

  const progress = useStore(practiceProgress);

  // Writing exercises
  const writingExercises: WritingExercise[] =
    activeLesson?.writingExercises && activeLesson.writingExercises.length > 0
      ? activeLesson.writingExercises
      : topic.writingExercises && topic.writingExercises.length > 0
      ? topic.writingExercises
      : activeSentences.map((s) => ({
          id: s.id,
          question: `Dịch câu sau sang tiếng Trung: "${s.vi}"`,
          hint: s.situation ? `Tình huống: ${s.situation}` : "",
          sampleAnswer: s.hanzi,
          keywords: s.keywords,
        }));

  // Mastered words count
  const masteredMap: Record<string, boolean> = {};
  for (const w of activeWords) {
    if (progress.masteredWords[`${topic.id}:${w.hanzi}`]) {
      masteredMap[w.hanzi] = true;
    }
  }
  const masteredCount = Object.keys(masteredMap).length;

  // Practiced sentences count
  const practicedSentencesMap: Record<number, boolean> = {};
  for (const s of activeSentences) {
    if (progress.practicedSentences[`${topic.id}:${s.id}`]) {
      practicedSentencesMap[s.id] = true;
    }
  }
  const practicedSentencesCount = Object.keys(practicedSentencesMap).length;

  const bestQuiz = progress.quizScores[topic.id];

  // Helper to switch lesson
  const handleSelectLesson = (lessonId: string | null) => {
    setSelectedLessonId(lessonId);
    const target = topic.lessons?.find((l) => l.id === lessonId);
    if (target?.fillInBlankExercises && target.fillInBlankExercises.length > 0) {
      setCurrentTab("fill-in-blank");
    } else {
      setCurrentTab("flashcard");
    }
  };

  // Build tabs dynamically based on available exercises
  const tabs: { id: TabId; label: string; icon: string; count?: number }[] = [];

  if (hasFillInBlank) {
    tabs.push({
      id: "fill-in-blank",
      label: "Chọn từ còn thiếu (A,B,C,D)",
      icon: "🔤",
      count: activeLesson.fillInBlankExercises?.length,
    });
  }
  if (hasViToZh) {
    tabs.push({
      id: "vi-to-zh",
      label: "Dịch Việt → Trung",
      icon: "🇻🇳➡️🇨🇳",
      count: activeLesson.viToZhExercises?.length,
    });
  }
  if (hasZhToVi) {
    tabs.push({
      id: "zh-to-vi",
      label: "Dịch Hán → Việt",
      icon: "🇨🇳➡️🇻🇳",
      count: activeLesson.zhToViExercises?.length,
    });
  }

  tabs.push({
    id: "flashcard",
    label: "Thẻ ghi nhớ",
    icon: "🗂️",
    count: activeWords.length,
  });

  if (!hasSpecialExercises) {
    tabs.push({
      id: "quiz",
      label: "Trắc nghiệm phản xạ",
      icon: "⚡",
    });
  }

  tabs.push({
    id: "reflex",
    label: "Dịch câu phản xạ",
    icon: "💬",
    count: activeSentences.length,
  });

  tabs.push({
    id: "speak",
    label: "Luyện phát âm",
    icon: "🎙️",
    count: activeWords.length,
  });

  tabs.push({
    id: "writing",
    label: "Bài tập viết",
    icon: "✍️",
    count: writingExercises.length,
  });

  return (
    <div className="space-y-6">
      <Calibration compact />

      {/* Breadcrumb & Topic title card */}
      <div className="rounded-3xl border-3 border-ink bg-paper p-6 sm:p-8 shadow-[0_6px_0_var(--ink)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
            <Link href="/practice" className="hover:text-ink underline">
              ← Tất cả bài tập
            </Link>
            <span>/</span>
            <span className="text-ink font-bold">{topic.title}</span>
            {activeLesson && (
              <>
                <span>/</span>
                <span className="text-seal font-bold">{activeLesson.title}</span>
              </>
            )}
          </nav>
          <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-seal">
            {activeLesson?.tag || topic.tag}
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeLesson?.icon || topic.icon}</span>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
                  {activeLesson ? activeLesson.title : topic.title}
                </h1>
                <p lang="zh-CN" className="han text-base font-semibold text-seal">
                  {activeLesson ? activeLesson.chineseTitle : topic.chineseTitle}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-soft max-w-2xl">
              {activeLesson ? activeLesson.description : topic.description}
            </p>
          </div>

          {/* Quick stats badge */}
          <div className="flex gap-4 sm:flex-col sm:gap-2 sm:text-right shrink-0">
            <div>
              <span className="text-xs text-ink-soft block">Từ vựng đã thuộc</span>
              <span className="font-serif text-2xl font-bold text-tone-2">
                {masteredCount} / {activeWords.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-ink-soft block">Câu phản xạ đã luyện</span>
              <span className="font-serif text-2xl font-bold text-tone-1">
                {practicedSentencesCount} / {activeSentences.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-paper-deep" aria-hidden>
          <div
            className="h-full rounded-full bg-tone-2 transition-all duration-300"
            style={{
              width: `${
                activeWords.length > 0
                  ? Math.round((masteredCount / activeWords.length) * 100)
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Sub-lessons Switcher (If topic has lessons) */}
      {topic.lessons && topic.lessons.length > 0 && (
        <div className="rounded-3xl border-2 border-rule bg-paper p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <h2 className="font-serif text-lg font-bold text-ink">
                Danh sách các mục bài học ({topic.lessons.length} mục)
              </h2>
            </div>
            {selectedLessonId !== null && (
              <button
                onClick={() => handleSelectLesson(null)}
                className="text-xs font-bold text-seal hover:underline"
              >
                ← Xem toàn bộ bài học
              </button>
            )}
          </div>

          {/* Sub-lessons pills / buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => handleSelectLesson(null)}
              className={`rounded-2xl border-2 px-4 py-2 text-sm font-bold transition-all ${
                selectedLessonId === null
                  ? "border-ink bg-seal text-on-seal shadow-[0_3px_0_var(--ink)]"
                  : "border-rule bg-paper-deep text-ink hover:border-ink"
              }`}
            >
              ⭐ Toàn bộ chủ đề ({topic.words.length} từ)
            </button>
            {topic.lessons.map((lesson, idx) => {
              const isSelected = selectedLessonId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`rounded-2xl border-2 px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? "border-ink bg-seal text-on-seal shadow-[0_3px_0_var(--ink)]"
                      : "border-rule bg-paper-deep text-ink hover:border-ink hover:bg-paper"
                  }`}
                >
                  <span>{lesson.icon || `${idx + 1}.`}</span>
                  <span>{lesson.title}</span>
                  <span className="text-xs opacity-75">
                    ({lesson.words.length} từ)
                  </span>
                </button>
              );
            })}
          </div>

          {/* If no lesson is currently selected, show the overview cards of the sub-lessons */}
          {selectedLessonId === null && (
            <div className="pt-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {topic.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    className="group cursor-pointer rounded-2xl border-2 border-rule bg-paper-deep/60 p-5 transition-all hover:border-ink hover:bg-paper hover:shadow-[0_4px_0_var(--ink)] active:translate-y-[1px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{lesson.icon || "📖"}</span>
                      <span className="rounded-full bg-peach px-2.5 py-0.5 text-xs font-bold text-seal">
                        {lesson.tag || "Bài học"}
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-xl font-bold text-ink group-hover:text-seal transition-colors">
                      {lesson.title}
                    </h3>
                    <p lang="zh-CN" className="han text-xs font-semibold text-seal mt-0.5">
                      {lesson.chineseTitle}
                    </p>
                    <p className="mt-2 text-xs text-ink-soft leading-relaxed line-clamp-2">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 text-xs">
                      <span className="text-ink-soft font-medium">
                        {lesson.words.length} từ · {lesson.sentences.length} câu phản xạ
                      </span>
                      <span className="font-bold text-seal group-hover:underline">
                        Chọn bài này →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabs navigation */}
      <div
        role="tablist"
        aria-label="Chế độ bài tập"
        className="flex flex-wrap gap-2 border-b-2 border-rule pb-3"
      >
        {tabs.map((tab) => {
          const active = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCurrentTab(tab.id)}
              className={`rounded-2xl border-2 px-4 py-2 font-serif text-base font-bold transition-all sm:px-5 sm:py-2.5 ${
                active
                  ? "border-ink bg-seal text-on-seal shadow-[0_3px_0_var(--ink)] translate-y-[-1px]"
                  : "border-rule bg-paper text-ink hover:border-ink hover:bg-paper-deep"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {typeof tab.count === "number" && (
                <span className="ml-2 text-xs opacity-80">({tab.count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <div className="mt-4">
        {/* Special Exercise 1: Chọn từ còn thiếu có đáp án A, B, C, D viết bằng chữ Hán */}
        {currentTab === "fill-in-blank" && activeLesson?.fillInBlankExercises && (
          <ChoiceExerciseMode
            title={`Chọn từ còn thiếu: ${activeLesson.title}`}
            badge="Bài tập 1: Điền chữ Hán"
            description="Đọc câu và chọn từ Hán còn thiếu phù hợp nhất với ngữ cảnh ngữ pháp và ý nghĩa."
            exercises={activeLesson.fillInBlankExercises}
          />
        )}

        {/* Special Exercise 2: Nghĩa tiếng Việt dịch sang tiếng Trung chọn đáp án đúng */}
        {currentTab === "vi-to-zh" && activeLesson?.viToZhExercises && (
          <ChoiceExerciseMode
            title={`Dịch Việt sang Trung: ${activeLesson.title}`}
            badge="Bài tập 2: Phản xạ nghĩa Việt → Hán"
            description="Đọc nghĩa tiếng Việt và chọn đáp án chữ Hán chính xác tương ứng để củng cố nhớ mặt chữ."
            exercises={activeLesson.viToZhExercises}
          />
        )}

        {/* Special Exercise 3: Bài tập dịch Hán sang Việt có các đáp án lựa chọn */}
        {currentTab === "zh-to-vi" && activeLesson?.zhToViExercises && (
          <ChoiceExerciseMode
            title={`Dịch Hán sang Việt: ${activeLesson.title}`}
            badge="Bài tập 3: Nhận diện Hán → Việt"
            description="Quan sát chữ Hán, nghe phát âm và chọn nghĩa tiếng Việt đúng nhất để ghi nhớ mặt chữ lâu dài."
            exercises={activeLesson.zhToViExercises}
          />
        )}

        {/* Flashcard Mode */}
        {currentTab === "flashcard" && (
          <FlashcardMode
            words={activeWords}
            categories={activeCategories}
            masteredMap={masteredMap}
            onToggleMastered={(hanzi) => toggleWordMastered(topic.id, hanzi)}
          />
        )}

        {/* Standard Quiz Mode */}
        {currentTab === "quiz" && (
          <QuizMode
            words={activeWords}
            topicId={topic.id}
            bestScore={bestQuiz}
            onSaveScore={(score, total) => saveQuizScore(topic.id, score, total)}
          />
        )}

        {/* Sentence Reflex Mode */}
        {currentTab === "reflex" && (
          <SentenceReflexMode
            sentences={activeSentences}
            topicId={topic.id}
            practicedMap={practicedSentencesMap}
            onTogglePracticed={(sId) => markSentencePracticed(topic.id, sId)}
          />
        )}

        {/* Word Speak Practice Mode */}
        {currentTab === "speak" && (
          <WordSpeakMode
            words={activeWords}
            categories={activeCategories}
            masteredMap={masteredMap}
            onToggleMastered={(hanzi) => toggleWordMastered(topic.id, hanzi)}
          />
        )}

        {/* Writing Exercise Mode */}
        {currentTab === "writing" && (
          <WritingExerciseMode
            exercises={writingExercises}
            topicId={topic.id}
          />
        )}
      </div>
    </div>
  );
}
