import React from "react";

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-name"></div>
  </div>
);

const SkeletonGrid = ({ count = 15, className = "" }) => (
  <div className={`skeleton-grid ${className}`}>
    {Array(count)
      .fill()
      .map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
      ))}
  </div>
);

export default SkeletonGrid;
