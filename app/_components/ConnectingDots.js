"use client";
import * as motion from "motion/react-client";

export default function ConnectingDots() {
  return (
    <div className="flex items-center gap-1">
      <p className="bt-color text-sm font-medium">连接服务</p>
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-500 rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, -1, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
