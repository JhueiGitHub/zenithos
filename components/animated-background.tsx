// /root/components/animated-background.tsx

import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <video autoPlay loop muted className="w-full h-full object-cover">
        <source src="/media/BlackWaves.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AnimatedBackground;
