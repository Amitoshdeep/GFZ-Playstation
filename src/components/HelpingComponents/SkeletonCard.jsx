// src/components/SkeletonCard.js
import React from "react";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-800/50 rounded-2xl p-4 w-full h-48">
      <div className="bg-gray-700 h-32 rounded-xl mb-3"></div>
      <div className="bg-gray-700 h-4 w-3/4 rounded mb-2"></div>
      <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
    </div>
  );
}
