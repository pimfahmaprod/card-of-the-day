'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { TarotCard, RelationshipStatus } from '@/types/tarot';
import Image from 'next/image';
import { toPng } from 'html-to-image';

interface ResultScreenProps {
  card: TarotCard;
  relationshipStatus: RelationshipStatus;
  onReset: () => void;
}

export default function ResultScreen({ card, relationshipStatus, onReset }: ResultScreenProps) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // Use the same interpretation for both statuses
  const interpretation = card.interpretation;

  const handleShare = async (platform: 'facebook' | 'tiktok' | 'instagram') => {
    setIsGeneratingImage(true);

    try {
      // Generate share image
      if (shareCardRef.current) {
        const dataUrl = await toPng(shareCardRef.current, {
          quality: 0.95,
          pixelRatio: 2,
        });

        // Convert to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Platform-specific sharing
        if (navigator.share && platform === 'instagram') {
          // Use Web Share API for Instagram Stories (if available)
          const file = new File([blob], 'valentine-tarot.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: 'Valentine Tarot',
            text: card.quote,
          });
        } else {
          // Fallback: download image
          const link = document.createElement('a');
          link.download = `valentine-tarot-${card.name}.png`;
          link.href = dataUrl;
          link.click();

          // Show platform-specific instructions
          alert(getShareInstructions(platform));
        }
      }
    } catch (error) {
      console.error('Error generating share image:', error);
      alert('ไม่สามารถสร้างรูปภาพแชร์ได้ กรุณาลองอีกครั้ง');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const getShareInstructions = (platform: string) => {
    const instructions = {
      facebook: 'รูปภาพถูกบันทึกแล้ว! เปิด Facebook แล้วอัพโหลดรูปภาพนี้เพื่อแชร์',
      tiktok: 'รูปภาพถูกบันทึกแล้ว! เปิด TikTok แล้วสร้างโพสต์พร้อมรูปภาพนี้',
      instagram: 'รูปภาพถูกบันทึกแล้ว! เปิด Instagram Stories แล้วเลือกรูปภาพนี้',
    };
    return instructions[platform as keyof typeof instructions];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 pb-20 overflow-y-auto relative z-10"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Card Display */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-48 h-80 md:w-56 md:h-96 rounded-2xl overflow-hidden card-glow bg-white" style={{ border: '3px solid #FFD700' }}>
            <Image
              src={card.image_path}
              alt={card.card_name}
              fill
              className="object-contain p-2"
            />
          </div>
        </motion.div>

        {/* Card Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            {card.name}
          </h2>
          <p className="text-sm text-valentine-purple/60">
            {relationshipStatus === 'single' ? 'สำหรับคนโสด' : 'สำหรับคนมีคู่'}
          </p>
        </motion.div>

        {/* Interpretation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-3xl p-6 md:p-8 space-y-4 card-glow"
        >
          <div className="text-valentine-darkpurple leading-relaxed space-y-3 text-base md:text-lg">
            {interpretation.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="text-justify">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>
        </motion.div>

        {/* Share Quote Highlight */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 215, 0, 0.3) 100%)',
            border: '2px solid rgba(255, 215, 0, 0.5)',
          }}
        >
          <div className="absolute top-4 left-4 text-4xl text-valentine-gold/30">"</div>
          <div className="absolute bottom-4 right-4 text-4xl text-valentine-gold/30">"</div>
          <p className="text-lg md:text-xl text-valentine-darkpurple font-medium italic leading-relaxed">
            {card.quote}
          </p>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-xl md:text-2xl font-bold text-center text-valentine-purple">
            แชร์ผลไพ่ของคุณ 💕
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('tiktok')}
              disabled={isGeneratingImage}
              className="py-3 px-4 rounded-2xl bg-black text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              TikTok
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('facebook')}
              disabled={isGeneratingImage}
              className="py-3 px-4 rounded-2xl bg-blue-600 text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              Facebook
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare('instagram')}
              disabled={isGeneratingImage}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              IG Story
            </motion.button>
          </div>

          {isGeneratingImage && (
            <p className="text-center text-sm text-valentine-purple/60">
              กำลังสร้างรูปภาพ...
            </p>
          )}
        </motion.div>

        {/* LINE Tie-in Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-3xl p-6 md:p-8 space-y-4 text-center"
        >
          <p className="text-base md:text-lg text-valentine-darkpurple leading-relaxed">
            หากอยากดูความหมายเชิงลึกกว่านี้
          </p>
          <p className="text-base md:text-lg text-valentine-darkpurple leading-relaxed">
            ไพ่ 3 ใบใน LINE จะช่วยให้เห็นภาพชัดขึ้น 💗
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-[#06C755] text-white font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            ดูต่อใน LINE
          </motion.button>
        </motion.div>

        {/* Reset Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="text-valentine-purple/70 hover:text-valentine-purple underline text-sm md:text-base"
          >
            จับไพ่ใหม่ (พรุ่งนี้)
          </motion.button>
        </motion.div>
      </div>

      {/* Hidden share card for image generation */}
      <div className="fixed -left-[9999px] top-0">
        <div
          ref={shareCardRef}
          className="w-[1080px] h-[1920px] relative flex flex-col items-center justify-center p-20"
          style={{
            background: 'linear-gradient(135deg, #FFE5EC 0%, #FFF0F5 50%, #FFF5E1 100%)',
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
          }} />

          {/* Content */}
          <div className="relative z-10 space-y-12 text-center">
            <h1 className="text-8xl font-bold text-gradient">
              Valentine Tarot
            </h1>

            <div className="w-[600px] h-[1000px] rounded-3xl overflow-hidden bg-white" style={{ border: '6px solid #FFD700', boxShadow: '0 20px 60px rgba(255, 105, 180, 0.4)' }}>
              <div className="relative w-full h-full">
                <Image
                  src={card.image_path}
                  alt={card.card_name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            <h2 className="text-7xl font-bold text-gradient">
              {card.name}
            </h2>

            <div className="px-20 py-16 rounded-3xl" style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '4px solid rgba(255, 215, 0, 0.5)',
            }}>
              <p className="text-5xl text-valentine-darkpurple font-medium italic leading-relaxed">
                "{card.quote}"
              </p>
            </div>

            <div className="pt-8">
              <p className="text-4xl text-valentine-purple/70 font-medium">
                Valentine Tarot
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
