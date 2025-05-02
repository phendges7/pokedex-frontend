import React from "react";
import "./Preloader.css";

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-name"></div>
  </div>
);

const SkeletonGrid = ({ count = 15 }) => (
  <div className="skeleton-grid">
    {Array(count)
      .fill()
      .map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
      ))}
  </div>
);

export default SkeletonGrid;
