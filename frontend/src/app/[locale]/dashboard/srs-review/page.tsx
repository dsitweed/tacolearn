'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  SrsClassroomVideoCard,
  SrsEbbinghausCurveCard,
  SrsFlashcard,
  SrsHeader,
  SrsQueueBreakdownCard,
  SrsRatingActions,
  SrsRelatedVocabCard,
} from '@/features/srs';

// Spaced Repetition Review Page
export default function SrsReviewPage() {
  const [currentCard, setCurrentCard] = useState(12);
  const totalCards = 20;
  const [showFurigana, setShowFurigana] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1200);
  };

  const handleRate = useCallback(
    (level: 'again' | 'hard' | 'good' | 'easy') => {
      const messages = {
        again: 'Đã lưu: Học lại (< 10 phút)',
        hard: 'Đã lưu: Thẻ khó (Ôn lại sau 1 ngày)',
        good: 'Đã lưu: Đạt yêu cầu (Ôn lại sau 4 ngày)',
        easy: 'Đã lưu: Thuần thục (Ôn lại sau 10 ngày)',
      };
      toast.success(messages[level]);

      if (currentCard < totalCards) {
        setCurrentCard((prev) => prev + 1);
      } else {
        toast.info('Bạn đã hoàn thành phiên ôn tập hôm nay!');
      }
    },
    [currentCard, totalCards],
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setShowFurigana((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handlePlayAudio();
      } else if (e.key === '1') {
        e.preventDefault();
        handleRate('again');
      } else if (e.key === '2') {
        e.preventDefault();
        handleRate('hard');
      } else if (e.key === '3') {
        e.preventDefault();
        handleRate('good');
      } else if (e.key === '4') {
        e.preventDefault();
        handleRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRate]);

  return (
    <div className="flex w-full flex-col pb-16">
      {/* 1. Header & Controls */}
      <SrsHeader
        currentCard={currentCard}
        totalCards={totalCards}
        accuracy={85}
        estimatedMinutes={8}
      />

      {/* 2. Main Two-Column Master Layout Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column: SRS Review Arena (65% -> col-span-8) */}
        <div className="flex flex-col gap-4 lg:col-span-8">
          <SrsFlashcard
            showFurigana={showFurigana}
            onToggleFurigana={() => setShowFurigana((prev) => !prev)}
            isPlayingAudio={isPlayingAudio}
            onPlayAudio={handlePlayAudio}
          />

          <SrsRatingActions onRate={handleRate} />
        </div>

        {/* Right Column: Context & Analytics Sidebar (35% -> col-span-4) */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <SrsRelatedVocabCard />
          <SrsQueueBreakdownCard />
          <SrsEbbinghausCurveCard />
          <SrsClassroomVideoCard />
        </div>
      </div>
    </div>
  );
}
