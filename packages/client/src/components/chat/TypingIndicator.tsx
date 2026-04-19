type TypingIndicatorProps = {
   dotCount?: number;
   size?: number; // px
   color?: string; // tailwind color class
   bounce?: boolean; // bounce or pulse
};

const TypingIndicator = ({
   dotCount = 3,
   size = 8,
   color = 'bg-gray-600',
   bounce = true,
}: TypingIndicatorProps) => {
   return (
      <div className="px-3 py-2 rounded-2xl bg-gray-200 self-start flex items-center gap-1">
         {Array.from({ length: dotCount }).map((_, i) => (
            <span
               key={i}
               className={`rounded-full ${color} ${
                  bounce ? 'animate-bounce' : 'animate-pulse'
               }`}
               style={{
                  width: size,
                  height: size,
                  animationDelay: `${i * 0.15}s`,
               }}
            />
         ))}
      </div>
   );
};

export default TypingIndicator;
