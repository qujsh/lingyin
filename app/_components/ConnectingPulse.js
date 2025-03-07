export default function ConnectingPulse() {
  return (
    <div className="relative flex justify-center items-center w-16 h-16">
      <div className="absolute w-16 h-16 bg-blue-400 opacity-30 rounded-full animate-ping"></div>
      <div className="absolute w-12 h-12 bg-blue-500 opacity-60 rounded-full animate-ping"></div>
      <div className="absolute w-8 h-8 bg-blue-600 rounded-full"></div>
    </div>
  );
}
