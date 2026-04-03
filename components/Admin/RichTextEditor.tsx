import React, { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
};

const HEADING_OPTIONS = [
  { label: 'P', value: 'p' },
  { label: 'H1', value: 'h1' },
  { label: 'H2', value: 'h2' },
  { label: 'H3', value: 'h3' },
  { label: 'H4', value: 'h4' },
  { label: 'H5', value: 'h5' },
  { label: 'H6', value: 'h6' }
];

export const RichTextEditor: React.FC<Props> = ({ value, onChange, onImageUpload }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [isCodeView, setIsCodeView] = useState(false);

  useEffect(() => {
    if (!isCodeView && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<p></p>';
    }
  }, [value, isCodeView]);

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }, []);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range;
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    if (savedRangeRef.current) {
      selection.addRange(savedRangeRef.current);
    }
  };

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const run = (command: string, arg?: string) => {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, arg);
    saveSelection();
    emitChange();
  };

  const runFromToolbar = (command: string, arg?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    run(command, arg);
  };

  const handleImageInsert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let imageUrl = '';
    if (onImageUpload) {
      imageUrl = await onImageUpload(file);
    } else {
      imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.readAsDataURL(file);
      });
    }

    if (imageUrl) run('insertImage', imageUrl);
    e.target.value = '';
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <select
          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm"
          defaultValue="p"
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => run('formatBlock', `<${e.target.value}>`)}
        >
          {HEADING_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button type="button" onMouseDown={runFromToolbar('bold')} className="px-2 py-1 text-sm border rounded">B</button>
        <button type="button" onMouseDown={runFromToolbar('italic')} className="px-2 py-1 text-sm border rounded italic">I</button>
        <button type="button" onMouseDown={runFromToolbar('underline')} className="px-2 py-1 text-sm border rounded underline">U</button>
        <button type="button" onMouseDown={runFromToolbar('insertUnorderedList')} className="px-2 py-1 text-sm border rounded">• List</button>
        <button type="button" onMouseDown={runFromToolbar('insertOrderedList')} className="px-2 py-1 text-sm border rounded">1. List</button>
        <button type="button" onMouseDown={(e) => {
          e.preventDefault();
          const url = window.prompt('Enter URL');
          if (url) run('createLink', url);
        }} className="px-2 py-1 text-sm border rounded">Link</button>
        <button type="button" onMouseDown={runFromToolbar('justifyLeft')} className="px-2 py-1 text-sm border rounded">Left</button>
        <button type="button" onMouseDown={runFromToolbar('justifyCenter')} className="px-2 py-1 text-sm border rounded">Center</button>
        <button type="button" onMouseDown={runFromToolbar('justifyRight')} className="px-2 py-1 text-sm border rounded">Right</button>
        <label className="px-2 py-1 text-sm border rounded cursor-pointer">
          Image
          <input type="file" accept="image/*" className="hidden" onChange={handleImageInsert} />
        </label>
        <button type="button" onClick={() => setIsCodeView((prev) => !prev)} className="px-2 py-1 text-sm border rounded">
          {isCodeView ? 'Visual' : 'HTML'}
        </button>
      </div>

      {isCodeView ? (
        <textarea
          rows={14}
          className="w-full p-3 dark:bg-gray-800 outline-none font-mono text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={emitChange}
          onMouseUp={saveSelection}
          onKeyUp={saveSelection}
          onBlur={saveSelection}
          className="min-h-[320px] p-3 dark:bg-gray-800 outline-none leading-relaxed [&_h1]:text-4xl [&_h1]:font-bold [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-2xl [&_h3]:font-semibold [&_h4]:text-xl [&_h4]:font-semibold [&_h5]:text-lg [&_h5]:font-semibold [&_h6]:text-base [&_h6]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-bold [&_b]:font-bold [&_em]:italic [&_i]:italic [&_u]:underline"
          suppressContentEditableWarning
        />
      )}
    </div>
  );
};
