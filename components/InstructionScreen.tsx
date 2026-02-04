'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InstructionScreenProps {
  onBegin: () => void;
}

export default function InstructionScreen({ onBegin }: InstructionScreenProps) {
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    // Show countdown after 2 seconds
    const timer = setTimeout(() => {
      setShowCountdown(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showCountdown) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-start carousel after countdown
      const timer = setTimeout(() => {
        onBegin();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [countdown, showCountdown, onBegin]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
    >
      {/* Mystical background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="max-w-md w-full space-y-12 text-center relative z-10">
        {/* Instruction Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="glass-effect rounded-3xl p-8 space-y-6 card-glow"
        >
          {/* Crystal ball icon */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl"
          >
            🔮
          </motion.div>

          {/* Instruction text */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-valentine-darkpurple font-medium leading-relaxed">
              มองไพ่ที่เลื่อนผ่านไปเรื่อย ๆ
            </p>
            <p className="text-xl md:text-2xl text-valentine-darkpurple font-medium leading-relaxed">
              เมื่อรู้สึกว่า "ใบนี้แหละ"
            </p>
            <p className="text-xl md:text-2xl text-valentine-darkpurple font-medium leading-relaxed">
              ให้แตะเลือก
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-valentine-gold">✨</span>
            <span className="text-valentine-hotpink">♥</span>
            <span className="text-valentine-gold">✨</span>
          </div>

          <p className="text-sm text-valentine-purple/70">
            ให้สัญชาตญาณของคุณเป็นผู้นำทาง
          </p>
        </motion.div>

        {/* Countdown or Begin prompt */}
        {showCountdown ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {countdown > 0 ? (
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="text-6xl font-bold text-gradient"
              >
                {countdown}
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl text-valentine-hotpink font-semibold"
              >
                เริ่มกันเลย... ✨
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-valentine-purple/60 text-sm"
          >
            กำลังเตรียมไพ่...
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
