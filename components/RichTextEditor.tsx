import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import {
  Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Image as ImageIcon, Link as LinkIcon,
  RotateCcw, RotateCw, Maximize2, Palette, Type,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      TextStyle,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none w-full min-h-[400px] p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
      },
    },
    immediatelyRender: false,
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter URL:');
    const text = window.getSelection()?.toString() || 'Link';
    if (url && editor) {
      editor.chain().focus().setLink({ href: url, target: '_blank' }).insertContent(text).run();
    }
  }, [editor]);

  const setColor = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const buttonClasses =
    'p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const activeButtonClasses = 'bg-primary text-white hover:bg-primary/90';

  const isActive = (name: string, attrs?: Record<string, any>) => {
    return editor.isActive(name, attrs);
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 p-3 flex flex-wrap gap-1 sticky top-0 z-10">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('bold') ? activeButtonClasses : ''}`}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('italic') ? activeButtonClasses : ''}`}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('strike') ? activeButtonClasses : ''}`}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
              disabled={disabled}
              className={`${buttonClasses} ${isActive('heading', { level }) ? activeButtonClasses : ''}`}
              title={`Heading ${level}`}
            >
              {level === 1 ? <Heading1 size={18} /> : level === 2 ? <Heading2 size={18} /> : <Heading3 size={18} />}
            </button>
          ))}
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('bulletList') ? activeButtonClasses : ''}`}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('orderedList') ? activeButtonClasses : ''}`}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
        </div>

        {/* Blockquote & Code */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('blockquote') ? activeButtonClasses : ''}`}
            title="Blockquote"
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={disabled}
            className={`${buttonClasses} ${isActive('codeBlock') ? activeButtonClasses : ''}`}
            title="Code Block"
          >
            <Code size={18} />
          </button>
        </div>

        {/* Colors */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          <div className="flex gap-1">
            {['#000000', '#e74c3c', '#3498db', '#2ecc71', '#f39c12'].map((color) => (
              <button
                key={color}
                onClick={() => setColor(color)}
                disabled={disabled}
                className={`w-6 h-6 rounded border border-gray-300 hover:border-gray-400 ${
                  isActive('textStyle', { color }) ? 'ring-2 ring-primary' : ''
                }`}
                style={{ backgroundColor: color }}
                title={`Color: ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Media */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          <button
            onClick={addImage}
            disabled={disabled}
            className={`${buttonClasses}`}
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            onClick={addLink}
            disabled={disabled}
            className={`${buttonClasses}`}
            title="Insert Link"
          >
            <LinkIcon size={18} />
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disabled || !editor.can().undo()}
            className={`${buttonClasses}`}
            title="Undo"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disabled || !editor.can().redo()}
            className={`${buttonClasses}`}
            title="Redo"
          >
            <RotateCw size={18} />
          </button>
        </div>

        {/* Clear Formatting */}
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          disabled={disabled}
          className={`${buttonClasses}`}
          title="Clear Formatting"
        >
          <Type size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Character Count */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
        {editor.storage.characterCount?.characters?.() || 0} characters
      </div>
    </div>
  );
};

export default RichTextEditor;
