export default function ConnectingRotating() {
  return (
    <div className="relative w-12 h-12 flex justify-center items-center">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full"
            style={{
              transform: `rotate(${i * 60}deg) translateY(-10px)`,
              animation: `fadeInOut 1.2s infinite ${i * 0.2}s`,
            }}
          />
        ))}
      <style>{`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
    </div>
  );
}
