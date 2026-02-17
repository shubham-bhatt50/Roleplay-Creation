import { IconCheck, IconArrowBack } from "@tabler/icons-react";

interface EditorChangePreviewProps {
  isVisible: boolean;
  onAccept: () => void;
  onReject: () => void;
  changesSummary?: string;
}

export function EditorChangePreview({ 
  isVisible, 
  onAccept, 
  onReject,
  changesSummary = "AI suggested changes"
}: EditorChangePreviewProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-slide-up">
      <div className="bg-white rounded-xl shadow-lg border border-[#e5e5e5] px-4 py-3 flex items-center gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="text-sm text-[#3d3c52] font-medium">
            Previewing changes
          </span>
        </div>
        
        {/* Summary */}
        <span className="text-sm text-[#6b697b] border-l border-[#e5e5e5] pl-4">
          {changesSummary}
        </span>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={onReject}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#d7d6d1] text-[#3d3c52] text-sm font-medium rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            <IconArrowBack className="w-4 h-4" stroke={2} />
            Revert
          </button>
          <button
            onClick={onAccept}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16a34a] text-white text-sm font-medium rounded-lg hover:bg-[#15803d] transition-colors cursor-pointer"
          >
            <IconCheck className="w-4 h-4" stroke={2} />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
