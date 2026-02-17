import { useMemo } from "react";
import { generateDiff, getDiffSummary } from "../utils/diffUtils";

interface DiffPreviewProps {
  originalContent: string;
  proposedContent: string;
  isVisible: boolean;
}

export function DiffPreview({ originalContent, proposedContent, isVisible }: DiffPreviewProps) {
  const diffSegments = useMemo(() => {
    if (!isVisible || !originalContent || !proposedContent) return [];
    return generateDiff(originalContent, proposedContent);
  }, [originalContent, proposedContent, isVisible]);

  const summary = useMemo(() => {
    if (!isVisible || !originalContent || !proposedContent) return null;
    return getDiffSummary(originalContent, proposedContent);
  }, [originalContent, proposedContent, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="diff-preview-wrapper">
      {/* Legend */}
      <div className="diff-legend">
        <div className="diff-legend-item">
          <div className="diff-legend-dot added" />
          <span className="text-[#166534]">Added ({summary?.added || 0} words)</span>
        </div>
        <div className="diff-legend-item">
          <div className="diff-legend-dot removed" />
          <span className="text-[#991b1b]">Removed ({summary?.removed || 0} words)</span>
        </div>
      </div>

      {/* Diff content */}
      <div className="diff-container prose prose-sm max-w-none">
        {diffSegments.map((segment, index) => {
          if (segment.type === 'removed') {
            return (
              <span key={index} className="diff-removed">
                {segment.text}
              </span>
            );
          }
          if (segment.type === 'added') {
            return (
              <span key={index} className="diff-added">
                {segment.text}
              </span>
            );
          }
          return <span key={index}>{segment.text}</span>;
        })}
      </div>
    </div>
  );
}
