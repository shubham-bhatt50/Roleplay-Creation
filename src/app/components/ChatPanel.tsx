import { useState, useEffect, useRef } from "react";
import { IconSparkles, IconSend, IconCheck, IconX, IconEye } from "@tabler/icons-react";

type PendingChange = {
  id: string;
  originalContent: string;
  proposedContent: string;
  summary: string;
  status: "pending" | "previewing" | "accepted" | "rejected";
};

type ChatMessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  pendingChangeId?: string; // Links to a pending change
};

interface ChatPanelProps {
  activeTab: string;
  editorContent?: string;
  onPreviewChange?: (originalContent: string, proposedContent: string) => void;
  onAcceptChange?: (proposedContent: string) => void;
  onRejectChange?: () => void;
}

export function ChatPanel({ 
  activeTab, 
  editorContent = "",
  onPreviewChange,
  onAcceptChange,
  onRejectChange 
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I can help you edit this scenario. Try asking me to modify the content, change the tone, or add new details.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate generating a modified version of content
  const generateProposedContent = (userRequest: string, currentContent: string): { proposed: string; summary: string } => {
    // This is a simulation - in production, this would call an AI API
    const lowerRequest = userRequest.toLowerCase();
    
    if (lowerRequest.includes("shorter") || lowerRequest.includes("concise")) {
      // Simulate making content shorter by taking first portion
      const sentences = currentContent.split('. ');
      const shortened = sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ') + '.';
      return {
        proposed: shortened,
        summary: "Shortened the content by removing redundant sections"
      };
    } else if (lowerRequest.includes("detail") || lowerRequest.includes("expand")) {
      return {
        proposed: currentContent + "\n\nAdditional context: The scenario involves complex customer interactions that require empathy and problem-solving skills. The learner should focus on active listening and finding mutually beneficial solutions.",
        summary: "Added more context and details about the interaction"
      };
    } else if (lowerRequest.includes("tone") || lowerRequest.includes("friendly")) {
      return {
        proposed: currentContent.replace(/frustrated/g, "concerned").replace(/demanding/g, "eager"),
        summary: "Adjusted the tone to be more friendly and approachable"
      };
    } else {
      // Generic modification
      return {
        proposed: currentContent + "\n\n[AI suggested addition based on your request]",
        summary: `Made changes based on: "${userRequest}"`
      };
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userRequest = inputValue.trim();
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response with proposed changes
    setTimeout(() => {
      const changeId = (Date.now() + 1).toString();
      const { proposed, summary } = generateProposedContent(userRequest, editorContent);
      
      // Create pending change
      const pendingChange: PendingChange = {
        id: changeId,
        originalContent: editorContent,
        proposedContent: proposed,
        summary: summary,
        status: "pending"
      };
      
      setPendingChanges(prev => new Map(prev).set(changeId, pendingChange));

      const aiResponse: ChatMessageType = {
        id: changeId,
        role: "assistant",
        content: summary,
        timestamp: new Date(),
        pendingChangeId: changeId,
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePreviewChange = (changeId: string) => {
    const change = pendingChanges.get(changeId);
    if (change && onPreviewChange) {
      setPendingChanges(prev => {
        const updated = new Map(prev);
        updated.set(changeId, { ...change, status: "previewing" });
        return updated;
      });
      onPreviewChange(change.originalContent, change.proposedContent);
    }
  };

  const handleAcceptChange = (changeId: string) => {
    const change = pendingChanges.get(changeId);
    if (change && onAcceptChange) {
      setPendingChanges(prev => {
        const updated = new Map(prev);
        updated.set(changeId, { ...change, status: "accepted" });
        return updated;
      });
      onAcceptChange(change.proposedContent);
      
      // Add confirmation message
      const confirmMessage: ChatMessageType = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Changes applied successfully! Let me know if you'd like any other modifications.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const handleRejectChange = (changeId: string) => {
    const change = pendingChanges.get(changeId);
    if (change) {
      setPendingChanges(prev => {
        const updated = new Map(prev);
        updated.set(changeId, { ...change, status: "rejected" });
        return updated;
      });
      if (onRejectChange) {
        onRejectChange();
      }
      
      // Add confirmation message
      const confirmMessage: ChatMessageType = {
        id: Date.now().toString(),
        role: "assistant",
        content: "No problem! The changes have been discarded. Feel free to ask for different modifications.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "Make it shorter",
    "Add more detail",
    "Change tone",
  ];

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "scenario": return "scenario";
      case "persona": return "persona";
      case "evaluation": return "evaluation";
      case "exit": return "exit conditions";
      case "settings": return "settings";
      default: return tab;
    }
  };

  const renderMessageWithActions = (message: ChatMessageType) => {
    const pendingChange = message.pendingChangeId ? pendingChanges.get(message.pendingChangeId) : null;
    
    if (!pendingChange) {
      // Regular message without pending changes
      return (
        <div
          className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
            message.role === "user"
              ? "bg-[#0975d7] text-white rounded-br-sm"
              : "bg-[#f5f5f5] text-[#2b2b40] rounded-bl-sm"
          }`}
        >
          {message.content}
        </div>
      );
    }

    // Message with pending change - show action buttons
    return (
      <div className="max-w-[95%] rounded-xl text-sm leading-relaxed bg-[#f5f5f5] text-[#2b2b40] rounded-bl-sm overflow-hidden">
        <div className="px-3 py-2">
          {message.content}
        </div>
        
        {pendingChange.status === "pending" && (
          <div className="border-t border-[#e5e5e5] px-3 py-2 bg-[#fafafa]">
            <div className="flex gap-2">
              <button
                onClick={() => handlePreviewChange(message.pendingChangeId!)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-[#d7d6d1] text-[#3d3c52] text-xs font-medium rounded-md hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              >
                <IconEye className="w-3.5 h-3.5" stroke={2} />
                Preview
              </button>
              <button
                onClick={() => handleAcceptChange(message.pendingChangeId!)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0975d7] text-white text-xs font-medium rounded-md hover:bg-[#0860b0] transition-colors cursor-pointer"
              >
                <IconCheck className="w-3.5 h-3.5" stroke={2} />
                Apply
              </button>
              <button
                onClick={() => handleRejectChange(message.pendingChangeId!)}
                className="flex items-center justify-center px-2 py-1.5 text-[#6b697b] hover:text-[#dc2626] hover:bg-red-50 text-xs font-medium rounded-md transition-colors cursor-pointer"
              >
                <IconX className="w-3.5 h-3.5" stroke={2} />
              </button>
            </div>
          </div>
        )}

        {pendingChange.status === "previewing" && (
          <div className="border-t border-[#e5e5e5] px-3 py-2 bg-[#fffbeb]">
            <p className="text-xs text-[#92400e] mb-2">Previewing changes in editor...</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleAcceptChange(message.pendingChangeId!)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#16a34a] text-white text-xs font-medium rounded-md hover:bg-[#15803d] transition-colors cursor-pointer"
              >
                <IconCheck className="w-3.5 h-3.5" stroke={2} />
                Accept changes
              </button>
              <button
                onClick={() => handleRejectChange(message.pendingChangeId!)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-[#d7d6d1] text-[#3d3c52] text-xs font-medium rounded-md hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              >
                <IconX className="w-3.5 h-3.5" stroke={2} />
                Discard
              </button>
            </div>
          </div>
        )}

        {pendingChange.status === "accepted" && (
          <div className="border-t border-[#dcfce7] px-3 py-2 bg-[#f0fdf4]">
            <p className="text-xs text-[#16a34a] flex items-center gap-1">
              <IconCheck className="w-3.5 h-3.5" stroke={2} />
              Changes applied
            </p>
          </div>
        )}

        {pendingChange.status === "rejected" && (
          <div className="border-t border-[#fee2e2] px-3 py-2 bg-[#fef2f2]">
            <p className="text-xs text-[#dc2626] flex items-center gap-1">
              <IconX className="w-3.5 h-3.5" stroke={2} />
              Changes discarded
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[320px] h-full border-l border-[#eee] bg-white flex flex-col shrink-0">
      {/* Header - matches main page header height */}
      <div className="px-4 border-b border-[#eee] flex items-center gap-2 shrink-0 h-[70px]">
        <div className="text-[#0975d7]">
          <IconSparkles className="w-5 h-5" stroke={2} />
        </div>
        <p className="font-semibold text-sm text-[#1f1f32]">
          AI assistant
        </p>
        <p className="text-xs text-[#8d8ba7] ml-auto capitalize">
          Editing: {getTabLabel(activeTab)}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex w-full mb-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {renderMessageWithActions(message)}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-3">
            <div className="bg-[#f5f5f5] px-3 py-2 rounded-xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#8c899f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-[#8c899f] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-[#8c899f] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => setInputValue(action)}
            className="px-2.5 py-1 bg-[#f5f5f5] hover:bg-[#e8e7ed] text-[#6b697b] text-xs font-medium rounded-full transition-colors cursor-pointer"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 pt-2 border-t border-[#eee] shrink-0">
        <div className="flex items-end gap-2 bg-[#f9f9fb] rounded-xl p-2 border border-[#e0dfe6]">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me to edit the content..."
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-[#2b2b40] placeholder:text-[#8c899f] max-h-[100px] min-h-[24px]"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`p-2 rounded-lg transition-colors shrink-0 ${
              inputValue.trim() && !isTyping
                ? "bg-[#0975d7] text-white cursor-pointer hover:bg-[#0860b0]"
                : "bg-[#e8e7ed] text-[#8c899f] cursor-not-allowed"
            }`}
          >
            <IconSend className="w-4 h-4" stroke={2} />
          </button>
        </div>
        <p className="text-[10px] text-[#8c899f] mt-1.5 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
