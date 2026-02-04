'use client';

import { motion } from 'framer-motion';
import { RelationshipStatus } from '@/types/tarot';

interface LandingScreenProps {
  onSelectStatus: (status: RelationshipStatus) => void;
}

export default function LandingScreen({ onSelectStatus }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-md w-full space-y-8 text-center relative z-10">
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            ♥ Valentine Tarot ♥
          </h1>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 px-4"
        >
          <p className="text-lg md:text-xl text-valentine-darkpurple leading-relaxed">
            วาเลนไทน์นี้ ลองฟังเสียงหัวใจตัวเอง
          </p>
          <p className="text-lg md:text-xl text-valentine-darkpurple leading-relaxed">
            แล้วปล่อยให้ไพ่เลือกคุณ
          </p>
        </motion.div>

        {/* Status Selection Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectStatus('single')}
            className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-valentine-hotpink to-valentine-gold text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 card-glow"
          >
            โสด 💫
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectStatus('in_relationship')}
            className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-valentine-gold to-valentine-hotpink text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 card-glow"
          >
            มีคู่ 💕
          </motion.button>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-4"
        >
          <p className="text-sm text-valentine-purple/60">
            เลือกสถานะความสัมพันธ์ของคุณ
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
