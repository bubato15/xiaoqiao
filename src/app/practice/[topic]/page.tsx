import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { findTopic, PRACTICE_TOPICS } from "@/data/practice";
import { TopicPracticeClient } from "./TopicPracticeClient";

export function generateStaticParams() {
  return PRACTICE_TOPICS.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = findTopic(topicId);
  return {
    title: topic
      ? `${topic.title} (${topic.chineseTitle}) · Bài tập ghi nhớ & phản xạ · XiaoQiao`
      : "Không tìm thấy bài tập",
  };
}

async function TopicContent({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicId } = await params;
  const topic = findTopic(topicId);
  if (!topic) notFound();

  return <TopicPracticeClient topic={topic} />;
}

export default function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-ink-soft">Đang tải bài tập...</div>}>
      <TopicContent params={params} />
    </Suspense>
  );
}
