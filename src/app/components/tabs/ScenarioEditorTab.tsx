import { useEffect } from "react";
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { DiffPreview } from "../DiffPreview";
import { EditorChangePreview } from "../EditorChangePreview";
import { ScenarioData } from "../../types/scenario";

interface ScenarioEditorTabProps {
  scenarioData: ScenarioData | null;
  shouldShowPlaceholder: boolean;
  isPreviewingChanges: boolean;
  originalContent: string;
  proposedContent: string;
  onAcceptChange: () => void;
  onRejectChange: () => void;
  onEditorReady?: (editor: Editor) => void;
}

// Generate detailed scenario content based on scenario data
const generateScenarioContent = (data: ScenarioData | null | undefined, shouldShowPlaceholder: boolean): string => {
  // If prompt is incomplete, show placeholder content
  if (shouldShowPlaceholder) {
    return `
      <p class="text-[#8d8ba7] italic">The scenario content will appear here once you provide more details in the chat.</p>
      
      <p class="text-[#8d8ba7] italic">Use the AI assistant on the right to describe your scenario, and I'll help you build it step by step.</p>
    `;
  }
  
  if (!data) {
    return `
    <p>You are <strong>Alex</strong>, a customer who is <strong>frustrated</strong> and contacting customer support because you want a full refund for a product you recently bought. You expect a quick resolution and are feeling upset about the situation.</p>
    
    <p>Your emotional state is <strong>frustrated</strong>, which means you may express your concerns with some intensity. You should communicate your need for a full refund clearly and firmly, while also expressing your dissatisfaction with the product or service you received.</p>
  `;
  }

  const modalityText = data.modality === "Audio" ? "phone call" : "chat conversation";
  const difficultyText = data.difficulty === "High" ? "challenging" : data.difficulty === "Medium" ? "moderate" : "straightforward";
  const emotionLower = data.emotion.toLowerCase();
  
  // Get emotion-specific behavior guidance
  const getEmotionGuidance = (emotion: string): string => {
    const lower = emotion.toLowerCase();
    if (lower.includes("angry") || lower.includes("frustrated")) {
      return "You may express your concerns with intensity and may be less patient with responses. You should communicate firmly and may show signs of irritation if the conversation doesn't progress quickly.";
    }
    if (lower.includes("confused")) {
      return "You may ask clarifying questions frequently and need more explanation. You should express uncertainty and seek reassurance about the process.";
    }
    if (lower.includes("disappointed") || lower.includes("sad")) {
      return "You may express your concerns with a more subdued tone, showing disappointment. You should communicate your needs clearly but may sound less energetic or enthusiastic.";
    }
    if (lower.includes("anxious")) {
      return "You may express urgency and concern about the situation. You should communicate your needs clearly while potentially showing signs of worry or stress.";
    }
    return "You should communicate your needs clearly and express your emotional state authentically throughout the conversation.";
  };
  
  const scenarioContent = `
    <h2>Scenario</h2>
    <p>You are <strong>${data.customerName}</strong>, a customer who is <strong>${emotionLower}</strong> and contacting a <strong>${data.trainee}</strong> via ${modalityText} because ${data.scenario}. You expect a quick resolution and are feeling ${emotionLower} about the situation.</p>
    
    <p>Your emotional state is <strong>${emotionLower}</strong>, which means ${getEmotionGuidance(data.emotion)} Throughout the ${modalityText}, you should maintain this emotional tone and respond authentically to the support representative's attempts to help you.</p>
    
    <p>This is a ${difficultyText} scenario, which means the interaction may involve ${data.difficulty === "High" ? "complex issues that require multiple steps to resolve, potential pushback, or situations where you may need to advocate strongly for your position" : data.difficulty === "Medium" ? "moderate complexity where some negotiation or clarification may be needed" : "relatively straightforward issues that should be resolvable with clear communication"}. The interaction will take place via ${modalityText}, so you should communicate in a manner appropriate for this ${data.modality.toLowerCase()} format.</p>
    
    <p>Your primary goal is to ${data.scenario}. You should express this need clearly and persistently, while also responding naturally to the support representative's questions and attempts to resolve your issue. Remember to stay in character as someone who is ${emotionLower} and maintain that emotional state throughout the conversation.</p>
    
    <p>As the AI playing ${data.customerName}, your role is to provide a realistic, ${emotionLower} customer experience. The ${data.difficulty.toLowerCase()} difficulty level means you should ${data.difficulty === "High" ? "present more complex challenges, potentially escalate if not handled well, and require the learner to work harder to resolve the situation" : data.difficulty === "Medium" ? "present moderate challenges that require some skill to navigate" : "present straightforward challenges that allow the learner to demonstrate basic competency"}.</p>
  `;

  return scenarioContent;
};

export function ScenarioEditorTab({
  scenarioData,
  shouldShowPlaceholder,
  isPreviewingChanges,
  originalContent,
  proposedContent,
  onAcceptChange,
  onRejectChange,
  onEditorReady,
}: ScenarioEditorTabProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#0975d7] underline',
        },
      }),
    ],
    content: generateScenarioContent(scenarioData, shouldShowPlaceholder),
    editable: !shouldShowPlaceholder,
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-sm max-w-none',
      },
    },
  });

  // Notify parent when editor is ready
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Update editor content when scenarioData changes
  useEffect(() => {
    if (editor && scenarioData) {
      editor.commands.setContent(generateScenarioContent(scenarioData, shouldShowPlaceholder));
    }
  }, [scenarioData, editor, shouldShowPlaceholder]);

  // Update editor editable state when shouldShowPlaceholder changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!shouldShowPlaceholder);
    }
  }, [shouldShowPlaceholder, editor]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Formatting Toolbar */}
      <div className="bg-white border-b border-[#eee] py-2 shrink-0">
        <div className="px-6 flex items-center gap-2">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive('bold') ? 'bg-gray-200' : ''
            }`}
            title="Bold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
            </svg>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive('italic') ? 'bg-gray-200' : ''
            }`}
            title="Italic"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
            </svg>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive('underline') ? 'bg-gray-200' : ''
            }`}
            title="Underline"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/>
            </svg>
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive('bulletList') ? 'bg-gray-200' : ''
            }`}
            title="Bullet list"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive('orderedList') ? 'bg-gray-200' : ''
            }`}
            title="Numbered list"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
              <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
            </svg>
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
            }`}
            title="Align left"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
            }`}
            title="Align center"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
            }`}
            title="Align right"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <select className="text-sm border border-[#e5e5e5] rounded px-2 py-1.5">
              <option>Normal text</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>
            <button className="p-2 rounded hover:bg-gray-100">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="px-6 py-6">
          {isPreviewingChanges ? (
            <DiffPreview
              originalContent={originalContent}
              proposedContent={proposedContent}
              isVisible={isPreviewingChanges}
            />
          ) : (
            <div className="prose prose-sm max-w-none">
              <EditorContent editor={editor} />
            </div>
          )}
        </div>

        {/* AI Change Preview Actions */}
        {isPreviewingChanges && (
          <EditorChangePreview
            isVisible={isPreviewingChanges}
            onAccept={onAcceptChange}
            onReject={onRejectChange}
            changesSummary="AI suggested changes"
          />
        )}
      </div>
    </div>
  );
}

// Export the content generator for external use
export { generateScenarioContent };
