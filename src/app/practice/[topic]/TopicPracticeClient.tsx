"use client";

import { useState } from "react";
import Link from "next/link";
import type { PracticeTopic } from "@/data/practice";
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
import { Calibration } from "@/components/Calibration";

type TabId = "flashcard" | "quiz" | "reflex" | "speak" | "writing";

const TABS: { id: TabId; label: string; icon: string; requiresWriting?: boolean }[] = [
  { id: "flashcard", label: "Thẻ ghi nhớ", icon: "🗂️" },
  { id: "quiz", label: "Trắc nghiệm phản xạ", icon: "⚡" },
  { id: "reflex", label: "Dịch câu phản xạ", icon: "💬" },
  { id: "speak", label: "Luyện phát âm", icon: "🎙️" },
  { id: "writing", label: "Luyện viết tay", icon: "✍️", requiresWriting: true },
];

export function TopicPracticeClient({ topic }: { topic: PracticeTopic }) {
  const [currentTab, setCurrentTab] = useState<TabId>("flashcard");
  const progress = useStore(practiceProgress);

  const hasWriting = Array.isArray(topic.writingExercises) && topic.writingExercises.length > 0;

  // Filter tabs: show "writing" only when topic has writingExercises
  const visibleTabs = TABS.filter((t) => !t.requiresWriting || hasWriting);

  // Extract mastered words for this topic
  const masteredMap: Record<string, boolean> = {};
  for (const w of topic.words) {
    if (progress.masteredWords[`${topic.id}:${w.hanzi}`]) {
      masteredMap[w.hanzi] = true;
    }
  }
  const masteredCount = Object.keys(masteredMap).length;

  // Extract practiced sentences for this topic
  const practicedSentencesMap: Record<number, boolean> = {};
  for (const s of topic.sentences) {
    if (progress.practicedSentences[`${topic.id}:${s.id}`]) {
      practicedSentencesMap[s.id] = true;
    }
  }
  const practicedSentencesCount = Object.keys(practicedSentencesMap).length;

  const bestQuiz = progress.quizScores[topic.id];

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
          </nav>
          <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-seal">
            {topic.tag}
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{topic.icon}</span>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">{topic.title}</h1>
                <p lang="zh-CN" className="han text-base font-semibold text-seal">
                  {topic.chineseTitle}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-soft max-w-2xl">{topic.description}</p>
          </div>

          {/* Quick stats badge */}
          <div className="flex gap-4 sm:flex-col sm:gap-2 sm:text-right shrink-0">
            <div>
              <span className="text-xs text-ink-soft block">Từ vựng đã thuộc</span>
              <span className="font-serif text-2xl font-bold text-tone-2">
                {masteredCount} / {topic.words.length}
              </span>
            </div>
            <div>
              <span className="text-xs text-ink-soft block">Câu phản xạ đã luyện</span>
              <span className="font-serif text-2xl font-bold text-tone-1">
                {practicedSentencesCount} / {topic.sentences.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-paper-deep" aria-hidden>
          <div
            className="h-full rounded-full bg-tone-2 transition-all duration-300"
            style={{ width: `${Math.round((masteredCount / topic.words.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Tabs navigation */}
      <div
        role="tablist"
        aria-label="Chế độ bài tập"
        className="flex flex-wrap gap-2 border-b-2 border-rule pb-3"
      >
        {visibleTabs.map((tab) => {
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
              {tab.id === "flashcard" && (
                <span className="ml-2 text-xs opacity-80">({topic.words.length})</span>
              )}
              {tab.id === "reflex" && (
                <span className="ml-2 text-xs opacity-80">({topic.sentences.length})</span>
              )}
              {tab.id === "writing" && topic.writingExercises && (
                <span className="ml-2 text-xs opacity-80">({topic.writingExercises.length})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <div className="mt-4">
        {currentTab === "flashcard" && (
          <FlashcardMode
            words={topic.words}
            categories={topic.categories}
            masteredMap={masteredMap}
            onToggleMastered={(hanzi) => toggleWordMastered(topic.id, hanzi)}
          />
        )}

        {currentTab === "quiz" && (
          <QuizMode
            words={topic.words}
            topicId={topic.id}
            bestScore={bestQuiz}
            onSaveScore={(score, total) => saveQuizScore(topic.id, score, total)}
          />
        )}

        {currentTab === "reflex" && (
          <SentenceReflexMode
            sentences={topic.sentences}
            topicId={topic.id}
            practicedMap={practicedSentencesMap}
            onTogglePracticed={(sId) => markSentencePracticed(topic.id, sId)}
          />
        )}

        {currentTab === "speak" && (
          <WordSpeakMode
            words={topic.words}
            categories={topic.categories}
            masteredMap={masteredMap}
            onToggleMastered={(hanzi) => toggleWordMastered(topic.id, hanzi)}
          />
        )}

        {currentTab === "writing" && topic.writingExercises && topic.writingExercises.length > 0 && (
          <WritingExerciseMode
            exercises={topic.writingExercises}
            topicId={topic.id}
          />
        )}
      </div>
    </div>
  );
}
