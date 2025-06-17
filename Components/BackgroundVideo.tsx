'use client';
import React from 'react';

const BackgroundVideo = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="fixed top-0 left-0 z-[-1] h-full w-full object-cover"
    >
      <source src="/videos/airflex-promo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
