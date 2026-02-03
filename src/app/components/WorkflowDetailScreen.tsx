import { useState } from "react";
import { IconArrowLeft, IconArrowUpRight, IconDots, IconArrowsMaximize, IconChevronLeft, IconChevronRight, IconPlus, IconX, IconUsers, IconSearch } from "@tabler/icons-react";

interface AttachedRoleplay {
  id: string;
  name: string;
}

interface DraftRoleplay {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
}

interface WorkflowDetailScreenProps {
  onBack: () => void;
  workflowId: string;
  workflowName: string;
  attachedRoleplay?: AttachedRoleplay | null;
  onNavigateToRoleplay?: (roleplayId: string) => void;
  onCreateNewRoleplay?: (workflowId: string, workflowName: string) => void;
  onAttachRoleplay?: (roleplayId: string, roleplayName: string) => void;
}

// Sample draft roleplays
const draftRoleplays: DraftRoleplay[] = [
  { id: "draft-1", name: "Angry customer refund scenario", createdBy: "Sarah Johnson", createdAt: "2 days ago" },
  { id: "draft-2", name: "Product exchange request", createdBy: "Mark Wilson", createdAt: "1 week ago" },
  { id: "draft-3", name: "Billing dispute resolution", createdBy: "Ann Perkins", createdAt: "3 days ago" },
  { id: "draft-4", name: "Technical support escalation", createdBy: "John Smith", createdAt: "5 days ago" },
];

// Sample capture data
const captures = [
  {
    id: "1",
    title: "Capture 1",
    description: "Click on center",
    image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
  {
    id: "2",
    title: "Capture 2",
    description: "Click on Google icon",
    image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
  {
    id: "3",
    title: "Capture 3",
    description: "Google",
    image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
];

export function WorkflowDetailScreen({ 
  onBack, 
  workflowId, 
  workflowName, 
  attachedRoleplay,
  onNavigateToRoleplay,
  onCreateNewRoleplay,
  onAttachRoleplay
}: WorkflowDetailScreenProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [localAttachedRoleplay, setLocalAttachedRoleplay] = useState<AttachedRoleplay | null>(attachedRoleplay || null);
  
  const totalPages = 1;
  const itemsPerPage = 6;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, captures.length);

  const filteredRoleplays = draftRoleplays.filter(rp => 
    rp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAttachRoleplay = (roleplay: DraftRoleplay) => {
    setLocalAttachedRoleplay({ id: roleplay.id, name: roleplay.name });
    onAttachRoleplay?.(roleplay.id, roleplay.name);
    setShowAttachModal(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5f5f7] min-h-0 overflow-hidden">
      {/* Breadcrumb */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2 text-sm">
          <button 
            onClick={onBack}
            className="text-[#0975d7] hover:underline font-medium"
          >
            Workflows
          </button>
          <span className="text-[#8d8ba7]">/</span>
          <span className="text-[#6b697b]">{workflowName}</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pb-4">
        <div className="flex items-start justify-between">
          {/* Left Section - Title and Roleplay Link */}
          <div className="flex flex-col">
            {/* Title Row */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#f0f0f5] rounded flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b697b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h1 className="text-[20px] font-semibold text-[#2b2b40]">
                {workflowName}
              </h1>
            </div>

            {/* Attached Roleplay Link - Below Title */}
            {localAttachedRoleplay ? (
              <button 
                className="flex items-center gap-1.5 mt-2 ml-11 text-[13px] text-[#8d8ba7] hover:text-[#6b6b80] transition-colors group"
                onClick={() => onNavigateToRoleplay?.(localAttachedRoleplay.id)}
              >
                <div className="w-5 h-5 rounded-full bg-[#f0f0f5] flex items-center justify-center group-hover:bg-[#e5e5ea] transition-colors">
                  <IconArrowUpRight className="w-3 h-3 text-[#8d8ba7]" stroke={2} />
                </div>
                <span className="group-hover:underline">{localAttachedRoleplay.name}</span>
              </button>
            ) : (
              <button 
                className="flex items-center gap-1.5 mt-2 ml-11 text-[13px] text-[#0975d7] hover:text-[#0861b8] transition-colors group"
                onClick={() => setShowAttachModal(true)}
              >
                <div className="w-5 h-5 rounded-full bg-[#e0f2fe] flex items-center justify-center group-hover:bg-[#bae6fd] transition-colors">
                  <IconPlus className="w-3 h-3 text-[#0975d7]" stroke={2.5} />
                </div>
                <span className="group-hover:underline">Attach a roleplay</span>
              </button>
            )}
          </div>

          {/* Right Actions */}
          <button className="bg-[#d0450b] hover:bg-[#b83d0a] text-white px-5 py-2 rounded text-sm font-medium transition-colors">
            Preview
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-[#e5e5ea]" />

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {captures.map((capture) => (
            <div 
              key={capture.id}
              className="bg-white rounded-lg border border-[#e5e5ea] overflow-hidden shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f5]">
                <span className="text-sm font-semibold text-[#2b2b40]">{capture.title}</span>
                <button className="p-1 hover:bg-[#f5f5f7] rounded transition-colors">
                  <IconDots className="w-4 h-4 text-[#8d8ba7]" stroke={2} />
                </button>
              </div>

              {/* Description */}
              <div className="px-4 py-3 border-b border-[#f0f0f5]">
                <input 
                  type="text"
                  defaultValue={capture.description}
                  className="w-full text-sm text-[#2b2b40] bg-transparent border border-[#e5e5ea] rounded px-3 py-2 focus:outline-none focus:border-[#0975d7]"
                  readOnly
                />
              </div>

              {/* Screenshot Preview */}
              <div className="relative aspect-[16/10] bg-[#1a1a1a] m-3 rounded border border-[#e5e5ea] overflow-hidden">
                {/* Fake browser chrome */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="bg-[#2d2d2d] px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 bg-[#404040] rounded px-3 py-1 text-[10px] text-[#999] ml-2">
                      google.com
                    </div>
                  </div>
                  <div className="flex-1 bg-[#202124] flex flex-col items-center justify-center px-4 py-6">
                    <span className="text-white text-lg font-medium tracking-wide">Google</span>
                    <div className="mt-3 w-full max-w-[200px] h-8 bg-[#303134] rounded-full border border-[#5f6368] flex items-center px-3">
                      <div className="flex-1" />
                      <div className="flex gap-2">
                        <div className="w-4 h-4 rounded bg-[#4285f4]" />
                        <div className="w-4 h-4 rounded bg-[#ea4335]" />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="px-3 py-1.5 bg-[#303134] rounded text-[8px] text-[#e8eaed]">Google Search</div>
                      <div className="px-3 py-1.5 bg-[#303134] rounded text-[8px] text-[#e8eaed]">I'm Feeling Lucky</div>
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <button className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded shadow flex items-center justify-center hover:bg-[#f5f5f7] transition-colors">
                  <IconArrowsMaximize className="w-4 h-4 text-[#6b697b]" stroke={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Pagination */}
      <div className="border-t border-[#e5e5ea] px-6 py-3 flex items-center justify-between bg-white">
        <span className="text-sm text-[#6b697b]">
          Screens {startItem}-{endItem} of {captures.length}
        </span>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <IconChevronLeft className="w-4 h-4 text-[#6b697b]" stroke={2} />
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded bg-[#0975d7] text-white text-sm font-medium"
          >
            {currentPage}
          </button>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <IconChevronRight className="w-4 h-4 text-[#6b697b]" stroke={2} />
          </button>
        </div>
      </div>

      {/* Attach Roleplay Modal */}
      {showAttachModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[600px] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5ea]">
              <h2 className="text-lg font-semibold text-[#2b2b40]">Attach roleplay</h2>
              <button 
                onClick={() => setShowAttachModal(false)}
                className="p-1 hover:bg-[#f5f5f7] rounded transition-colors"
              >
                <IconX className="w-5 h-5 text-[#6b697b]" stroke={2} />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-[#e5e5ea]">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8ba7]" stroke={2} />
                <input
                  type="text"
                  placeholder="Search roleplays..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#e5e5ea] rounded-md text-sm focus:outline-none focus:border-[#0975d7]"
                />
              </div>
            </div>

            {/* Create New Option */}
            <button
              onClick={() => {
                setShowAttachModal(false);
                onCreateNewRoleplay?.(workflowId, workflowName);
              }}
              className="mx-6 mt-4 flex items-center gap-3 p-3 border-2 border-dashed border-[#0975d7] rounded-lg hover:bg-[#f0f7ff] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center">
                <IconPlus className="w-5 h-5 text-[#0975d7]" stroke={2} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#0975d7]">Create new roleplay</p>
                <p className="text-xs text-[#8d8ba7]">Start from scratch with the scenario builder</p>
              </div>
            </button>

            {/* Divider */}
            <div className="px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#e5e5ea]" />
                <span className="text-xs text-[#8d8ba7]">or select from drafts</span>
                <div className="flex-1 h-px bg-[#e5e5ea]" />
              </div>
            </div>

            {/* Draft Roleplays List */}
            <div className="flex-1 overflow-auto px-6 pb-4">
              <div className="space-y-2">
                {filteredRoleplays.length > 0 ? (
                  filteredRoleplays.map((roleplay) => (
                    <button
                      key={roleplay.id}
                      onClick={() => handleAttachRoleplay(roleplay)}
                      className="w-full flex items-center gap-3 p-3 border border-[#e5e5ea] rounded-lg hover:border-[#0975d7] hover:bg-[#f9fbfd] transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#f0f0f5] flex items-center justify-center">
                        <IconUsers className="w-5 h-5 text-[#6b697b]" stroke={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#2b2b40] truncate">{roleplay.name}</p>
                        <p className="text-xs text-[#8d8ba7]">
                          By {roleplay.createdBy} • {roleplay.createdAt}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-sm text-[#8d8ba7]">
                    No roleplays found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
